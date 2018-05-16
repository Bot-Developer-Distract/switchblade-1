const { Command, SwitchbladeEmbed } = require('../../')
const snekfetch = require('snekfetch')

module.exports = class Dog extends Command {
  constructor (client) {
    super(client)
    this.name = 'dog'
    this.aliases = ['doggo', 'dogpics', 'randomdog']
  }

  async run (message) {
    message.channel.startTyping()
    const doggo = await this.requestDoggo(message)
    message.channel.send(
      new SwitchbladeEmbed(message.author)
        .setImage(doggo)
        .setDescription('Here is your dog <:DoggoF:445701839564963840>')
    ).then(() => message.channel.stopTyping())
  }

  async requestDoggo (message) {
    const { body } = await snekfetch.get('https://random.dog/woof.json')
    const notSupported = ['.mp4']
    if (!body.url.endsWith(notSupported)) return body.url
    else return this.requestDoggo(message)
  }
}
