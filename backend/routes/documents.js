const router = require('express').Router();
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

router.post('/', auth.verifyJWT, promiseHandler( async (req,res,next) => {
    try {
      const document = await documentsController.createDocument(req.userId)
      console.log(document)
      res.status(200).json({ document: document });
    } catch (error) {
      res.status(500).json({ message: 'Error Occurred but document created '});
    }
}));

router.get('/', auth.verifyJWT, promiseHandler( async (req,res,nex) => {
    try {
        const documents = await documentsController.getAllDocuments(req.userId);
        res.status(200).json({ documents });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));

router.get('/:uuid', auth.verifyJWT , promiseHandler( async (req,res,next) => {
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

router.put('/:uuid', auth.verifyJWT , promiseHandler( async (req,res,nex) => {
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

router.delete('/:uuid', auth.verifyJWT , promiseHandler( async (req,res,nex) => {
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

router.get('/isexist/:uuid', auth.verifyJWT, promiseHandler( async (req,res,next) => {
    try {
      const { uuid } = req.params;
      const isExist = await documentsController.isDocumentExist(uuid)
      res.status(200).json({ 
        document: {
          documentID: uuid,
          isExist: isExist
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error Occurred finding Document'});
    }
}));

module.exports = router;
