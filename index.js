const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const socketEvent = require("./socket/events")


const bodyParser = require('body-parser');
const documentsRoutes = require('./routes/documents');


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World');
});



const PORT = 3001;

app.use(cors({
  credentials: true,
  origin: '*',
  headers: 'origin'
}));


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

const server = app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
})

socketEvent.init();