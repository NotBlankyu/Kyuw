const mongoose = require('mongoose');
module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };
    mongoose.connect('mongodb+srv://admin:elefante03@cluster0-2zgae.mongodb.net/<dbname>?retryWrites=true&w=majority',dbOptions)
    mongoose.set('useFindAndModify', false)
    mongoose.Promise = global.Promise;
    
    mongoose.connection.on('connected', () => {
      console.log('Moongoose connected!');
    });
    
    mongoose.connection.on('err', err => {
      console.error(`Mongoose connection errot:\n${err.stack}`);
    });
    
    mongoose.connection.on('disconnected', () =>{
      console.warn('Mongoose connection lost!');
    });
  }
  
}