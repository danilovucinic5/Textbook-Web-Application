"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Poglavlje = new Schema({
    ime: {
        type: String
    },
    text: {
        type: Array
    },
    slika: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Poglavlje', Poglavlje, 'poglavlja');
//# sourceMappingURL=poglavlje.js.map