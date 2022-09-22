"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Grupa = new Schema({
    ime: {
        type: String
    },
    godina: {
        type: String
    },
    studenti: {
        type: Array
    },
    lekcije: {
        type: Array
    },
    slika: {
        type: String
    },
    profesor: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Grupa', Grupa, 'grupe');
//# sourceMappingURL=grupa.js.map