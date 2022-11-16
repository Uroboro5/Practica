import { Component, OnInit } from '@angular/core';
import { Nota } from '../interfaces/nota';
import { ServicioService } from '../services/servicio.service';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-mis-notas',
  templateUrl: './mis-notas.component.html',
  styleUrls: ['./mis-notas.component.css']
})
export class MisNotasComponent implements OnInit {

  notas          : Nota[] = [];
  favoritos      : boolean = true;
  modal         !: boolean;
  iconoFavorito  : string[] = [];
  editaNota      : boolean = true;
  nota           : Nota = {
    titulo: '',
    contenido: '',
    fecha: new Date,
    favorito: false
  };

  constructor( private notasService: ServicioService,
               private swalService: SwalService) { }

  ngOnInit(): void {
    this.notas = this.notasService.notas;
    this.notasService.botonFavoritos();
    this.iconoFavorito = this.notasService.iconoFavorito;
  }

  borrarNota(index: number) {
    this.swalService.confirmarBorrado(index);
  }

  agregarFavoritos(index: number) {
    this.notasService.notas[index].favorito = !this.notasService.notas[index].favorito;
    this.notasService.botonFavoritos();
  }

  editarNota(index: number) {
    //this.nota = this.notas[index];
    //this.notasService.nota = this.nota;
    this.notasService.editarNota(index).subscribe( res => {
      this.nota = res;
      this.modal = true;
    });
  }

  cerrarModal($event: boolean) {
    this.modal = $event;
  }

}
