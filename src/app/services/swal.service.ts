import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ServicioService } from './servicio.service';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor( private notasService: ServicioService) { }

  confirmarBorrado(i: number) {
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
        this.notasService.notas.splice(i,1);
        Swal.fire(
          '¡Eliminado!',
          'La cita ha sido eliminada',
          'success'
        )
      }
    })
  }
}
