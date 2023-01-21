const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketEvents = require('./socket/events');
const documentsRoutes = require('./routes/documents');

const PORT = 3000;
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://mortysmith:X4dThft4RDPbFGf@cluster0.kxrxbee.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Enable CORS
app.use(cors());

// Use body-parser middleware
app.use(bodyParser.json());

// Use routes
app.use('/documents', documentsRoutes);

// Initialize socket.io
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
socketEvents.init(server);
