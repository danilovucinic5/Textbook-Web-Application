"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Zadatak = new Schema({
    ime: {
        type: String
    },
    tezina: {
        type: String
    },
    text: {
        type: String
    },
    tip: {
        type: String
    },
    ponudjeniOdgovori: {
        type: Array
    },
    tacniOdgovori: {
        type: Array
    },
    slika: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Zadatak', Zadatak, 'zadaci');
//# sourceMappingURL=zadatak.js.map