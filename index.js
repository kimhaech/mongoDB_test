const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kimhaech:tkfkdgksek1@cluster0.fqkie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', async(err)=>{
  if(err) throw err;
  console.log("connected to db")
})


app.get('/', (req, res) => {
  res.send('test express')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})