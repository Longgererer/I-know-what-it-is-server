import Koa from 'koa'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import index from './routes/index'
import users from './routes/users'
import WebSocket from 'ws'
import http from 'http'
import Connector from './service/connector'

const app = new Koa()

// error handler
onerror(app)

// middleWares
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

// ws connect

// 玩家，房间，房间内玩家信息映射表
const gameMap = {
  userMap: {},
  roomMap: {},
  roomUserMap: {}
}

const wss = new WebSocket.Server({ port: 4041 })
wss.on('connection', ws => {
  new Connector(ws, gameMap)
})
module.exports = app
