const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const socketEvent = require("./socket/events")


const bodyParser = require('body-parser');
const documentsRoutes = require('./routes/documents');
const userRoutes = require('./routes/user');

const PORT = 3001;
app.use(cors({
  credentials: true,
  origin: '*'
}));


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
mongoose.connect("mongodb+srv://mortysmith:X4dThft4RDPbFGf@cluster0.kxrxbee.mongodb.net/?retryWrites=true&w=majority", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => console.log('DB Connected...')).catch((err) => console.error(err));

// Enable CORS
console.log("hdfds")

app.use(bodyParser.json());

// Use routes
app.use('/documents', documentsRoutes);
app.use('/users', userRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
})

socketEvent.init();