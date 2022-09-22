import { Korisnik } from "./korisnik";
import { Lekcija } from "./lekcija";

export class Grupa
{
    ime:string
    profesor:string
    studenti:Array<Korisnik>
    godina:string
    lekcije:Array<Lekcija>
    slika:string

}