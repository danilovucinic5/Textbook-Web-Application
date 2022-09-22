import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-group-creating',
  templateUrl: './group-creating.component.html',
  styleUrls: ['./group-creating.component.css']
})
export class GroupCreatingComponent implements OnInit {

  constructor(private servis:ServiceService,private router:Router) { }

  slikaGrupe
  imeGrupe
  godinaGrupe
  korisnik:Korisnik
  message
  ngOnInit(): void {

    this.korisnik=JSON.parse(localStorage.getItem("logged"))
  }

  async uploadFile(event) 
  {
    const file = event.target.files[0]
    this.slikaGrupe =await this.getPicture(file);
  }
  
  async getPicture(fileBlob):Promise<string>
  {  
    let reader: any = new FileReader();
  
    return 'data:image/png;base64,'+ await new Promise((resolve)=>
    {
      reader.onloadend=()=>
      {
        resolve(reader.result.split(",")[1]);
        }
      reader.readAsDataURL(fileBlob);
    });
  }

  dodajGrupu()
  {
    this.servis.createGroup(this.imeGrupe,this.godinaGrupe,this.slikaGrupe,this.korisnik.korisnicko_ime).subscribe((data)=>
    {
      this.message="Grupa dodata"
    })

    

  }
  logout()
  {
    localStorage.removeItem("logged")
    this.router.navigate([''])

  }

}
