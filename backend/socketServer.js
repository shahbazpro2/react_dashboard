const express = require('express')
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const app = express()
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(cors())
const port = process.env.PORT || 8000
const server = app.listen(port, () => console.log(`Server running on port ${port}`))
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
})

io.on('connection', socket => {
  console.log('conn')
  let rawdata = fs.readFileSync(path.resolve(__dirname, 'data.txt'));
  let plateData = fs.readFileSync(path.resolve(__dirname, 'data1.txt'));
  try {
    let data = JSON.parse(rawdata);
    let data1 = JSON.parse(plateData);
    socket.emit("my event", data);
    socket.emit("plate event", data1);
  }
  catch (e) {
    console.log(e);
  }
  finally {
    console.log("entering and leaving the finally block");
  }
  setInterval(() => {
    let rawdata = fs.readFileSync(path.resolve(__dirname, 'data.txt'));
    let plateData = fs.readFileSync(path.resolve(__dirname, 'data1.txt'));
    try {
      let data = JSON.parse(rawdata);
      let data1 = JSON.parse(plateData);
      socket.emit("my event", data);
      socket.emit("plate event", data1);
    }
    catch (e) {
      console.log(e);
    }
    finally {
      console.log("entering and leaving the finally block");
    }

  }, 1000)


});