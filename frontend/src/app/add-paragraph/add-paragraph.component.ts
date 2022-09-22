import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-paragraph',
  templateUrl: './add-paragraph.component.html',
  styleUrls: ['./add-paragraph.component.css']
})
export class AddParagraphComponent implements OnInit {


  constructor(private servis:ServiceService) { }

  @Input() lekcija
  imePoglavlja
  textPoglavlja
  picture=""
  message
  ngOnInit(): void {
  }
  

  dodajPoglavlje()    // imena lekcija isto gledam kao jedinstvena
  {
    this.servis.addParagraph(this.imePoglavlja,this.textPoglavlja,this.picture,this.lekcija.ime).subscribe((message:string)=>
    {
      this.message=message
    })
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
}
