import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import korisnik from './model/korisnik';
import { unwatchFile } from 'fs';
import grupa from './model/grupa';
import lekcija from './model/lekcija';
import poglavlje from './model/poglavlje';
import zadatak from './model/zadatak';
import { json } from 'stream/consumers';
const app = express();

app.use(cors())
app.use(bodyParser.json({limit:'50mb'}));


mongoose.connect("mongodb://localhost:27017/udzbenik2022");

const conn = mongoose.connection;

conn.once('open',()=>{
    console.log('Uspesna konekcija');
});
const router = express.Router();


router.route('/register').post((req, res)=>{
    let korisnicko_ime= req.body.korisnicko_ime
    let lozinka= req.body.lozinka
    let ime =req.body.ime
    let prezime=req.body.prezime 
    let  tip =req.body.tip
    let  telefon=req.body.telefon 
    let  email =req.body.email
    let  slika = req.body.slika 
    let  status = req.body.status       
   
    let toRegister=new korisnik({korisnicko_ime:korisnicko_ime,lozinka:lozinka,ime:ime,prezime:prezime,tip:tip,telefon:telefon,email:email,slika:slika,status:status})


    toRegister.save().then(user=>{
        res.status(200).json({'message': 'user added'});
    }).catch(err=>{
        res.status(400).json({'message': 'error'})
    })
});

router.route('/login').post((req, res)=>{
    let koriscniko_ime= req.body.koriscniko_ime
    let lozinka= req.body.lozinka
    let  tip =req.body.tip
   
    if(tip=="profesor") 
    {
        korisnik.findOne({koriscniko_ime:koriscniko_ime,lozinka:lozinka,tip:"profesor",status:"prihvacen"},(err,korisnik)=>
        {
            if(err)
            console.log(err)
            else
            {
                res.json(korisnik)
            }
        })
       
    }
    else
    {
        korisnik.findOne({koriscniko_ime:koriscniko_ime,lozinka:lozinka,tip:tip,},(err,korisnik)=>
        {
            if(err)
            console.log(err)
            else
            {
                res.json(korisnik)
            }

        })
    }
});

router.route('/getWaitingProfesorss').post((req, res)=>{
  
   
        korisnik.find({tip:"profesor",status:"registrovan"},(err,korisnici)=>
        {
            if(err)
            console.log(err)
            else
            {
                res.json(korisnici)
            }
        })
       
  
    
});

router.route('/adminAccept').post(async (req, res)=>{
  
    let korisnicko_ime=req.body.korisnicko_ime
 
    await korisnik.collection.updateOne({'korisnicko_ime':korisnicko_ime},{$set:{'status':'prihvacen'}},(err,user)=>
    {
       if(err)
       console.log(err)
    })
        res.json({'message':'ok'});
   
});

router.route('/adminReject').post((req, res)=>{
  
    let koriscniko_ime=req.body.koriscniko_ime
   
    korisnik.collection.updateOne({'koriscniko_ime':koriscniko_ime},{$set:{'status':'odbijen'}})
        res.json({'message':'ok'});

});
router.route('/createGroup').post((req, res)=>{
  
    let imeGrupe=req.body.imeGrupe
    let godinaGrupe=req.body.godinaGrupe
    let slikaGrupe=req.body.slikaGrupe
    let profesor=req.body.profesor
    let studenti=[]
    let lekcije=[]
   
    let  gr=new grupa({ime:imeGrupe,godina:godinaGrupe,slika:slikaGrupe,profesor:profesor,studenti:studenti,lekcije:lekcije})


    gr.save().then(user=>{
        res.status(200).json({'message': 'grupa dodata'});
    }).catch(err=>{
        res.status(400).json({'message': 'error'})
    })


});
router.route('/getAllGroupsOfProfessor').post((req, res)=>{
  
    let profesor=req.body.profesor
   
    grupa.find({'profesor':profesor},(err,groups)=>
    {
        if(err)
        console.log(err)
        else
        res.json(groups)
    })
       

});
router.route('/addStudentToGroup').post((req, res)=>{
  
    let korisnicko_imeStudenta=req.body.korisnicko_imeStudenta
    let grupaIme=req.body.grupaIme
    let profesorKorisnicko_ime=req.body.profesorKorisnicko_ime
   

     korisnik.findOne({korisnicko_ime:korisnicko_imeStudenta}, (err,user)=>
   {
    if(err)
    console.log(err)
    else
    {
        if(!user)
        res.json("Uneti korisnik ne postoji")
        else
        {
             grupa.updateOne({profesor:profesorKorisnicko_ime,ime:grupaIme},{$push :{studenti:korisnicko_imeStudenta}},(err,user)=>
             {

                if(err)
                console.log(err)
                else
                res.json("Korisnik dodat")
             })

            
        }
    }
   })
      
});

router.route('/addLessonToGroup').post((req, res)=>{
  
    let imeLekcije=req.body.imeLekcije
    let grupaIime=req.body.grupaIime
    let profesor=req.body.profesor
    let slikaLekcije=req.body.slikaLekcije
    let lek = new lekcija({ime:imeLekcije,globalna:false,slika:slikaLekcije,zadaci:[],poglavlja:[],imeGrupeKojojPripada:grupaIime})
    

    lek.save().then(user=>{

        grupa.updateOne({profesor:profesor,ime:grupaIime},{$push :{lekcije:lek}},(err,user)=>
                    {
                        if(err)
                        console.log(err)
                      
                    else
                         res.json("Lekcija dodata")
                 })

       
    }).catch(err=>{
        res.status(400).json({'message': 'error'})
    })      

});

