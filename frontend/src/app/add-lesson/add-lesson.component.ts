import { Component, Input, OnInit } from '@angular/core';
import { Korisnik } from '../model/korisnik';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit {

  constructor(private servis:ServiceService) { }

  @Input() grupa
  imeLekcije
  message=""
  picture=""

  ngOnInit(): void {
  }
  async uploadFile(event) 
  {
    const file = event.target.files[0]
    this.picture =await this.getPicture(file);
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

  dodajLekciju()
  {
    let profesor=JSON.parse(localStorage.getItem("logged")) as Korisnik
    this.servis.addLessonToGroup(this.imeLekcije,this.grupa.ime,profesor.korisnicko_ime,this.picture).subscribe((message:string)=>
    {
      this.message=message 
    }) 
  }
}
