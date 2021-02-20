const express = require('express')
const mongoose = require('mongoose')
const postRouter = require('./routes/post')
const app = express()
const cors = require('cors')
mongoose.connect('mongodb+srv://koday:aa123123@cluster0.keneq.mongodb.net/testDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true
})
mongoose.connection.on('error', err => {
  console.error('MongoDB error', err)
})
app.get('/', (req, res) => {
  res.json({ message: 'หน้าเเรกครับ !' })
})
app.use(cors())

app.use(express.json())

app.use('/v1/api',postRouter);

app.listen(9000, () => {
  console.log('Application is running on port 9000')
})