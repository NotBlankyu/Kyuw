const Discord = require("discord.js");
const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

var servers = {}

module.exports = {
  name: 'play',
    category: 'Music',
    description: 'Plays a youtube link',
    usage: `${(process.env.PREFIX)}play <link>`,
  
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
  
  if(!args[0]){
    message.channel.send("Please provide a link.");
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
    message.channel.send("Playing!")
                                                                           })
    
  }  
};