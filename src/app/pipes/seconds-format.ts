import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'secondsFormat'})
export class SecondsFormat implements PipeTransform {
  transform(value: number): string {
    let resto = value%60;
    let total = (value-resto)/60;
    let primeiraCasa:string = '';
    let segundaCasa:string = '';
    if(resto>59){
      total = total+1;
      resto = resto-60;
    }
    if(total<=9){
      primeiraCasa = '0'+total;
    }else{
      primeiraCasa = ''+total;
    }
    if(resto<=9){
      segundaCasa = '0'+Math.ceil(resto);
    }else{
      segundaCasa = ''+Math.ceil(resto);
    }
    return primeiraCasa+':'+segundaCasa;
  }
}
