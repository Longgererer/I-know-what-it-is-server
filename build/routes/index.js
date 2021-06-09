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
const router = require('koa-router')();
router.get('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = 'index';
}));
router.get('/string', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = 'koa2 string';
}));
router.get('/json', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = {
        title: 'koa2 json'
    };
}));
module.exports = router;
