const Document = require('../models/document');
// const User = require('../models/user');

exports.createDocument = async (req, res) => {
    try {
        const { title, content, access } = req.body;
        const owner = req.user._id;
        const document = new Document({ title, content, owner});
        await document.save();
        res.status(201).json({ document });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ owner: req.user._id });
        res.status(200).json({ documents });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getDocumentByUUID = async (req, res) => {
    try {
        const { uuid } = req.params;
        const document = await Document.findOne({ uuid });
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json({ document });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.updateDocument = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { title, content, access } = req.body;
        const document = await Document.findOne({ uuid });
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        document.title = title;
        document.content = content;
        document.access = access;
        document.updatedAt = Date.now();
        await document.save();
        res.status(200).json({ document });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findOne({ _id: id, owner: req.user._id });
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        await document.remove();
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// exports.addCollaborator = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { email } = req.body;
//         const document = await Document.findOne({ _id: id, owner: req.user._id });
//         if (!document) {
//             return res.status(404).json({ error: 'Document not found' });
//         }
//         const collaborator = await User.findOne({ email });
//         if (!collaborator) {
//             return res.status(404).json({ error: 'Collaborator not found' });
//         }
//         if (document.collaborators.includes(collaborator._id)) {
//             return res.status(409).json({ error: 'Collaborator already added' });
//         }
//         document.collaborators.push(collaborator._id);
//         await document.save();
//         res.status(200).json({ message: 'Collaborator added successfully' });
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// };

// exports.removeCollaborator = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { email } = req.body;
//         const document = await Document.findOne({ _id: id, owner: req.user._id });
//         if (!document) {
//             return res.status(404).json({ error: 'Document not found' });
//         }
//         const collaborator = await User.findOne({ email });
//         if (!collaborator) {
//             return res.status(404).json({ error: 'Collaborator not found' });
//         }
//         if (!document.collaborators.includes(collaborator._id)) {
//             return res.status(409).json({ error: 'Collaborator not added to the document' });
//         }
//         document.collaborators.pull(collaborator._id);
//         await document.save();
//         res.status(200).json({ message: 'Collaborator removed successfully' });
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// };
