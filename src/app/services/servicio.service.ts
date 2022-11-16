import { Injectable } from '@angular/core';
import { Route, Router } from "@angular/router";
import { of } from 'rxjs';
import { Nota } from '../interfaces/nota';
import { BehaviorSubject } from 'rxjs';

//TODO: CREAR INTERFACE DE NOTAS
@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  notas             : Nota[] = []
  mostrarFavoritos  : boolean = false;
  nuevaNota         !: boolean;
  fecha             : Date = new Date();
  notasFiltradas    : Nota[] = [];
  iconoFavorito     : string[] = [];
  iconoFavoritos    : string[] = [];
  nota              : Nota = {
    titulo: '',
    contenido: '',
    fecha: new Date,
    favorito: false
  };
  private messageSource = new BehaviorSubject<string>("");
  changeVar = this.messageSource.asObservable();
  constructor( private router: Router) { 

    this.notas = [
      {
        "titulo":"Primer Titulo",
        "contenido":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis deserunt ea laudantium asperiores nesciunt amet ex beatae cupiditate quos, porro totam reiciendis. Suscipit nulla aspernatur quia enim reiciendis porro aliquam.",
        "fecha": new Date('2021-12-17T01:30:00'),
        "favorito": true
      },
      
      {
        "titulo":"Segundo Titulo",
        "contenido":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis deserunt ea laudantium asperiores nesciunt amet ex beatae cupiditate quos, porro totam reiciendis. Suscipit nulla aspernatur quia enim reiciendis porro aliquam.",
        "fecha": new Date('2022-09-13T11:45:00'),
        "favorito": true
      },
      {
        "titulo":"Tercero Titulo",
        "contenido":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis deserunt ea laudantium asperiores nesciunt amet ex beatae cupiditate quos, porro totam reiciendis. Suscipit nulla aspernatur quia enim reiciendis porro aliquam.",
        "fecha": new Date('2022-06-21T09:15:00'),
        "favorito": false
      }
    ]
  }

  changeMyVar (message: string) {
    this.messageSource.next(message)
  }

  guardarNota(titulo: string, contenido: string, favorito: boolean){
    var fecha: Date = new Date();
    this.notas.unshift( {
      "titulo":titulo,
      "contenido": contenido,
      "fecha":fecha,
      "favorito": favorito
    });
  }

  botonFavoritos() {
    this.notas.forEach( (nota, index) => {
      if (nota.favorito) {
        this.iconoFavorito[index] = "pi-thumbs-up";
      }
      else {
        this.iconoFavorito[index] = "pi-thumbs-down";
      }
    });
    return this.iconoFavorito;
  }

  editarNota( i: number ) {
    this.nota = this.notas[i];
    console.log(this.nota);
    
    return of(this.nota);
  }

  ordenarNotas(orden: boolean) {
    if (orden) {
      this.notas.sort(this.ordenarAbc);    
      this.notasFiltradas.sort(this.ordenarAbc)  
    }
    else {
      this.notas.sort(this.ordenarFecha);
      this.notasFiltradas.sort(this.ordenarFecha);
    }
  }

  ordenarAbc(x: any, y: any){
    return x.titulo.localeCompare(y.titulo);
  }

  ordenarFecha(x: any, y: any) {
    var firstDate = new Date(x.fecha),
      SecondDate = new Date(y.fecha);
      
    if (firstDate > SecondDate) return -1;
    if (firstDate < SecondDate) return 1;
    return 0;
  }

  filtroFavoritos() {
     this.notasFiltradas = this.notas.filter( nota => nota.favorito == true);
  }

  botonFavoritosFavoritas() {
    this.notasFiltradas.forEach( (nota, index) => {
      if (nota.favorito) {
        this.iconoFavoritos[index] = "pi-thumbs-up";
      }
      else {
        this.iconoFavoritos[index] = "pi-thumbs-down";
      }
    });
    return this.iconoFavoritos;
  }

  quitarFavoritas(i : number) {
    var pequeños = this.notasFiltradas.filter( nota => nota.titulo == this.notasFiltradas[i].titulo);
    var titulo = pequeños[0].titulo;
    this.notas.forEach(element => {
      if (element.titulo == titulo) {
        element.favorito = !element.favorito;
      }
    });
    this.botonFavoritosFavoritas();
    this.router.navigate(["notas"]).then(() => {
      this.filtroFavoritos();
      this.router.navigate(["favoritos"])
    });
  }


}
