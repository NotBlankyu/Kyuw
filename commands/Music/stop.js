const Discord = require("discord.js");
const ytdl = require('ytdl-core');
var servers = {}
module.exports = {
  
  name: 'stop',
    category: 'Music',
    description: 'Stops the playing song.',
    usage: `stop`,
  
  run : async (client, message, args) => {
function play(connection, message){
    var server = servers[message.guild.id];
    server.dispatcher = connection.play(ytdl(server.queue[0]), {filter:"audioonly"});
    server.queue.shift();
    server.dispatcher.on("end",function(){
      if(server.queue[0]){
        play(connection, message);
      }else{
        connection.disconnect();
      }
   });
  }
  if(args[0]){
    message.channel.send("What are you trying to do?");
    return
  }
  if(!message.member.voice.channel){
    message.channel.send("Please enter a channel.")
  }
  if(!servers[message.guild.id]) servers[message.guild.id] = {
    queue: []
  }
  var server = servers[message.guild.id];
  
  server.queue.push(args[0]);
  if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
    play(connection,message)     
    message.channel.send("Stoping!")
  })
  } 
};
