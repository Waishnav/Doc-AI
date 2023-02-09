const { Server } = require("socket.io");
const Document = require('../models/document');
const docController = require("../controllers/documents")
// const Revision = require('../models/revision');
//

exports.init = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      // methods: ["GET", "POST"],
    },
  });

  io.on("connection", (server) => {
    server.on("get-document", async documentId => {
      const document = async (documentId) => {
        if (documentId == null) return
        const document = await docController.getDocumentByUUID(documentId)
        console.log(document)
        if (document) return document
        return await docController.createDocument(documentId, document) ;
      }

      server.join(documentId)
      server.emit("load-document", document.data)

      server.on("send-changes", delta => { 
        server.broadcast.to(documentId).emit("receive-changes", delta)
      })

      server.on("save-changes", async data => {
        await docController.updateDocument(documentId, data) ;
        server.broadcast.to(documentId).emit("send-changes", data)
      })

      server.on("update-title", async ({docID, newTitle}) => {
        await docController.updateTitle(docID, newTitle).then(() => {
          io.to(docID).emit("title-updated", newTitle);
        }).catch((err) => {
          console.log("unable to update title",err) ;
        });
      });
    })
  })

  // io.on('connection', (socket) => {
  //     socket.on('join', async (documentId) => {
  //         const document = await Document.findById(documentId);
  //         if (!document) {
  //             return socket.emit('document:not-found');
  //         }
  //         socket.join(documentId);
  //         socket.emit('document', document.content);
  //     });

  //     socket.on('change', async (data) => {
  //         const { documentId, delta } = data;
  //         const document = await Document.findById(documentId);
  //         if (!document) {
  //             return socket.emit('document:not-found');
  //         }

  //         // Save the changes as a new revision
  //         // const revision = new Revision({
  //         //     document: document._id,
  //         //     content: document.content,
  //         //     delta: delta
  //         // });
  //         // await revision.save();

  //         // Update the document content
  //         document.content = delta;
  //         document.updatedAt = Date.now();
  //         await document.save();

  //         // Emit the changes to all users connected to the document
  //         io.to(documentId).emit('change', delta);
  //     });

  //     socket.on('disconnect', () => {
  //         console.log('user disconnected');
  //     });
  // });
};
