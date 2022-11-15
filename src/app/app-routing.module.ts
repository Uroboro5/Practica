import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisNotasComponent } from './mis-notas/mis-notas.component';
import { NotasFavoritasComponent } from './notas-favoritas/notas-favoritas.component';

const routes: Routes = [
  {
    path:"notas",
    component:MisNotasComponent
  },
  {
    path:"favoritos",
    component:NotasFavoritasComponent
  },
  {
    path:"**",
    redirectTo:'notas'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
