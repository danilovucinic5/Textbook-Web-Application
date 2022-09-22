import { Component, Input, OnInit } from '@angular/core';
import { Korisnik } from '../model/korisnik';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-student-to-group',
  templateUrl: './add-student-to-group.component.html',
  styleUrls: ['./add-student-to-group.component.css']
})
export class AddStudentToGroupComponent implements OnInit {

  constructor(private servis:ServiceService) { }
  @Input() grupa
  korisnicko_imeStudenta
  message=""
  ngOnInit(): void {
  }
  
  dodajStudenta()
  {
    let profesor=JSON.parse(localStorage.getItem("logged")) as Korisnik
    this.servis.addStudentToGroup(this.korisnicko_imeStudenta,this.grupa.ime,profesor.korisnicko_ime).subscribe((message:string)=>
    {
      this.message=message 
    })

  }         //po ovome ne moze profesor 2 iste grupe--tu proveru treba ubaciti da ne bi pucalo
}
