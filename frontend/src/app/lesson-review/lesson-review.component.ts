import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { Lekcija } from '../model/lekcija';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-lesson-review',
  templateUrl: './lesson-review.component.html',
  styleUrls: ['./lesson-review.component.css']
})
export class LessonReviewComponent implements OnInit {

  constructor(private service:ServiceService,private router:Router) { }

  lekcija:Lekcija
  korisnik:Korisnik
  
  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem("logged"))
    this.lekcija=this.service.lekcijaZaPregled;
  }
  logout()
  {
    localStorage.removeItem("logged")
    this.router.navigate([''])

  }
}
