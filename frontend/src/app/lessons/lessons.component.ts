import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grupa } from '../model/grupa';
import { Korisnik } from '../model/korisnik';
import { Zadatak } from '../model/zadatak';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  constructor(private service:ServiceService,private router:Router) { }

  grupa:Grupa
  poruka=""
  lekcijaZaDodavanje
  addExercise
  addParagraph
  korisnik:Korisnik
  chooseExcersise

  ngOnInit(): void {

    this.korisnik=JSON.parse(localStorage.getItem("logged"))

    this.grupa=JSON.parse(localStorage.getItem("grupa"))
    
    this.service.getGroup(this.grupa.ime,this.grupa.profesor).subscribe((grupa:Grupa)=>
    {
      this.grupa=grupa;
    })

  }
  dodajZadatak(lekcija)
  {
    this.lekcijaZaDodavanje=lekcija
    this.addExercise=true
    this.addParagraph=false
    this.chooseExcersise=false
  }
  dodajPoglavlje(lekcija)
  {
    this.lekcijaZaDodavanje=lekcija
    this.addParagraph=true
    this.addExercise=false
    this.chooseExcersise=false
  }
  radiZadatke(zadaci)
  {
    localStorage.setItem("zadaci",JSON.stringify(zadaci))
    this.chooseExcersise=true
    this.addParagraph=false
    this.addExercise=false
  }
  pogledajLekciju(lekcija)
  {
    this.service.lekcijaZaPregled=lekcija
    this.router.navigate(['lessonReview'])
  }

  logout()
  {
    localStorage.removeItem("logged")
    this.router.navigate([''])

  }
}
