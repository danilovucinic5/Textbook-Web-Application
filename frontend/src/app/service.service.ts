import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Lekcija } from './model/lekcija';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient,private router:Router) { }

  uri = 'http://localhost:4000';
  lekcijaZaPregled:Lekcija

  registerUser(firstname,lastname,username,password,type,telephone,email,picture,status){
    const data={
      korisnicko_ime: username,
      lozinka: password,
      ime :firstname,
      prezime:lastname, 
      tip :type,
      telefon:telephone, 
      email :email,
      slika : picture,
      status:status      
    }
    return this.http.post(`${this.uri}/register`, data);
  }



  login(korisnicko_ime,lozinka,tip)
  {
    const data={
      koriscniko_ime: korisnicko_ime,
      lozinka: lozinka,
      tip :tip,
     
    }
    return this.http.post(`${this.uri}/login`, data);

  }
  getGlobalLessons()
  {
    const data={
        
    }
    return this.http.post(`${this.uri}/getGlobalLessons`, data);
  }
 
  getWaitingProfesorss()
  {

    const data={
     
     
    }
    return this.http.post(`${this.uri}/getWaitingProfesorss`, data);

  }

  adminAccept(username)
  {
   
    const data={
     korisnicko_ime:username
     
    }
    return this.http.post(`${this.uri}/adminAccept`, data);

  }
  adminReject(username)
  {
    const data={
      korisnicko_ime:username
    }
    return this.http.post(`${this.uri}/adminReject`, data);
  }

  logout()
  {
    localStorage.removeItem("logged")
    this.router.navigate([''])
  }


  createGroup(imeGrupe,godinaGrupe,slikaGrupe,profesor)
  {
    const data={
      imeGrupe:imeGrupe,
      godinaGrupe:godinaGrupe,
      slikaGrupe:slikaGrupe,
      profesor:profesor
    }
    return this.http.post(`${this.uri}/createGroup`, data);
  }


  getAllGroupsOfProfessor(profesor)
  {
    const data={
      profesor:profesor
    }
    return this.http.post(`${this.uri}/getAllGroupsOfProfessor`, data);
  }

  addStudentToGroup(korisnicko_imeStudenta,grupaIme,profesorKorisnicko_ime)
  {
    const data={
      korisnicko_imeStudenta:korisnicko_imeStudenta,
      grupaIme:grupaIme,
      profesorKorisnicko_ime:profesorKorisnicko_ime

    }
    return this.http.post(`${this.uri}/addStudentToGroup`, data);
  }


  addLessonToGroup(imeLekcije,grupaIime,profesor,slikaLekcije)
  {
    let data=
    {
      imeLekcije:imeLekcije,
      grupaIime:grupaIime,
      profesor:profesor,
      slikaLekcije:slikaLekcije
    }

    return this.http.post(`${this.uri}/addLessonToGroup`, data);
  }



  addParagraph(imePoglavlja,textPoglavlja,picture,lekcijaIme)
  {
    let data=
    {
      imePoglavlja:imePoglavlja,
      textPoglavlja:textPoglavlja,
      picture:picture,
      lekcijaIme:lekcijaIme
    }

    return this.http.post(`${this.uri}/addParagraph`, data);
  }

  getGroup(ime,profesor)
  {
    let data=
    {
      ime:ime,
      profesor:profesor
      
    }

    return this.http.post(`${this.uri}/getGroup`, data);
  }
  addExcercise(imeZadatka,textZadatka,picture,tezinaZadatka,tipZadatka,ponudjeni,tacni,imeLekcije)
  {
    let data=
    {
      imeZadatka:imeZadatka,
      textZadatka:textZadatka,
      picture:picture,
      tezinaZadatka:tezinaZadatka,
      ponudjeni:ponudjeni,
      tipZadatka:tipZadatka,
      tacni:tacni,
      imeLekcije:imeLekcije
      

    }

    return this.http.post(`${this.uri}/addExcercise`, data);
  }


  getAllLessons()
  {
    let data=
    {
     
    }

    return this.http.post(`${this.uri}/getAllLessons`, data);
  }



  makeLessonGlobal(imeLekcije)
  {
    let data=
    {
      imeLekcije:imeLekcije
    }
    return this.http.post(`${this.uri}/makeLessonGlobal`, data);

}

getAllGroupsOfStudent(koriscniko_ime)
{
  let data=
    {
      koriscniko_ime:koriscniko_ime
    }
    return this.http.post(`${this.uri}/getAllGroupsOfStudent`, data);
}


  }

  
