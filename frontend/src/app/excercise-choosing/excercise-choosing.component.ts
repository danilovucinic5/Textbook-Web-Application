import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Zadatak } from '../model/zadatak';

@Component({
  selector: 'app-excercise-choosing',
  templateUrl: './excercise-choosing.component.html',
  styleUrls: ['./excercise-choosing.component.css']
})
export class ExcerciseChoosingComponent implements OnInit {

  constructor(private router:Router) { }
 zadaci:Zadatak[]
  tipZadataka=""
  poruka=""
  ngOnInit(): void {
    this.zadaci=JSON.parse(localStorage.getItem("zadaci"))
  }


  radiZadatke()
  {
    if(this.tipZadataka=="")
    {
      this.poruka="Morate odabrati tip zadataka"
      return
    }
    if(this.tipZadataka=="pripremni")
    {
      for(let i=0;i<this.zadaci.length;i++)
      {
        if(this.zadaci[i].tezina=="test")
        {
          this.zadaci.splice(i,1)
          i--;
        }
        
      }
    }
    else if(this.tipZadataka=="test")
    {
      for(let i=0;i<this.zadaci.length;i++)
      {
        if(this.zadaci[i].tezina=="pripremni")
        {
          this.zadaci.splice(i,1)
          i--;
        }
       
      }
    }
    
    localStorage.setItem("zadaci",JSON.stringify(this.zadaci))
    this.router.navigate(['excersiseReview'])
  }
}
