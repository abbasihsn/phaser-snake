const express = require('express')
const app = express()
const port = 3000


// let's define public folder as a directory that we can use whatever is inside it!
app.use(express.static(__dirname + "/public/"))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "index.html")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})