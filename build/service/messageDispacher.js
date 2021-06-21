"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("./tools");
function dispatcher(type) {
    let handler = null;
    switch (type) {
        case 'createRoom': {
            handler = createRoom;
        }
    }
    return handler || function () { };
}
function createRoom(content, user) {
    let id = tools_1.getRandomString();
    const roomMap = user.gameMap.roomMap;
    while (tools_1.queryKeyExist(roomMap, id)) {
        id = tools_1.getRandomString();
    }
    const room = Object.assign({ id }, content);
    roomMap[id] = room;
    console.log(user.id, user.token);
}
exports.default = dispatcher;
