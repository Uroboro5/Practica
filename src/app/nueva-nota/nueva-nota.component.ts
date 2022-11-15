import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Nota } from '../interfaces/nota';
import { ServicioService } from '../services/servicio.service';

@Component({
  selector: 'app-nueva-nota',
  templateUrl: './nueva-nota.component.html',
  styleUrls: ['./nueva-nota.component.css']
})
export class NuevaNotaComponent implements OnInit {
  @Output() modalEvent = new EventEmitter<boolean>();
  @Output() editarNota = new EventEmitter<Nota>();



  nuevaNota     !: boolean;
  titulo        : string  = "titi";
  contenido     : string = "cocmom";
  favorito      : boolean = false;
  iconoFavorito : any = "pi-thumbs-down";

  constructor( private notasService: ServicioService) { }

  ngOnInit(): void {
    this.nuevaNota = this.notasService.nuevaNota;
    this.editarNota.subscribe((nota)=>{
      this.titulo =  nota.titulo;
    })
  }

  guardarNota(){
    this.notasService.guardarNota(this.titulo, this.contenido, this.favorito);
    this.notasService.botonFavoritos();
    this.titulo = "";
    this.contenido = "";
    this.modalEvent.emit(false);
  }
  
  agregarFavorito() {
    this.favorito ? this.favorito = false: this.favorito = true;
    this.favorito ? this.iconoFavorito = "pi-thumbs-up" : this.iconoFavorito = "pi-thumbs-down";
  }

}
