import { Component, OnInit, Input } from '@angular/core';
import { Nota } from '../interfaces/nota';
import { ServicioService } from '../services/servicio.service';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-notas-favoritas',
  templateUrl: './notas-favoritas.component.html',
  styleUrls: ['./notas-favoritas.component.css']
})
export class NotasFavoritasComponent implements OnInit {
  notas         : Nota[] = [];
  favoritos     : boolean = true;
  modal         !: boolean;
  nota          : any[] = [];
  iconoFavorito : string[] = [];

  constructor( private notasService: ServicioService,
    private swalService: SwalService) { }

  ngOnInit(): void {
    this.notas = this.notasService.notasFiltradas;
    this.notasService.botonFavoritos();
    this.iconoFavorito = this.notasService.iconoFavoritos;

  }

  borrarNota(index: number) {
    this.swalService.confirmarBorrado(index);
  }

  agregarFavoritos(index: number) {
    /* this.notasService.notas[index].favorito = !this.notasService.notas[index].favorito;
    this.notasService.filtroFavoritos();
    this.notasService.botonFavoritos(); */
  }

  editarNota(index: number) {
    this.nota.push(this.notasService.editarNota(index));
    this.modal = true;
    console.log(this.nota[0]);
  }

  cerrarModal($event: boolean) {
    this.modal = $event;
  }
  
}
