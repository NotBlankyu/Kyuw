const Discord = require('discord.js')
const osu = require('node-osu');
const moment = require('moment')
const ms = require('ms')
const Guild = require('../../models/guild');
const User = require('../../models/user');
const osuApi = new osu.Api(process.env.osukey, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});

module.exports={
name: 'osu',
    category: 'info',
    description: 'Shows osu profile information',
    usage: `osu [username]`,

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
  let osuUser = args.join(' ')
  if(!osuUser){
    if(user.osu){
        if(user.osu != 0){
            osuUser = user.osu
        }else{
            if(guild.lang=='pt'){
                return message.channel.send('Não tens um perfil de osu configurado, usa ``osuset`` ou ``osu username``')
              }else{
                return message.channel.send('You dont have a osu profile configured, use ``osuset`` or use ``osu username``')
              }
            
        }
    }else{
        if(guild.lang=='pt'){
            return message.channel.send('Não tens um perfil de osu configurado, usa ``osuset`` ou ``osu username``')
          }else{
            return message.channel.send('You dont have a osu profile configured, use ``osuset`` or use ``osu username``')
          }
    }
  }
  osuApi.getUser({u:osuUser}).then(user =>{
    if(guild.lang=='pt'){
        const embed = new Discord.MessageEmbed()
    .setTitle(`${osuUser} Estatísticas`)
    .setDescription(`**PP**: ${user.pp.raw}pp\n**Rank Global**: ${user.pp.rank}\n**Rank Nacional**: ${user.pp.countryRank}\n**País**: ${user.country}\n**Contagem de jogos**: ${user.counts.plays}\n**Tempo Jogado**: ${ms(user.secondsPlayed*1000)}\n**Data de entrada**: ${moment(user.raw_joinDate).locale('pt-pt').format('LLL')}`)
    message.channel.send(embed)
      }else{
        const embed = new Discord.MessageEmbed()
    .setTitle(`${osuUser} Stats`)
    .setDescription(`**PP**: ${user.pp.raw}pp\n**Global Rank**: ${user.pp.rank}\n**Country Rank**: ${user.pp.countryRank}\n**Country**: ${user.country}\n**Play Count**: ${user.counts.plays}\n**Time Played**: ${ms(user.secondsPlayed*1000)}\n**Join date**: ${moment(user.raw_joinDate).locale('en-gb').format('LLL')}`)
    message.channel.send(embed)
      }
    
}).catch(err=>{
    if (err.message==='Not found'){
        if(guild.lang=='pt'){
            message.channel.send('O Usuário não foi encontrado.')
          }else{
            message.channel.send('User not found.')
          }
        
    }
})
    
  
  }
};