"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function send(ws, msg) {
    if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(msg));
    }
    else {
        console.log('ws is not open', ws.readyState);
    }
}
function sendErrorToUser({ user, data, type }) {
    if (user.isOnline) {
        send(user.ws, { data, type, error: true });
    }
}
function sendMsgToUser({ user, data, type }) {
    if (user.isOnline) {
        send(user.ws, { data, type });
    }
}
function sendMsgToUsers({ users, data, type }) {
    Object.values(users).forEach(user => {
        sendMsgToUser({ user, data, type });
    });
}
exports.default = {
    send,
    sendErrorToUser,
    sendMsgToUser,
    sendMsgToUsers
};
