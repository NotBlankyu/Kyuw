const Discord = require("discord.js");
const Guild = require('../../models/guild');
const User = require('../../models/user');
const osu = require('node-osu');
const osuApi = new osu.Api(process.env.osukey, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});

module.exports={
name: 'osuset',
    category: 'info',
    description: 'Define the osu account to link ',
    usage: `osuset [username]`,

run : async (client, message, args) => {
  const guild = await Guild.findOne({ 
    guildID: message.guild.id
  }, (err, guild) => {
    if(!guild){
       guild = new Guild({
    _id: mongoose.Types.ObjectId(),
    guildID: message.guild.id,
    guildName: message.guild.name,
      })}
  })
  const user = await User.findOne({ 
    userID: message.member.id
  }, (err, user) => {
    if(!user){
       user = new user({
    _id: mongoose.Types.ObjectId(),
    userID: message.member.id,
      })}
  })
  if(user){
      
      if(args[0]){
        osuApi.getUser({u:args[0]}).then(osuUser =>{
        user.osu = args[0]
        user.save().catch(err =>console.log(err));
        if(guild.lang=='pt'){
            message.channel.send(`O perfil ${args[0]} está agora ligado à tua conta.`)
          }else{
            message.channel.send(`The profile ${args[0]} is now linked to your account.`)
          }
        
        }).catch(err=>{
            if (err.message==='Not found'){
                message.channel.send('User not found')
            }
        })
      }else{
        user.osu = 0 
        user.save().catch(err =>console.log(err));
        if(guild.lang=='pt'){
            message.channel.send(`Ligação ao perfil de  osu resetada.`)
          }else{
            message.channel.send(`Osu profile link reseted.`)
          }
        
      }
      
  }
    
  
  }
};