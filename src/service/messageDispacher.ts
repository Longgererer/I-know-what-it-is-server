import { customObjT, GameMapT, RoomT, WsConnector } from './types'
import { getRandomString, queryKeyExist } from './tools'

function dispatcher(type: string): Function {
  let handler: Function | null = null
  switch (type) {
    case 'createRoom': {
      handler = createRoom
    }
  }
  return handler || function () { }
}

function createRoom(content: customObjT, user: WsConnector) {
  let id: string = getRandomString()
  const roomMap = user.gameMap.roomMap
  while (queryKeyExist(roomMap, id)) {
    id = getRandomString()
  }
  const room: RoomT = Object.assign({ id }, (content as RoomT))
  roomMap[id] = room
  console.log(user.id, user.token)
}

export default dispatcher