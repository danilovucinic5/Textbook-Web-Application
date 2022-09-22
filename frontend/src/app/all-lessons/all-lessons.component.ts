import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lekcija } from '../model/lekcija';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-all-lessons',
  templateUrl: './all-lessons.component.html',
  styleUrls: ['./all-lessons.component.css']
})
export class AllLessonsComponent implements OnInit {

  constructor(private servis:ServiceService,private router:Router) { }

lekcije:Lekcija[]
poruka
  ngOnInit(): void {

this.servis.getAllLessons().subscribe((lessons:Lekcija[])=>
{
  if(lessons)
  {
    this.lekcije=lessons
  }
  else
  this.poruka="Trenutno nema lekcija u sistemu"
})
  }



  uciniLekcijuVidljivom(lekcija)
  {
    this.servis.makeLessonGlobal(lekcija.ime).subscribe((msg)=>
    {
      this.poruka=msg;
    })

  }
  logout()
  {
    localStorage.removeItem("logged")
    this.router.navigate([''])
  }
}
