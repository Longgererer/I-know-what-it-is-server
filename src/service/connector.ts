import { WsConnector, WsType, GameMapT, customObjT } from './types'
import { getRandomString, getRandomToken, queryKeyExist } from './tools'
import sender from './sender'
import dispatcher from './messageDispacher'

export default class Connector implements WsConnector {
  token: string
  id: string
  username: string
  avatarUrl: string
  currentRoomId: string
  isOnline: boolean
  lastLoginTime: number
  ws: WsType
  gameMap: GameMapT
  constructor(ws: WsType, gameMap: GameMapT) {
    // 初始化玩家信息包括id，token，username，avatarUrl，currentRoomId
    this.token = ''
    this.id = ''
    this.username = ''
    this.avatarUrl = ''
    this.currentRoomId = ''
    this.isOnline = true
    this.lastLoginTime = new Date().getTime()
    this.ws = ws
    this.gameMap = gameMap
    this.init()
    this.messageMonitor()
  }
  send(data: any, type: string): void {
    sender.sendMsgToUser({ user: this, data, type })
  }
  init(): void {
    // 生成唯一的id和token
    let token: string = getRandomToken()
    let id: string = getRandomString(10)
    const userMap = this.gameMap.userMap
    while (queryKeyExist(userMap, id)) {
      id = getRandomString(10)
    }
    this.token = token
    this.id = id
    // 创建成功，将token和id发给客户端
    this.send({ token, id }, 'initUser')
  }
  messageMonitor(): void {

    this.ws.on('message', (msg: string) => {
      console.log(msg)
      this.send({ test: 123 }, '')
      this.lastLoginTime = new Date().getTime()
      const { type, content } = JSON.parse(msg)
      dispatcher(type)(content)
    })
    this.ws.on('error', (e) => {
      console.log(e)
      this.send(e, '')
    })
  }
  typeHandler(type: string, content: customObjT) {
    switch (type) {
      case 'createRoom': {
        // 创建房间

      }
    }
  }
}