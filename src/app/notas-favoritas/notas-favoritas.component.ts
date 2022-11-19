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
  titulo        : string  = "";
  contenido     : string = "";
  favoritos     : boolean = true;
  modal        !: boolean;
  iconoFavorito : string[] = [];
  nota           : Nota = {
    nTitulo: '',
    nContenido: '',
    dFecha: new Date,
    bFavorito: false
  };
  constructor( private notasService: ServicioService,
    private swalService: SwalService) { }

  ngOnInit(): void {
    this.notas = this.notasService.notas;
    this.notasService.botonFavoritos();
    this.iconoFavorito = this.notasService.iconoFavoritos;
  }

  actualizarNota() {
    console.log(this.nota);
    this.modal = false;
    this.notasService.actualizarNota(this.titulo, this.contenido,this.nota.bFavorito,this.nota.iId!).subscribe( res => {
    console.log(res);
  })
}

borrarNota(id: number, titulo: string) {
  this.swalService.confirmarBorrado(id, titulo);
}

  agregarFavoritos(index: number) {
    this.notasService.quitarFavoritas(index);
    
    /* this.notasService.notas[index].favorito = !this.notasService.notas[index].favorito;
    this.notasService.filtroFavoritos();
    this.notasService.botonFavoritos(); */
  }

  editarNota(nota: Nota) {
    this.titulo = nota.nTitulo;
    this.contenido = nota.nContenido;
    this.nota = nota;
    this.modal = true;
    /* this.nota.push(this.notasService.editarNota(index));
    this.modal = true;
    console.log(this.nota[0]); */
  }

  cerrarModal($event: boolean) {
    this.modal = $event;
  }
  
}