router.route('/addParagraph').post((req, res)=>{
  
    let imePoglavlja=req.body.imePoglavlja
    let textPoglavlja=req.body.textPoglavlja
    let picture=req.body.picture
    let lekcijaIme=req.body.lekcijaIme
   
    let pog = new poglavlje({ime:imePoglavlja,slika:picture,text:textPoglavlja})
    
    pog.save().then(user=>{

                            lekcija.updateOne({ime:lekcijaIme},{$push :{poglavlja:pog}},(err,user)=>
                            {
                                    if(err)
                                    console.log(err)
                                else
                                {   
                                    lekcija.findOne({ime:lekcijaIme},(err,lekcija,imeGrupeKojojPripada)=>
                                    {
                                        if(err)
                                        console.log(err)
                                        else
                                        {
                                            grupa.findOne({ime:lekcija.imeGrupeKojojPripada},(err,grupa,lekcije)=>
                                            {
                                                if (err)
                                                    console.log(err)
                                                else
                                                {
                                                            let j=undefined
                                                            for(let i=0;i<grupa.lekcije.length;i++)
                                                                        {
                                                                                if(grupa.lekcije[i].ime==lekcija.ime)
                                                                                        j=i;
                                                                        }
                                                            if(j==undefined)
                                                            console.log("GLUP SI GRESKA")
                                                            else
                                                        {
                                                            
                                            
                                                        grupa.collection.updateOne(
                                                    { "ime": lekcija.imeGrupeKojojPripada },
                                                    { $set: { [`lekcije.${j}`]: lekcija}},(err,msg)=>
                                                    {
                                                        if(err)
                                                        console.log(err)
                                                        else
                                                        res.json("Poglavlje dodato")       

                                            } )
                                        } 
             
                                            
                                        
                                        }
                                    })
                                
                                }

                            })


                            }
                        
                    })

       
    }).catch(err=>{
        res.status(400).json({'message': 'error'})
    })
});


router.route('/addExcercise').post((req, res)=>{
  
    let imeZadatka=req.body.imeZadatka
    let textZadatka=req.body.textZadatka
    let picture=req.body.picture
    let tezinaZadatka=req.body.tezinaZadatka
    let tipZadatka=req.body.tipZadatka
    let ponudjeni=req.body.ponudjeni
    let tacni=req.body.tacni
    let lekcijaIme=req.body.imeLekcije
   
    let zad = new zadatak({ime:imeZadatka,slika:picture,text:textZadatka,tezina:tezinaZadatka,tip:tipZadatka,ponudjeniOdgovori:ponudjeni,tacniOdgovori:tacni})
    
    zad.save().then(user=>{

                            lekcija.updateOne({ime:lekcijaIme},{$push :{zadaci:zad}},(err,user)=>
                            {
                                    if(err)
                                    console.log(err)
                                else
                                {   
                                    lekcija.findOne({ime:lekcijaIme},(err,lekcija,imeGrupeKojojPripada)=>
                                    {
                                        if(err)
                                        console.log(err)
                                        else
                                        {
                                            grupa.findOne({ime:lekcija.imeGrupeKojojPripada},(err,grupa,lekcije)=>
                                            {
                                                if (err)
                                                    console.log(err)
                                                else
                                                {
                                                            let j=undefined
                                                            for(let i=0;i<grupa.lekcije.length;i++)
                                                                        {
                                                                                if(grupa.lekcije[i].ime==lekcija.ime)
                                                                                        j=i;
                                                                        }
                                                            if(j==undefined)
                                                            console.log("GLUP SI GRESKA")
                                                            else
                                                        {
                                                            
                                            
                                                        grupa.collection.updateOne(
                                                    { "ime": lekcija.imeGrupeKojojPripada },
                                                    { $set: { [`lekcije.${j}`]: lekcija}},(err,msg)=>
                                                    {
                                                        if(err)
                                                        console.log(err)
                                                        else
                                                        res.json("Zadatak dodat")       

                                            } )
                                        } 
             
                                            
                                        
                                        }
                                    })
                                
                                }

                            })


                          
                            }
                        
                    })

       
    }).catch(err=>{
        res.status(400).json({'message': 'error'})
    })
     
});

router.route('/getGroup').post((req, res)=>{
  
    let profesor=req.body.profesor
    let ime=req.body.ime
   
    grupa.findOne({'profesor':profesor,ime:ime},(err,group)=>
    {
       
        if(err)
        console.log(err)
        else
        res.json(group)
    })
       

});


router.route('/getAllLessons').post(async (req, res)=>{
  
   let lekcije= await lekcija.find()
   
   res.json(lekcije)
       

});
router.route('/getGlobalLessons').post(async (req, res)=>{
  
    let lekcije= await lekcija.find({globalna:true})
    
    res.json(lekcije)
        
 
 });

router.route('/makeLessonGlobal').post(async (req, res)=>{
  
  
   
    let imeLekcije= req.body.imeLekcije
    
    lekcija.collection.updateOne({ime:imeLekcije},{$set:{globalna:true}},(err,msg)=>
    {
        if(err)
        console.log(err)
        else res.json("Lekcija je sada globalna!")
    })
         
 });
 router.route('/getAllGroupsOfStudent').post(async (req, res)=>{
  
  
   
    let koriscniko_ime= req.body.koriscniko_ime
    let korisnikoveGrupe=[]
    
    

    await grupa.find({},(err,grupe,studenti)=>
    {   
        
        for(let i=0;i<grupe.length;i++)
        {
           
                for(let j=0;j<grupe[i].studenti.length;j++)
                    {
                        
                        if(grupe[i].studenti[j]==koriscniko_ime)
                        {
                            korisnikoveGrupe.push(grupe[i])
                            break;
                        }
                    }
         }
         res.json(korisnikoveGrupe)
    }).clone().catch(function(err){ console.log(err)})

   
     
         
 });
 
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));