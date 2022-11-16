import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { Nota } from '../interfaces/nota';
import { ServicioService } from '../services/servicio.service';

@Component({
  selector: 'app-nueva-nota',
  templateUrl: './nueva-nota.component.html',
  styleUrls: ['./nueva-nota.component.css']
})
export class NuevaNotaComponent implements OnInit, AfterViewInit {
  @Output() modalEvent = new EventEmitter<boolean>();
  @Input() editaNota !: boolean;
  @Input() inputNota : Nota = {
    titulo: '',
    contenido: '',
    fecha: new Date,
    favorito: false
  };
 // @Output() editarNota = new EventEmitter<Nota>();

  nuevaNota    !: boolean;
  titulo        : string  = "";
  contenido     : string = "";
  favorito      : boolean = false;
  iconoFavorito : string = "pi-thumbs-down";
  nota          : Nota = {
    titulo: '',
    contenido: '',
    fecha: new Date,
    favorito: false
  }

  constructor( private notasService: ServicioService) { }
  
  ngOnInit(): void {
    this.nuevaNota = this.notasService.nuevaNota;
    this.nota = this.inputNota;
  }
  
  ngAfterViewInit(): void {
    this.rellenarDatos();  
  }
  
  guardarNota(){
    console.log(this.editaNota);
    
    if (!this.editaNota) {
      this.notasService.guardarNota(this.titulo, this.contenido, this.favorito);
      this.notasService.botonFavoritos();
      this.titulo = "";
      this.contenido = "";
      this.modalEvent.emit(false);
    }
    else {
      //TODO: Editar Nota
      this.modalEvent.emit(false);
    }
  }
  
  agregarFavorito() {
    this.favorito ? this.favorito = false: this.favorito = true;
    this.favorito ? this.iconoFavorito = "pi-thumbs-up" : this.iconoFavorito = "pi-thumbs-down";
  }

  rellenarDatos() {
    console.log(this.inputNota);
    
    this.titulo = this.inputNota.titulo;
    this.contenido = this.inputNota.contenido;
  }

}
