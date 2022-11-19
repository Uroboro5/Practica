import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ServicioService } from './servicio.service';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor( private notasService: ServicioService) { }

  confirmarBorrado(id: number, titulo: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se borrará la nota",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'       
    }).then((result) => {
      if (result.isConfirmed) {
        this.notasService.eliminarNota(id).subscribe( res => console.log(res));
        //this.notasService.notas.splice(id,1);
        Swal.fire(
          '¡Eliminado!',
          `La nota ${titulo} ha sido eliminada`,
          'success'
        )
      }
    })
  }
}
