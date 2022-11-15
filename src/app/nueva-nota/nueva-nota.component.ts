import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Nota } from '../interfaces/nota';
import { ServicioService } from '../services/servicio.service';

@Component({
  selector: 'app-nueva-nota',
  templateUrl: './nueva-nota.component.html',
  styleUrls: ['./nueva-nota.component.css']
})
export class NuevaNotaComponent implements OnInit {
  @Output() modalEvent = new EventEmitter<boolean>();
  @Input() inputNota !: Nota;
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
    console.log(this.nota);
    
    /* this.editarNota.subscribe((nota)=>{
      console.log(nota);
      
      //this.titulo =  nota.titulo;
    }) */
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

  rellenarDatos() {
    console.log(this.nota);
    
    this.titulo = this.nota.titulo;
    this.contenido = this.nota.contenido;
  }

}
