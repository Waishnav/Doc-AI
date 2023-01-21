const authRoutes  = require("./routes/auth");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketEvents = require('./socket/events');
const documentsRoutes = require('./routes/documents');
const router = require("./routes/auth");


const PORT = 8080;
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://newUser:yS4686cZjUA4kit2@cluster0.cj3xe5d.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => console.log('DB Connected...')).catch((err) => console.error(err));

// Enable CORS
app.use(cors());

app.use(bodyParser.json());

// Use routes
router.get('/', (() => {
  console.log('herldfsa')
}));
app.use('/documents', documentsRoutes);

app.use("/auth", authRoutes);

// Initialize socket.io
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
socketEvents.init(server);
