import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../services/servicio.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  modal     : boolean = false;
  titulo    : string = "";
  contenido : string = "";
  orden     : boolean = false;
  editaNota : boolean = false;

  constructor( private notasService: ServicioService ) { }

  ngOnInit(): void {
  }

  mostrarNuevaNota() {
    this.notasService.nuevaNota = true;
    this.modal=true
  }

  cerrarModal($event: boolean) {
    this.modal = $event;
  }

  ordenarNotas() {
    console.log("ordenar");
    
    this.notasService.ordenarNotas(this.orden);
  }

  filtrarNotas() {
    this.notasService.filtroFavoritos();
    this.notasService.botonFavoritosFavoritas();
  }
  
}
