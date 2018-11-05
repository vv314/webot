// import { Wechaty } from 'wechaty'
const { Wechaty } = require('wechaty')
const QRCode = require('qrcode-terminal')
const axios = require('axios')
const { random } = require('./utils')

const TULING_API = 'http://openapi.tuling123.com/openapi/api/v2'
let gaMode = false

async function tuling(msg) {
  const { data } = await axios.post(TULING_API, {
    reqType: 0, // 文本
    perception: {
      inputText: {
        text: msg
      }
    },
    userInfo: {
      apiKey: '951451d111074684b28b00bfec5db44e',
      userId: 'vv314'
    }
  })

  console.log(data.results)
  return data.results
}

async function galiao(sender, text, message) {
  console.log(`Contact: ${sender.name()} Content: ${text}`)

  if (text.includes('Vincent 开启尬聊模式') && !gaMode) {
    if (gaMode) {
      message.say('【尬聊中】' + '已经噶尬上了🙃')
    } else {
      gaMode = true
      message.say('安排上了🙃')
    }
    return
  } else if (text.includes('Vincent 关闭尬聊模式') && gaMode) {
    gaMode = false
    message.say('再聊就要翻车了🙃')
    return
  }

  if (!gaMode) return

  try {
    const results = await tuling(text)

    results.forEach(t => {
      if (t.resultType === 'text') {
        message.say('【尬聊中】' + t.values.text)
      }
    })
  } catch (e) {
    message.say('【尬聊中】😂😂😂')
  }
}

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
        galiao(sender, text, message)

        // if (
        //   text.includes('哈哈哈') ||
        //   text.includes('hahaha') ||
        //   text.includes(233333)
        // ) {
        //   message.say('哈'.repeat(random(5, 15)))
        // }
      }
    }

    if (sender.name() == 'vv314') {
      galiao(sender, text, message)
    }
  })
  .start()
