import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Zadatak = new Schema({
    ime: {
        type: String
    },
    tezina: {
        type: String
    },
    text:
        {
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
})

export default mongoose.model('Zadatak', Zadatak, 'zadaci');