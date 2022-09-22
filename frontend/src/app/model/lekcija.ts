import { Poglavlje } from "./poglavlje";
import { Zadatak } from "./zadatak";

export class Lekcija
{
    ime:string;
    imeGrupeKojojPripada:string
    zadaci:Array<Zadatak>;
    poglavlja:Array<Poglavlje>;
    slika:string;
}
