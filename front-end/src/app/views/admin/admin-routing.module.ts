import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { AplicacionesComponent } from './aplicaciones/aplicaciones.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: '',
        redirectTo: 'usuarios'
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
          title: 'Usuarios'
        }
      }
      ,
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: 'Roles'
        }
      }
      ,
      {
        path: 'aplicaciones',
        component: AplicacionesComponent,
        data: {
          title: 'Aplicaciones'
        }
      }
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
