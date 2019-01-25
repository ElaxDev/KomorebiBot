const Discord = module.require('discord.js');
//npm install ytdl
const ytdl = module.require('ytdl-core');
//npm install yt-search
const search = module.require('yt-search');

module.exports.run = async (bot, message, args) => {
  // const voiceChannel = message.member.voiceChannel;
  // if(!voiceChannel) return message.reply('¡Debes estar en un canal de voz antes de usar este comando!');
  // if((args[0]).startsWith("https://www.youtube.com/watch?v=")) {
  //   voiceChannel.join().then(connection => {
  //     const stream = ytdl(args[0], { filter: 'audioonly' });
  //     const dispatcher = connection.playStream(stream);
  //     dispatcher.on('end', () => voiceChannel.leave());
  //   });
  // }
    // search(args.join(' '), function(err, res) => {
    //   if (err) {
    //     console.log(err);
    //     return message.channel.send('Lo siento, me siento mal ahora. ;~;')
    //   }
    //   let videos = res.videos.slice(0, 10);
    //   let respuesta = '';
    //   for (var resultado in videos) {
    //     respuesta += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
    //   }
    //   respuesta += `\n**Elige un numero entre \`1-${videos.length}\``;
    //   message.channel.send(respuesta);
    //
    //   const filtro = mensaje => !isNaN(mensaje.content) && mensaje.content < videos.length+1 && mensaje.content > 0;
    //   const collector = message.channel.createMesageCollector(filter);
    //
    //   collector.videos = videos;
    //   collector.once('collect', function(mensaje) {
    //     voiceChannel.join().then(connection => {
    //       const stream = ytdl([this.videos[parseInt(message.content)-1].url], { filter: 'audioonly' });
    //       const dispatcher = connection.playStream(stream);
    //       dispatcher.on('end', () => voiceChannel.leave());
    //     });
    //   });
    // });
  // }
}
module.exports.help = {
  name: "play"
}
