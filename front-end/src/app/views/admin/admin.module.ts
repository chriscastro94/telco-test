import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AdminModuleRoutingModule } from './admin-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { AplicacionesComponent } from './aplicaciones/aplicaciones.component';

import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// Ng2-select
import { SelectModule } from 'ng-select';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
// RECOMMENDED
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  imports: [
    TabsModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SelectModule,
    FormsModule,
    BsDropdownModule,
    CommonModule,
    DataTablesModule,
    NgxSpinnerModule,
    AdminModuleRoutingModule,
  ],
  declarations: [
    UsuariosComponent,
    RolesComponent,
    AplicacionesComponent]
  })

export class TareasModule { }
