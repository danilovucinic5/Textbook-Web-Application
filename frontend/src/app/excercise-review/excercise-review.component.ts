import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Zadatak } from '../model/zadatak';

@Component({
  selector: 'app-excercise-review',
  templateUrl: './excercise-review.component.html',
  styleUrls: ['./excercise-review.component.css']
})
export class ExcerciseReviewComponent implements OnInit {

  constructor(private router:Router) { }
zadaci:Zadatak[]
unos=[]
korisnik
poruka=""
porukeTacno=[]
porukeNetacno=[]
nizStikliranje=[]

  ngOnInit(): void {
    this.korisnik=JSON.parse(localStorage.getItem("logged"))
    this.zadaci=JSON.parse(localStorage.getItem("zadaci"))
    if(this.zadaci.length==0)
    this.poruka="Ne postoje traženi zadaci"
    else
    {
      for(let i=0;i<this.zadaci.length;i++)
      this.unos[i]=[]
    }
   

  }
  checkResult(zadatak:Zadatak,i)
  {
    if(zadatak.tip=='unos'|| zadatak.tip=='biranje')
    {
      if(this.unos[i][0]==zadatak.tacniOdgovori[0])
      {
        this.porukeTacno[i]="Tačno, bravo!"
        this.porukeNetacno[i]=""
      }
      else
      {
        this.porukeNetacno[i]="Netačno, probaj ponovo!"
        this.porukeTacno[i]=""
      }
    
    }
   
    else if(zadatak.tip=='stikliranje')
    {
      
       let indexi=[]

       for(let k=0;k<zadatak.tacniOdgovori.length;k++)
       {
              for(let j=0;j<zadatak.ponudjeniOdgovori.length;j++)
              {
                if(zadatak.tacniOdgovori[k]==zadatak.ponudjeniOdgovori[j])
                {
                  indexi.push(j)
                  break
                }
              }
       }

      for(let j=0;j<zadatak.ponudjeniOdgovori.length;j++)
      {

        if(this.unos[i][j])
        {
          if(!indexi.includes(j))
          {
            this.porukeNetacno[i]="Netacno, probaj ponovo!"
            this.porukeTacno[i]=""
            return
          }
        }
        else
        {
          if(indexi.includes(j))
          {
            this.porukeNetacno[i]="Netacno, probaj ponovo!"
            this.porukeTacno[i]=""
            return
          }

        }

      }
      
        this.porukeTacno[i]="Tacno, bravo!"
        this.porukeNetacno[i]=""
    }
  }
  showResult(zadatak:Zadatak,i)
  {
    this.porukeTacno[i]=zadatak.tacniOdgovori;
  }
  
  logout()
  {
    localStorage.removeItem("logged")
    this.router.navigate([''])
  }
}
