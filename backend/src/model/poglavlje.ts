import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
})

export default mongoose.model('Poglavlje', Poglavlje, 'poglavlja');