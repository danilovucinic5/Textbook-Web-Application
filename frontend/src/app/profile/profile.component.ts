import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router:Router) { }

korisnik:Korisnik
  ngOnInit(): void {

    this.korisnik=JSON.parse(localStorage.getItem("logged")) 
  }

  logout()
  {
    localStorage.removeItem("logged")
    this.router.navigate([''])

  }
}
