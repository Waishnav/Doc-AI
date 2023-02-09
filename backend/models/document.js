const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: true
    // },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    // access: {
    //     type: String,
    //     enum: ['private', 'public'],
    //     default: 'private'
    // },
    // collaborators: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // }]
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
