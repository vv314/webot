// import { Wechaty } from 'wechaty'
const { Wechaty } = require('wechaty')
const QRCode = require('qrcode-terminal')
const { random } = require('./utils')

Wechaty.Room

Wechaty.instance() // Global Instance
  .on('scan', (qrcode, status) => {
    if (status == 0) {
      console.log(`Scan QR Code to login:`)
      QRCode.generate(qrcode, { small: true })
    }
  })
  .on('login', user => console.log(`User ${user} logined`))
  .on('message', async message => {
    const sender = message.from()
    const text = message.text()
    const room = message.room()

    // 不处理自己发的消息
    if (message.self()) return

    if (room) {
      const topic = await room.topic()

      console.log(`Room: ${topic} Contact: ${sender.name()} Content: ${text}`)

      if (topic === '北环五美 😎') {
        if (
          text.includes('哈哈哈') ||
          text.includes('hahaha') ||
          text.includes(233)
        ) {
          message.say('哈'.repeat(random(5, 15)))
        }
      }
    }

    // if (/JavaScript|Js|js/.test(text)) {
    //   message.say('哈哈哈哈哈')
    // }

    // if (text.includes('冬雪')) {
    //   const lover = [
    //     '我爱你',
    //     'I love you',
    //     '想你了',
    //     '哎呀呵',
    //     '整啥捏',
    //     '吃屁',
    //     '哎呀呀'
    //   ]
    //   message.say(lover[random(0, lover.length)])
    // }
  })
  .start()
