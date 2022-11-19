import { Injectable } from '@angular/core';
import { Route, Router } from "@angular/router";
import { of } from 'rxjs';
import { Nota } from '../interfaces/nota';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private _baseUrl = environment.baseApi;
  notas             : Nota[] = []; //ESTE VIENE SIENDO EL ARREGLO QUE TENGO EN EL SERVICIO ¿como estas?,mira 
  mostrarFavoritos  : boolean = false;
  nuevaNota         !: boolean;
  fecha             : Date = new Date();
  notasFiltradas    : Nota[] = [];
  iconoFavorito     : string[] = [];
  iconoFavoritos    : string[] = [];
  nota              : Nota = {
    nTitulo: '',
    nContenido: '',
    dFecha: new Date,
    bFavorito: false
  };
  private messageSource = new BehaviorSubject<string>("");
  changeVar = this.messageSource.asObservable();
  constructor( private router: Router,
               private http: HttpClient) { 
  }

  datosNotas() {
    return this.http.get<Nota[]>(`${this._baseUrl}notas`);
  }
  
  datosNotasFavoritas() {
    return this.http.get<Nota[]>(`${this._baseUrl}notasFavoritas`);
  }

  crearNota( nTitulo: string, nContenido: string, bFavorito:boolean ) {
    const body = { nTitulo, nContenido, bFavorito };
    return this.http.post<Nota>(`${this._baseUrl}notas`, body);
  }

  actualizarNota( nTitulo: string, nContenido: string, bFavorito:boolean, iId: number) {
    const body = { nTitulo, nContenido, bFavorito, iId};
    return this.http.put<Nota>(`${this._baseUrl}updateNotas`, body);
  }

  eliminarNota( iId: number) {
    const body = { iId };
    return this.http.post(`${this._baseUrl}deleteNotas`, body);
  }

  cambiarFavorito(favorito: boolean, iId: number) {
    console.log(favorito);
    var bFavorito = !favorito;
    console.log(bFavorito);
    const body = { bFavorito, iId };
    return this.http.put(`${this._baseUrl}updateFavorito`, body);
  }

  ordenarNotas(orden: boolean) {
    if (orden) {
      console.log(this.notas);
      this.notas.sort(this.ordenarAbc);    
    }
    else {
      this.notas.sort(this.ordenarFecha);
    }
  }

  ordenarAbc(x: any, y: any){
    return x.nTitulo.localeCompare(y.nTitulo);
  }

  ordenarFecha(x: any, y: any) {
    var firstDate = new Date(x.dFecha),
      SecondDate = new Date(y.dFecha);
      
    if (firstDate > SecondDate) return -1;
    if (firstDate < SecondDate) return 1;
    return 0;
  }

  




  
  changeMyVar (message: string) {
    this.messageSource.next(message)
  }

  guardarNota(titulo: string, contenido: string, favorito: boolean){
    var fecha: Date = new Date();
    this.notas.unshift({
      "nTitulo":titulo,
      "nContenido": contenido,
      "dFecha":fecha,
      "bFavorito": favorito
    });
  }

  botonFavoritos() {
    this.notas.forEach( (nota, index) => {
      if (nota.bFavorito) {
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

  filtroFavoritos() {
     this.notasFiltradas = this.notas.filter( nota => nota.bFavorito == true);
  }

  botonFavoritosFavoritas() {
    this.notasFiltradas.forEach( (nota, index) => {
      if (nota.bFavorito) {
        this.iconoFavoritos[index] = "pi-thumbs-up";
      }
      else {
        this.iconoFavoritos[index] = "pi-thumbs-down";
      }
    });
    return this.iconoFavoritos;
  }

  quitarFavoritas(i : number) {
    var pequeños = this.notasFiltradas.filter( nota => nota.nTitulo == this.notasFiltradas[i].nTitulo);
    var titulo = pequeños[0].nTitulo;
    this.notas.forEach(element => {
      if (element.nTitulo == titulo) {
        element.bFavorito = !element.bFavorito;
      }
    });
    this.botonFavoritosFavoritas();
    this.router.navigate(["notas"]).then(() => {
      this.filtroFavoritos();
      this.router.navigate(["favoritos"])
    });
  }


}
