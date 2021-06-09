"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("./tools");
const sender_1 = __importDefault(require("./sender"));
class Connector {
    constructor(ws, gameMap) {
        // 初始化玩家信息包括id，token，username，avatarUrl，currentRoomId
        this.token = '';
        this.id = '';
        this.username = '';
        this.avatarUrl = '';
        this.currentRoomId = '';
        this.isOnline = true;
        this.lastLoginTime = new Date().getTime();
        this.ws = ws;
        this.gameMap = gameMap;
        this.init();
        this.messageMonitor();
    }
    send(data, type) {
        sender_1.default.sendMsgToUser({ user: this, data, type });
    }
    init() {
        // 生成唯一的id和token
        let token = tools_1.getRandomToken();
        let id = tools_1.getRandomString(10);
        const userMap = this.gameMap.userMap;
        while (tools_1.queryKeyExist(userMap, id)) {
            id = tools_1.getRandomString(10);
        }
        this.token = token;
        this.id = id;
        // 创建成功，将token和id发给客户端
        this.send({ token, id }, 'initUser');
    }
    messageMonitor() {
        this.ws.on('message', (msg) => {
            console.log(msg);
            this.send({ test: 123 }, '');
            // try {
            //   this.lastLoginTime = new Date().getTime()
            //   const processedMsg = JSON.parse(msg)
            // } catch (err) {
            // }
        });
        this.ws.on('error', (e) => {
            console.log(e);
            this.send(e, '');
        });
    }
}
exports.default = Connector;
