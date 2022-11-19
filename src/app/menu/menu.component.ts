import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  iconoFavorito : string = "pi-thumbs-down";

  constructor( private notasService: ServicioService,
               private router: Router) { }

  ngOnInit(): void {
  }

  guardarNota() {
    this.notasService.crearNota(this.titulo, this.contenido, true).subscribe( res => {
      this.notasService.notas.push({
        nTitulo: this.titulo,
        nContenido: this.contenido,
        dFecha: new Date,
        bFavorito: true
      });
      this.modal = false;
    }); 
  }
  mostrarNuevaNota() {
    this.notasService.nuevaNota = true;
    this.modal=true
  }

  cerrarModal($event: boolean) {
    this.modal = $event;
  }

  ordenarNotas() {
    this.notasService.ordenarNotas(this.orden);
  }

  filtrarNotas( filtrar: boolean) {
    if (filtrar) {
      this.notasService.datosNotasFavoritas().subscribe( res => {
        this.notasService.notas = res;
        console.log(this.notasService.notas);
        this.router.navigate(["notas"]).then(() => {
          this.router.navigate(["favoritos"])
        });
      });
    } else {
      this.notasService.datosNotas().subscribe( res => {
        this.notasService.notas = res;
        console.log(this.notasService.notas);
        this.router.navigate(["favoritos"]).then(() => {
          this.router.navigate(["notas"])
        });
      });
    }
  }
  
}
