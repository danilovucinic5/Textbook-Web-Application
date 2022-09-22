import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
    imeGrupeKojojPripada:
    {
        type: String
    },
    globalna:
    {
        type:Boolean
    }
})

export default mongoose.model('Lekcija', Lekcija, 'lekcije');