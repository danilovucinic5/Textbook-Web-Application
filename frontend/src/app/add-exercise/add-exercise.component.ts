import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  constructor(private servis:ServiceService) { }
  @Input() lekcija
  imeZadatka
  textZadatka
  picture
  tezinaZadatka
  tipZadatka
  ponudjeniOdgovori=""
  tacniOdgovori
  message
  ngOnInit(): void {
  }



  dodajZadatak()
  {
    let  ponudjeni=[]
    let   tacni=[]
    ponudjeni=this.ponudjeniOdgovori.split(',');
    tacni=this.tacniOdgovori.split(',');

    
    this.servis.addExcercise(this.imeZadatka,this.textZadatka,this.picture,this.tezinaZadatka,this.tipZadatka,ponudjeni,tacni,this.lekcija.ime).subscribe((msg)=>
    {
      this.message=msg
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
