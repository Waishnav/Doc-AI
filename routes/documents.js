const express = require('express');
const router = express.Router();
const documentsController = require('../controllers/documents');

router.post('/', documentsController.createDocument);
router.get('/', documentsController.getAllDocuments);
router.get('/:uuid', documentsController.getDocumentByUUID);
router.put('/:uuid', documentsController.updateDocument);
router.delete('/:uuid', documentsController.deleteDocument);

module.exports = router;
