import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
    }
    ,
    profesor: {
        type: String
    }
})

export default mongoose.model('Grupa', Grupa, 'grupe');