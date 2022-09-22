import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grupa } from '../model/grupa';
import { Korisnik } from '../model/korisnik';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.css']
})
export class AllGroupsComponent implements OnInit {

  constructor(private servis:ServiceService,private router:Router) { }
  korisnik:Korisnik
  grupe:Grupa[]
  poruka=""
  addStudent=false
  addLesson=false
  grupaZaDodavanje
  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem("logged"))

    if(this.korisnik.tip=="profesor")
    {
      this.servis.getAllGroupsOfProfessor(this.korisnik.korisnicko_ime).subscribe((groups:Grupa[])=>
      {
        if(groups)
        {
          if(groups.length>0)
          this.grupe=groups
          else this.poruka="Profesor nema kreirane grupe"
        }
        else this.poruka="Profesor nema kreirane grupe"
      })
    }
    else {
      this.servis.getAllGroupsOfStudent(this.korisnik.korisnicko_ime).subscribe((groups:Grupa[])=>
      {
        if(groups)
        {
          if(groups.length>0)
          this.grupe=groups
          else this.poruka="Student nije ni u jednoj grupi"
        }
        
        else this.poruka="Student nije ni u jednoj grupi"
      })
        }
    
  }
  dodajStudenta(grupa)
  {
    this.grupaZaDodavanje=grupa
    this.addStudent=true
    this.addLesson=false
  }
  dodajLekciju(grupa)
  {
    this.grupaZaDodavanje=grupa
    this.addLesson=true
    this.addStudent=false
  }
  pregledajLekcije(grupa)
  {
    localStorage.setItem("grupa",JSON.stringify(grupa))
    this.router.navigate(['lessons'])
  }
  logout()
  {
    localStorage.removeItem("logged")
    this.router.navigate([''])

  }
}
