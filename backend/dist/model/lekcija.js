"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Lekcija = new Schema({
    ime: {
        type: String
    },
    zadaci: {
        type: Array
    },
    poglavlja: {
        type: Array
    },
    slika: {
        type: String
    },
    imeGrupeKojojPripada: {
        type: String
    },
    globalna: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Lekcija', Lekcija, 'lekcije');
//# sourceMappingURL=lekcija.js.map