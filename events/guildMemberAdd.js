const mongoose = require('mongoose');
const Guild = require('../models/guild');
const discord = require('discord.js');
const Canvas = require('canvas')

module.exports = async (client, member) => {
  
  const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px opensans`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
  Guild.findOne({ 
        guildID: member.guild.id
      },async (err, guild) => {
        if(!guild){
           guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: member.guild.id,
        guildName: member.guild.name,
          })
          
          guild.save().catch(err => console.log(err));
        }
        if(err) console.log(err);
    if(guild.welcomeSwitch==false) return;
    const channel = member.guild.channels.cache.find(channel => channel.id === guild.welcomeID);
  if(!channel){
  console.log(member.guild.id)
  return console.log("Channel doesn't exist"); 
  } 

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpapers/wallpaper1.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
// Slightly smaller text placed above the member's display name
ctx.font = '28px recursive';
ctx.fillStyle = '#ffffff';
ctx.fillText('W e l c o m e  t o  t h e  s e r v e r,', canvas.width / 2.5, canvas.height / 3.5);
  // Select the font size and type from one of the natively available fonts
	ctx.font = applyText(canvas, member.displayName);
	// Select the style that will be used to fill the text in
	ctx.fillStyle = '#ffffff';
	// Actually fill the text with a solid color
  ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);
  
	// Pick up the pen
	ctx.beginPath();
	// Start the arc to form a circle
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	// Put the pen down
	ctx.closePath();
	// Clip off the region you drew on
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);
  const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  var list = [
    "https://media.giphy.com/media/dvreHY4p06lzVSDrvj/giphy.gif",
    "https://media.giphy.com/media/kbtysky2x8fZLW8osP/giphy.gif",
    "https://media.giphy.com/media/U8MrjfyGOrodo04l8A/giphy.gif",
    "https://media.giphy.com/media/LQ2zztPB7N3HE1Frfv/giphy.gif",
    "https://media.giphy.com/media/3ohhwHVQR1t6syIu9q/giphy.gif",
    "https://media.giphy.com/media/WqFqAGOStn4AD4ZK8G/giphy.gif",
  ];
  var random = list[Math.floor(Math.random() * list.length)]; 
  const embedGif = new discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Welcome to the server🎉!`)
  .setDescription(`Hi ${member},be sure to read the rules and have fun!`)
  .setImage(canvas.toBuffer())
	.setThumbnail(member.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
	.setTimestamp()
	.setFooter('dh', 'https://i.imgur.com/FPc54Tr.jpg');

  const embedText = new discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Welcome to the server🎉!`)
  .setDescription(`Hi ${member},be sure to read the rules and have fun!`)
	.setThumbnail(member.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
	.setTimestamp()
	.setFooter('dh', 'https://i.imgur.com/FPc54Tr.jpg');
if(!guild.welcomeGif){
  channel.send(embedText)    
    }else{
      channel.send(`Welcome to the server🎉, ${member}!`,attachment)
    }
  }
                

  )}

