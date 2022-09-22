export class Zadatak
{
    ime:string;
    tezina:string //pripremni ili testovi 
    tip:string;  //zaokruzi tacne, jedan od ponudjenih,jedan odgovor
    text:string //
    ponudjeniOdgovori:Array<Object> //razdvojeni zarezom
    tacniOdgovori:Array<Object>     //razdvojeni zarezom niz zbog vise ponudjenih
    slika:string;
}