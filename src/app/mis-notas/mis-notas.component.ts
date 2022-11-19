import { Component, OnInit } from '@angular/core';
import { Nota } from '../interfaces/nota';
import { ServicioService } from '../services/servicio.service';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-mis-notas',
  templateUrl: './mis-notas.component.html',
  styleUrls: ['./mis-notas.component.css']
})
export class MisNotasComponent implements OnInit {

  notas          : Nota[] = [];
  titulo        : string  = "";
  contenido     : string = "";
  favoritos      : boolean = true;
  modal         !: boolean;
  iconoFavorito  : string[] = [];
  editaNota      : boolean = true;
  nota           : Nota = {
    nTitulo: '',
    nContenido: '',
    dFecha: new Date,
    bFavorito: false
  };

  constructor( private notasService: ServicioService,
               private swalService: SwalService) {}

  ngOnInit(): void {
    this.notasService.botonFavoritos();
    this.iconoFavorito = this.notasService.iconoFavorito;
    this.notasService.datosNotas().subscribe( res => {
      this.notasService.notas = res;
      this.notas = this.notasService.notas;
      //AQUI HAGO LA PETICION DONDE ME TRAE LOS DATOS DE LA BD Y SE LOS ASIGNO AL ARREGLO QUE ESTA EN EL SERVICIO
    });
  }

  actualizarNota() {
      console.log(this.nota);
      this.modal = false;
      this.notasService.actualizarNota(this.titulo, this.contenido,this.nota.bFavorito,this.nota.iId!).subscribe( res => {
        console.log(res);
        var resNota = res;
      this.notasService.notas = this.notasService.notas.map(e=>{
        if (e.iId === resNota.iId) {
          return {...resNota, nTitulo: 'NUEVO😀'}
        }
        return e;
      })
       
        /* var n:any;
       n =res; */
        /* this.notas.forEach(element => {
          if(element.iId == n[0].iId){
            console.log("entros")
            element.nTitulo = n[0].nTitulo;
          }
        }); */
    });
  }

  borrarNota(id: number, titulo: string) {
    this.swalService.confirmarBorrado(id, titulo);
  }

  editarNota(nota: Nota) {


    this.titulo = nota.nTitulo;
    this.contenido = nota.nContenido;
    this.nota = nota;
    this.modal = true;
    //this.nota = this.notas[index];
    //this.notasService.nota = this.nota;
    /* this.notasService.editarNota(index).subscribe( res => {
      this.nota = res;
    }); */
  }







  agregarFavoritos(id: number, favorito: boolean) {
    this.notasService.cambiarFavorito(favorito, id).subscribe( res => {
      console.log(res);

    });
    /* this.notasService.notas[index].bFavorito = !this.notasService.notas[index].bFavorito;
    this.notasService.botonFavoritos(); */
  }

  cerrarModal($event: boolean) {
    this.modal = $event;
  }

}
