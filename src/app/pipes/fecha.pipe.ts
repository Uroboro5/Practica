import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  fechaFiltrada !: string;
  transform(value: Date, ...args: unknown[]): unknown {
    var fecha = new Date(value);
    fecha.setDate(fecha.getDate() + 1);
    fecha.setMonth(fecha.getMonth());
    var año = fecha.getFullYear();
    var mes =  Intl.DateTimeFormat('es-ES', { month: 'short'}).format(fecha);
    var dia = fecha.getDate() - 1;
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    this.fechaFiltrada = `${dia} ${mes}, ${año} ${hora}:${minutos}`;
    return this.fechaFiltrada;
  }

}
