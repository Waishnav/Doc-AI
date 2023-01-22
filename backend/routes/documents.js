const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documents');
const auth = require('../middleware/auth');
const promiseHandler= fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
// router.post('/', documentsController.createDocument);
// router.get('/', documentsController.getAllDocuments);
// router.get('/:uuid', documentsController.getDocumentByUUID);
// router.put('/:uuid', documentsController.updateDocument);
// router.delete('/:uuid', documentsController.deleteDocument);

router.post('/', auth.isLoggedIn, promiseHandler( async (req,res,next) => {

    try {
        const document = await documentsController.createDocument(req.body.userId , req.body)
        res.status(200).json({ document });
    } catch (error) {
        res.status(500).json({ error });
    }
}));

router.get('/', auth.isLoggedIn , promiseHandler( async (req,res,nex) => {
    try {
        const documents = await documentsController.getAllDocuments(req.body.userId);
        res.status(200).json({ documents });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));

router.get('/:uuid', auth.isLoggedIn , promiseHandler( async (req,res,next) => {
    try {
        const { uuid } = req.params;
        const document = await documentsController.getDocumentByUUID(uuid);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json({ document });
    } catch (error) {
        res.status(500).json({ error });
    }
}));

router.put('/:uuid', auth.isLoggedIn , promiseHandler( async (req,res,nex) => {
    try {
        const { uuid } = req.params;
        const document = await documentsController.updateDocument(uuid, req.body);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json({ document });
    } catch (error) {
        res.status(500).json({ error });
    }
}));

router.delete('/:uuid', auth.isLoggedIn , promiseHandler( async (req,res,nex) => {
    try {
        const { uuid } = req.params;
        const document = await documentsController.deleteDocument(uuid);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json({ document });
    } catch (error) {
        res.status(500).json({ error });
    }
}));


module.exports = router;
