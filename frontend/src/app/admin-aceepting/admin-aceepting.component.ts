import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-admin-aceepting',
  templateUrl: './admin-aceepting.component.html',
  styleUrls: ['./admin-aceepting.component.css']
})
export class AdminAceeptingComponent implements OnInit {

  constructor(private service:ServiceService,private router:Router) { }

  waitingUsers
  message
admin:Korisnik
  ngOnInit(): void   
  {
    this.admin=JSON.parse(localStorage.getItem("logged"))
    this.service.getWaitingProfesorss().subscribe(waitings => {
      if(waitings)
      this.waitingUsers = waitings as Korisnik[];
      if(this.waitingUsers.length==0)
       this.message="Trenutno nema profesora koji čekaju aktivaciju naloga"
    })
  }

  adminAccept(username)
  { 
    this.service.adminAccept(username).subscribe(message => {
    
      this.message="Profesor prihvaćen";
      this.service.getWaitingProfesorss().subscribe(waitings => {
        this.waitingUsers = waitings as Korisnik[];
      })
    })
  }
  adminReject(username)
  {
    this.service.adminReject(username).subscribe(message => {
    
      this.message="Profesor odbijen";
      this.service.getWaitingProfesorss().subscribe(waitings => {
        this.waitingUsers = waitings as Korisnik[];
      })
    })
  }

  logout()
  {
    this.service.logout();
  
  }
}
