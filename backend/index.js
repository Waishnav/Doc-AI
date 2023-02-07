require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require("http");
const socketEvent = require("./socket/events")

const bodyParser = require('body-parser');
const documentsRoutes = require('./routes/documents');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors({
  origin: "*"
}));

const server = http.createServer(app)
server.listen(8000, () => console.log('Server running on port 8000'));
socketEvent.init(server);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World');
});
mongoose.connect(process.env.MONGO_DATABASE_DEV, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => console.log('DB Connected...')).catch((err) => console.error(err));

app.use(bodyParser.json());

// Use routes
app.use('/documents', documentsRoutes);
app.use('/users', userRoutes);

