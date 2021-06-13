"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dispatcher(type) {
    let handler = null;
    switch (type) {
        case 'createRoom': {
            handler = createRoom;
        }
    }
    return handler || function () { };
}
function createRoom(content) {
    console.log('create');
}
exports.default = dispatcher;
