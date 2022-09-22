import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { Lekcija } from '../model/lekcija';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-global-lessons',
  templateUrl: './global-lessons.component.html',
  styleUrls: ['./global-lessons.component.css']
})
export class GlobalLessonsComponent implements OnInit {

  constructor(private service:ServiceService,private router:Router) { }
lekcije:Lekcija[]
poruka
korisnik:Korisnik
  ngOnInit(): void {

    this.korisnik=JSON.parse(localStorage.getItem("logged"))
    this.service.getGlobalLessons().subscribe((lsns : Lekcija[])=>
    {
      this.lekcije=lsns
    })
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
