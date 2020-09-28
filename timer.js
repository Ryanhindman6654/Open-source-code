const Discord = module.require('discord.js');
const ms = require('ms');
module.exports.run = async(client, message) => {

    //start

  //defining args
  const args = message.content.split(" ").slice(1)

  //Timer
  let Timer = args[0]; 

  //if no time specified
  if(!args[0]) {
    return message.channel.send("Please Enter A Valid Time To Start The Timer");
  }

  //valid time needed
  if(args[0] <= 0) {
    return message.channel.send("Please Enter A Valid Time To Start The Timer");
  }

  //if undefined
  if(args[0] === undefined) {
    return message.channel.send("**Please tell the Time period** \n __EXAMPLE__ : **1d , 1h , 1m , 1s**");
  } 

  //reason
  let reason = args.slice(1).join(' '); //reason is not a required field

  //send when timer has been started 
  const timer = await message.channel.send(`**Timer has Been Started For \`${ms(ms(Timer))}\` Reason - \`${reason}\`**`)

  
  //function
  setTimeout(function(){

  //end embed
    let embed = new Discord.MessageEmbed()
    .setTitle("Timer has ended")
    .setDescription(`**Timer Has Been Ended . Timer lasts till** \`${ms(ms(Timer))}\` Reason - \`${reason}\``)
    .setColor("GREEN")

  //send timer end to message author
    message.author.send(embed)

  //send timer end to the started channel
    message.channel.send(embed)

  //end
  }, ms(Timer));

  module.exports.help = {
    name: "timer",
    aliases: ["t-start"],
    category: "utility",
    description: "Starts A Timer",
    usage: "{prefix}timer-start {time} {reason}"
  }

}
