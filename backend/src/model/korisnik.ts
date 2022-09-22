import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    korisnicko_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    email: {
        type: String
    },
    telefon: {
        type: String
    },
    tip: {
        type: String
    },
    slika: {
        type: String
    },
    status: {
        type: String
    },
})

export default mongoose.model('Korisnik', Korisnik, 'korisnici');