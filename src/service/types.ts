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
  ws: WsType
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
    [key: string]: UserT
  },
  roomMap: {
    [key: string]: RoomT
  },
  roomUserMap: {
    [key: string]: RoomUserT
  }
}

export {
  WsConnector,
  WsType,
  GameMapT
}