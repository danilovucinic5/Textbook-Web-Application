"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const korisnik_1 = __importDefault(require("./model/korisnik"));
const grupa_1 = __importDefault(require("./model/grupa"));
const lekcija_1 = __importDefault(require("./model/lekcija"));
const poglavlje_1 = __importDefault(require("./model/poglavlje"));
const zadatak_1 = __importDefault(require("./model/zadatak"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '50mb' }));
mongoose_1.default.connect("mongodb://localhost:27017/udzbenik2022");
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('Uspesna konekcija');
});
const router = express_1.default.Router();
router.route('/register').post((req, res) => {
    let korisnicko_ime = req.body.korisnicko_ime;
    let lozinka = req.body.lozinka;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let tip = req.body.tip;
    let telefon = req.body.telefon;
    let email = req.body.email;
    let slika = req.body.slika;
    let status = req.body.status;
    let toRegister = new korisnik_1.default({ korisnicko_ime: korisnicko_ime, lozinka: lozinka, ime: ime, prezime: prezime, tip: tip, telefon: telefon, email: email, slika: slika, status: status });
    toRegister.save().then(user => {
        res.status(200).json({ 'message': 'user added' });
    }).catch(err => {
        res.status(400).json({ 'message': 'error' });
    });
});
router.route('/login').post((req, res) => {
    let koriscniko_ime = req.body.koriscniko_ime;
    let lozinka = req.body.lozinka;
    let tip = req.body.tip;
    if (tip == "profesor") {
        korisnik_1.default.findOne({ koriscniko_ime: koriscniko_ime, lozinka: lozinka, tip: "profesor", status: "prihvacen" }, (err, korisnik) => {
            if (err)
                console.log(err);
            else {
                res.json(korisnik);
            }
        });
    }
    else {
        korisnik_1.default.findOne({ koriscniko_ime: koriscniko_ime, lozinka: lozinka, tip: tip, }, (err, korisnik) => {
            if (err)
                console.log(err);
            else {
                res.json(korisnik);
            }
        });
    }
});
router.route('/getWaitingProfesorss').post((req, res) => {
    korisnik_1.default.find({ tip: "profesor", status: "registrovan" }, (err, korisnici) => {
        if (err)
            console.log(err);
        else {
            res.json(korisnici);
        }
    });
});
router.route('/adminAccept').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let korisnicko_ime = req.body.korisnicko_ime;
    yield korisnik_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { 'status': 'prihvacen' } }, (err, user) => {
        if (err)
            console.log(err);
    });
    res.json({ 'message': 'ok' });
}));
router.route('/adminReject').post((req, res) => {
    let koriscniko_ime = req.body.koriscniko_ime;
    korisnik_1.default.collection.updateOne({ 'koriscniko_ime': koriscniko_ime }, { $set: { 'status': 'odbijen' } });
    res.json({ 'message': 'ok' });
});
router.route('/createGroup').post((req, res) => {
    let imeGrupe = req.body.imeGrupe;
    let godinaGrupe = req.body.godinaGrupe;
    let slikaGrupe = req.body.slikaGrupe;
    let profesor = req.body.profesor;
    let studenti = [];
    let lekcije = [];
    let gr = new grupa_1.default({ ime: imeGrupe, godina: godinaGrupe, slika: slikaGrupe, profesor: profesor, studenti: studenti, lekcije: lekcije });
    gr.save().then(user => {
        res.status(200).json({ 'message': 'grupa dodata' });
    }).catch(err => {
        res.status(400).json({ 'message': 'error' });
    });
});
router.route('/getAllGroupsOfProfessor').post((req, res) => {
    let profesor = req.body.profesor;
    grupa_1.default.find({ 'profesor': profesor }, (err, groups) => {
        if (err)
            console.log(err);
        else
            res.json(groups);
    });
});
router.route('/addStudentToGroup').post((req, res) => {
    let korisnicko_imeStudenta = req.body.korisnicko_imeStudenta;
    let grupaIme = req.body.grupaIme;
    let profesorKorisnicko_ime = req.body.profesorKorisnicko_ime;
    korisnik_1.default.findOne({ korisnicko_ime: korisnicko_imeStudenta }, (err, user) => {
        if (err)
            console.log(err);
        else {
            if (!user)
                res.json("Uneti korisnik ne postoji");
            else {
                grupa_1.default.updateOne({ profesor: profesorKorisnicko_ime, ime: grupaIme }, { $push: { studenti: korisnicko_imeStudenta } }, (err, user) => {
                    if (err)
                        console.log(err);
                    else
                        res.json("Korisnik dodat");
                });
            }
        }
    });
});
router.route('/addLessonToGroup').post((req, res) => {
    let imeLekcije = req.body.imeLekcije;
    let grupaIime = req.body.grupaIime;
    let profesor = req.body.profesor;
    let slikaLekcije = req.body.slikaLekcije;
    let lek = new lekcija_1.default({ ime: imeLekcije, globalna: false, slika: slikaLekcije, zadaci: [], poglavlja: [], imeGrupeKojojPripada: grupaIime });
    lek.save().then(user => {
        grupa_1.default.updateOne({ profesor: profesor, ime: grupaIime }, { $push: { lekcije: lek } }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json("Lekcija dodata");
        });
    }).catch(err => {
        res.status(400).json({ 'message': 'error' });
    });
});
router.route('/addParagraph').post((req, res) => {
    let imePoglavlja = req.body.imePoglavlja;
    let textPoglavlja = req.body.textPoglavlja;
    let picture = req.body.picture;
    let lekcijaIme = req.body.lekcijaIme;
    let pog = new poglavlje_1.default({ ime: imePoglavlja, slika: picture, text: textPoglavlja });
    pog.save().then(user => {
        lekcija_1.default.updateOne({ ime: lekcijaIme }, { $push: { poglavlja: pog } }, (err, user) => {
            if (err)
                console.log(err);
            else {
                lekcija_1.default.findOne({ ime: lekcijaIme }, (err, lekcija, imeGrupeKojojPripada) => {
                    if (err)
                        console.log(err);
                    else {
                        grupa_1.default.findOne({ ime: lekcija.imeGrupeKojojPripada }, (err, grupa, lekcije) => {
                            if (err)
                                console.log(err);
                            else {
                                let j = undefined;
                                for (let i = 0; i < grupa.lekcije.length; i++) {
                                    if (grupa.lekcije[i].ime == lekcija.ime)
                                        j = i;
                                }
                                if (j == undefined)
                                    console.log("GLUP SI GRESKA");
                                else {
                                    grupa.collection.updateOne({ "ime": lekcija.imeGrupeKojojPripada }, { $set: { [`lekcije.${j}`]: lekcija } }, (err, msg) => {
                                        if (err)
                                            console.log(err);
                                        else
                                            res.json("Poglavlje dodato");
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }).catch(err => {
        res.status(400).json({ 'message': 'error' });
    });
});
router.route('/addExcercise').post((req, res) => {
    let imeZadatka = req.body.imeZadatka;
    let textZadatka = req.body.textZadatka;
    let picture = req.body.picture;
    let tezinaZadatka = req.body.tezinaZadatka;
    let tipZadatka = req.body.tipZadatka;
    let ponudjeni = req.body.ponudjeni;
    let tacni = req.body.tacni;
    let lekcijaIme = req.body.imeLekcije;
    let zad = new zadatak_1.default({ ime: imeZadatka, slika: picture, text: textZadatka, tezina: tezinaZadatka, tip: tipZadatka, ponudjeniOdgovori: ponudjeni, tacniOdgovori: tacni });
    zad.save().then(user => {
        lekcija_1.default.updateOne({ ime: lekcijaIme }, { $push: { zadaci: zad } }, (err, user) => {
            if (err)
                console.log(err);
            else {
                lekcija_1.default.findOne({ ime: lekcijaIme }, (err, lekcija, imeGrupeKojojPripada) => {
                    if (err)
                        console.log(err);
                    else {
                        grupa_1.default.findOne({ ime: lekcija.imeGrupeKojojPripada }, (err, grupa, lekcije) => {
                            if (err)
                                console.log(err);
                            else {
                                let j = undefined;
                                for (let i = 0; i < grupa.lekcije.length; i++) {
                                    if (grupa.lekcije[i].ime == lekcija.ime)
                                        j = i;
                                }
                                if (j == undefined)
                                    console.log("GLUP SI GRESKA");
                                else {
                                    grupa.collection.updateOne({ "ime": lekcija.imeGrupeKojojPripada }, { $set: { [`lekcije.${j}`]: lekcija } }, (err, msg) => {
                                        if (err)
                                            console.log(err);
                                        else
                                            res.json("Zadatak dodat");
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }).catch(err => {
        res.status(400).json({ 'message': 'error' });
    });
});
router.route('/getGroup').post((req, res) => {
    let profesor = req.body.profesor;
    let ime = req.body.ime;
    grupa_1.default.findOne({ 'profesor': profesor, ime: ime }, (err, group) => {
        if (err)
            console.log(err);
        else
            res.json(group);
    });
});
router.route('/getAllLessons').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lekcije = yield lekcija_1.default.find();
    res.json(lekcije);
}));
router.route('/getGlobalLessons').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lekcije = yield lekcija_1.default.find({ globalna: true });
    res.json(lekcije);
}));
router.route('/makeLessonGlobal').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let imeLekcije = req.body.imeLekcije;
    lekcija_1.default.collection.updateOne({ ime: imeLekcije }, { $set: { globalna: true } }, (err, msg) => {
        if (err)
            console.log(err);
        else
            res.json("Lekcija je sada globalna!");
    });
}));
router.route('/getAllGroupsOfStudent').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let koriscniko_ime = req.body.koriscniko_ime;
    let korisnikoveGrupe = [];
    yield grupa_1.default.find({}, (err, grupe, studenti) => {
        for (let i = 0; i < grupe.length; i++) {
            for (let j = 0; j < grupe[i].studenti.length; j++) {
                if (grupe[i].studenti[j] == koriscniko_ime) {
                    korisnikoveGrupe.push(grupe[i]);
                    break;
                }
            }
        }
        res.json(korisnikoveGrupe);
    }).clone().catch(function (err) { console.log(err); });
}));
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map