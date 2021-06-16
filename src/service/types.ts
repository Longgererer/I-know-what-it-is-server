import WsType from 'ws'

// 连接类
interface WsConnector {
  token: string,
  id: string,
  username: string,
  avatarUrl: string,
  currentRoomId: string,
  isOnline: boolean,
  lastLoginTime: number,
  ws: WsType,
  gameMap: GameMapT
}

type UserT = {
  token: string,
  id: string,
  username: string,
  avatarUrl: string,
  currentRoomId: string,
  isOnline: boolean,
  lastLoginTime: number,
}

type RoomT = {
  id: string,
  name: string,
  type: number,
  accessPassword: boolean,
  password: string,
  playerNum: number
}

type RoomUserT = {
  id: string,
  currentRoomId: string,
  point: number,
}

type GameMapT = {
  userMap: {
    // 键名为用户id
    [key: string]: UserT
  },
  roomMap: {
    // 键名为房间id
    [key: string]: RoomT
  },
  roomUserMap: {
    // 键名为房间id
    [key: string]: RoomUserT
  }
}

type customObjT = {
  [key: string]: any
}


export {
  WsConnector,
  WsType,
  GameMapT,
  customObjT,
  UserT,
  RoomT,
  RoomUserT
}