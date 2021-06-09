import { WsConnector,WsType } from './types'

function send(ws: WsType, msg: any): void {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(msg))
  } else {
    console.log('ws is not open', ws.readyState)
  }
}

interface SendToUserType {
  user: WsConnector,
  data: any,
  type: string,
}
interface SendToUsersType {
  users: WsConnector[],
  data: any,
  type: string,
}
function sendErrorToUser({ user, data, type}: SendToUserType): void {
  if (user.isOnline) {
    send(user.ws, { data, type, error: true })
  }
}
function sendMsgToUser({ user, data, type}: SendToUserType): void {
  if (user.isOnline) {
    send(user.ws, { data, type})
  }
}
function sendMsgToUsers({ users, data, type}: SendToUsersType): void {
  Object.values(users).forEach(user => {
    sendMsgToUser({ user, data, type})
  })
}

export default {
  send,
  sendErrorToUser,
  sendMsgToUser,
  sendMsgToUsers
}