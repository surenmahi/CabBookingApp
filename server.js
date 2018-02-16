var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var path = require('path');
var server=require('http').Server(app);
var io=require('socket.io')(server);
const port=process.env.PORT||3000;


var tariffRoute=require('./server/routes/tariff');
var userRoute=require('./server/routes/user');
var cabRoute=require('./server/routes/cab');
var bookingRoute=require('./server/routes/booking');




app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/client')));


mongoose.connect('mongodb://localhost/meanapp');
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
  console.log('Database Connected');
});

app.use('/', tariffRoute);
app.use('/', cabRoute);
app.use('/', userRoute);
app.use('/', bookingRoute);




io.on('connection',function(socket){
console.log('Socket: ',socket.id);
io.sockets.emit('BookingID',socket.id);
socket.on('getLocation',function(data){
  console.log(data);
  io.sockets.emit('sendLocation',data);
});
socket.on('getBookingID',function(data){
  console.log(data);
  io.emit('sendBookingID',socket.id);
});


socket.on('getDriverInfo',function(data){
  console.log(data);
  io.sockets.emit('sendDriverInfo',data);
});
socket.on('getBookingInfo',function(data){
  console.log(data);
  io.sockets.emit('sendBookingInfo',data);
});
socket.on('CancelBooking',function(data){
  console.log(data);
  io.sockets.emit('CancelBooking',data);
});



});
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./client/public/images");
    },
    filename: function (req, file, callback) {
        callback(null,file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count



app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

server.listen(port,function(req,res){
  console.log(`Server is running on port ${port}...`);
});
