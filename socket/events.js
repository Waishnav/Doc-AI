const socketio = require('socket.io');
const Document = require('../models/document');
// const Revision = require('../models/revision');

exports.init = () => {
  const io = require("socket.io")(5000, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  })

  io.on("connection", socket => {
    socket.on("get-document", async documentId => {
      const document = async (documentId) => {
        if (documentId == null) return
        const document = await Document.findById(documentId)
        if (document) return document
        return await Document.create({ _id: documentId, content: "" })
      }
      socket.join(documentId)
      socket.emit("load-document", document.data)

      socket.on("send-changes", delta => {
        socket.broadcast.to(documentId).emit("receive-changes", delta)
      })

      socket.on("save-document", async data => {
        await Document.findByIdAndUpdate(documentId, { content: data })
      })
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
