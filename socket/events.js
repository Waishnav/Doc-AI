const socketio = require('socket.io');
const Document = require('../models/document');
// const Revision = require('../models/revision');

exports.init = (server) => {
    const io = socketio(server);

    io.on('connection', (socket) => {
        socket.on('join', async (documentId) => {
            const document = await Document.findById(documentId);
            if (!document) {
                return socket.emit('document:not-found');
            }
            socket.join(documentId);
            socket.emit('document', document);
        });

        socket.on('change', async (data) => {
            const { documentId, delta } = data;
            const document = await Document.findById(documentId);
            if (!document) {
                return socket.emit('document:not-found');
            }

            // Save the changes as a new revision
            // const revision = new Revision({
            //     document: document._id,
            //     content: document.content,
            //     delta: delta
            // });
            // await revision.save();

            // Update the document content
            document.content = delta;
            document.updatedAt = Date.now();
            await document.save();

            // Emit the changes to all users connected to the document
            io.to(documentId).emit('change', delta);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};
