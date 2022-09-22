import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  lozinka=""
  korisnicko_ime=""
  tip=""
  poruka=""
  
  constructor(private router:Router,private servis:ServiceService) { }

  ngOnInit(): void {
  }


  login()
  {
    if(this.lozinka=="" || this.korisnicko_ime==""||this.tip=="")
    {
      this.poruka="Morate uneti sve podatke"
      return

    }
    else
    {
      this.servis.login(this.korisnicko_ime,this.lozinka,this.tip).subscribe((user:Korisnik)=>
      {
        if(user)
        { 
          localStorage.setItem("logged",JSON.stringify(user))

          if(user.tip=="student")
          this.router.navigate(['allGroups'])
          else if(user.tip=="admin")
          this.router.navigate(['adminAccepting'])
          else 
          this.router.navigate(['allGroups'])
        }
        else
        {
          this.poruka="Pogresni podaci!"
        }
      })

    }
   
  }
}
