const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documents');

// router.post('/', documentsController.createDocument);
// router.get('/', documentsController.getAllDocuments);
// router.get('/:uuid', documentsController.getDocumentByUUID);
// router.put('/:uuid', documentsController.updateDocument);
// router.delete('/:uuid', documentsController.deleteDocument);

router.post('/', isLoggedIn() , promiseHandler( async (res,req,next) => {

    try {
        const document = await documentsController.createDocument(req.loggedInUser , req.body)
        res.status(200).json({ document });
    } catch (error) {
        res.status(500).json({ error });
    }
}));

router.get('/', isLoggedIn() , promiseHandler( async (res,req,next) => {
    try {
        const documents = await documentsController.getAllDocuments(req.loggedInUser);
        res.status(200).json({ documents });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));

router.get('/:uuid', isLoggedIn() , promiseHandler( async (res,req,next) => {
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

router.put('/:uuid', isLoggedIn() , promiseHandler( async (res,req,next) => {
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

router.delete('/:uuid', isLoggedIn() , promiseHandler( async (res,req,next) => {
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
