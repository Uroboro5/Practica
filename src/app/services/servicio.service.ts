import { Injectable } from '@angular/core';
import { Nota } from '../interfaces/nota';

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
  constructor() { 
    this.notas = [
      {
        "titulo":"Primer Titulo",
        "contenido":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis deserunt ea laudantium asperiores nesciunt amet ex beatae cupiditate quos, porro totam reiciendis. Suscipit nulla aspernatur quia enim reiciendis porro aliquam.",
        "fecha":this.fecha,
        "favorito": true
      },
      {
        "titulo":"Segundo Titulo",
        "contenido":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis deserunt ea laudantium asperiores nesciunt amet ex beatae cupiditate quos, porro totam reiciendis. Suscipit nulla aspernatur quia enim reiciendis porro aliquam.",
        "fecha":this.fecha,
        "favorito": false
      },
      {
        "titulo":"Tercero Titulo",
        "contenido":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis deserunt ea laudantium asperiores nesciunt amet ex beatae cupiditate quos, porro totam reiciendis. Suscipit nulla aspernatur quia enim reiciendis porro aliquam.",
        "fecha":this.fecha,
        "favorito": true
      }
    ]
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

  editarNota( i: number ) {
    this.nota = this.notas[i];
  }

  notaSelec() {
    return this.nota;
  }

  ordenarNotas(orden: boolean) {
    if (orden) {
      this.notas.sort(this.ordenarAbc);      
    }
    else {
      //this.notas.sort(this.ordenarFecha);
    }
  }

  ordenarAbc(x: any, y: any){
    return x.titulo.localeCompare(y.titulo);
  }

  ordenarFecha(x: Nota, y: Nota){
    /* console.log(this.notas.sort((a, b) => a.fechas > b.fechas));
    console.log(this.notas.sort((a, b) => new Date(a.fechas).getTime() > new Date(b.fechas).getTime()));
 */
    //return x.fecha.toString.prototype.localeCompare(y.fecha.toString);
  }

  filtroFavoritos() {
     this.notasFiltradas = this.notas.filter( nota => nota.favorito == true);
  }

}
