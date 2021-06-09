"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryKeyExist = exports.getRandomToken = exports.getRandomString = void 0;
const crypto_random_string_1 = __importDefault(require("crypto-random-string"));
const uuid_1 = require("uuid");
const getRandomString = (length) => crypto_random_string_1.default({ length });
exports.getRandomString = getRandomString;
const getRandomToken = () => uuid_1.v4();
exports.getRandomToken = getRandomToken;
const queryKeyExist = (target, key) => target.hasOwnProperty(key);
exports.queryKeyExist = queryKeyExist;
