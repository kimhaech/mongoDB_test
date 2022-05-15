const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dongle:tkfkdgksek1@cluster0.fqkie.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err))

  const schema = new mongoose.Schema({
  name: { type: String },
})

const temp = mongoose.model('temps', schema)

const t1 = new temp({
  name: '오이'
})

t1.save().then(() => {
  console.log("성공")
}).catch((err)=> {
  console.log(err)
})