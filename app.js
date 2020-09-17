const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
// @ts-ignore
app.use(express.json({ extended: true }))

//router
app.use('/api/auth', cors(), require('./routes/auth.routes'))
app.use('/api/goods', cors(), require('./routes/goods.routes'))

app.use(cors())

//server on port
const PORT = config.get('port') || 5000

//start server and connect DB
async function start() {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`Server start on PORT ${PORT}`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
