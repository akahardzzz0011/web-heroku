const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')

app.use(cors())

const products = require('./routes/products')
const users = require('./routes/users')
const invoices = require('./routes/invoices')

app.use(bodyParser.json())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })

app.use('/products', products)
app.use('/users', users)
app.use('/invoices', invoices)
app.use(express.static('reactAppBuild'))

app.get('/file', (req, res) => {
    res.sendFile(__dirname + '/uploadFile.html');   
  });

app.post('/uploadfile', upload.single('myFile'), (req, res) => {
    const file = req.file
    if(!file) {
        res.sendStatus(400)
    }
    res.send(file)
})  

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})