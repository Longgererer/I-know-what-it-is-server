"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_onerror_1 = __importDefault(require("koa-onerror"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const ws_1 = __importDefault(require("ws"));
const connector_1 = __importDefault(require("./service/connector"));
const app = new koa_1.default();
// error handler
koa_onerror_1.default(app);
// middleWares
app.use(koa_bodyparser_1.default({
    enableTypes: ['json', 'form', 'text']
}));
app.use(koa_json_1.default());
app.use(koa_logger_1.default());
app.use(require('koa-static')(__dirname + '/public'));
// logger
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const start = new Date();
    yield next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}));
// routes
app.use(index_1.default.routes(), index_1.default.allowedMethods());
app.use(users_1.default.routes(), users_1.default.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});
// ws connect
// 玩家，房间，房间内玩家信息映射表
const gameMap = {
    userMap: {},
    roomMap: {},
    roomUserMap: {}
};
const wss = new ws_1.default.Server({ port: 4041 });
wss.on('connection', ws => {
    new connector_1.default(ws, gameMap);
});
module.exports = app;
