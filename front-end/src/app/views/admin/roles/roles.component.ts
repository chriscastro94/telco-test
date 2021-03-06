import { ChangeDetectorRef, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsuariosService, TRequestDatosAuth, TRol } from '../../../services/user.service';
import { SharedService, USER_INFO } from '../../../services/shared.service';
import { RouteConfigLoadStart, Router } from '@angular/router';
import { IOption } from 'ng-select';

@Component({
  templateUrl: 'roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers: [UsuariosService,]
})

export class RolesComponent implements OnInit {


  public listaTabla: TRol[] = [];

  /*0: view - 1: crear - 2: actualiza
  */
  public modo: string = "0";
  public options: Array<IOption> = [];


  public formInfo: TItem; 
  public id: string = "";

  constructor(private router: Router,
    private _usuarioService: UsuariosService,
    private _sharedService: SharedService,) { 
      this.resetForm();
    }

  resetForm() {
    this.formInfo ={
      nombre: "",
      aplicaciones: []
    }
  }

  async ngOnInit() {
    await this.consultaTabla();
    await this.consultaOptions();
    
  }

  /*
  * Metodo para describir estado
  */
  itemText(tipo: string): string {
    var resp = "";
    if (tipo === "A") {
      resp = "Activo"
    }

    if (tipo === "I") {
      resp = "Inactivo"
    }

    return resp;
  }

  /*
  * Metodo para estilos de estado
  */

  itemClass(tipo: string): string[] {
    var resp = [];
    if (tipo === "A") {
      resp = ["badge", "badge-success"]
    }

    if (tipo === "I") {
      resp = ["badge", "badge-secondary"]
    }
    return resp;
  }

  cancelar() {
    this.modo = "0";
    this.resetForm();
  }

  iniciaCreacion() {
    this.modo = "1";
    this.resetForm();
  }

  iniciaUpdate(id:string, itemRaw: TRol) {
    console.log("Update-item:", itemRaw);
    this.modo = "2";
    this.id = id;
    this.resetForm();
    this.formInfo = {
      nombre: itemRaw.nombre,
      aplicaciones: [],
    };
    this.formInfo.aplicaciones= [];
    for (var i = 0, len = itemRaw.aplicaciones.length; i < len; i++) {
      var item = itemRaw.aplicaciones[i];
      this.formInfo.aplicaciones.push(item.id+"");
    }
  
    console.log("Update:", this.formInfo);
  }

  guardar() {
    console.log(this.formInfo.aplicaciones);
    this.crearItem(this.formInfo);
  }

  actualizar() {
    console.log(this.id, this.formInfo);
    this.actualizaItem(this.id, this.formInfo);
  }

  /*
  * Metodo para consultar estado de la tabla
  */

  async consultaTabla() {
    try {

      const responseDatos = await this._usuarioService.roles().toPromise();
      if (responseDatos) {
        this.listaTabla = responseDatos;
        console.log("lista", responseDatos);
      } else {
      }

    } catch (error) {
      console.log(error);
      this._sharedService.mostarModalError(`${error.error.message}` || `${error.message}`);
    } finally {

    }
  }

  /*
  * Metodo para consultar options de la tabla
  */

  async consultaOptions() {
    try {

      const responseDatos = await this._usuarioService.aplicaciones().toPromise();
      if (responseDatos) {
        var lista: any[]= responseDatos;
        this.options = [];
        for (var i = 0, len = lista.length; i < len; i++) {
          var item = lista[i];
          this.options.push({ label: item.nombre, value: item.id + "" });
        }
      } else {
      }

    } catch (error) {
      console.log(error);
      this._sharedService.mostarModalError(`${error.error.message}` || `${error.message}`);
    } finally {

    }
  }


  async cambiaEstadoItem(id:string) {
    try {
      
      const responseDatos = await this._usuarioService.cambiaEstadoRol(id).toPromise();
      if (responseDatos.code == "200") {
        this._sharedService.showToastMsg("success", "", "Cambio de estado aceptado");
        await this.consultaTabla();
      } else {
        this._sharedService.showToastMsg("error", "", "Cambio de estado negado");
      }

    } catch (error) {
      console.log(error);
      this._sharedService.mostarModalError(`${error.error.message}` || `${error.message}`);
    } finally {

    }
  }

  async crearItem(item:any) {
    try {
      
      const responseDatos = await this._usuarioService.createRol(item).toPromise();
      if (responseDatos.code == "200") {
        this._sharedService.showToastMsg("success", "", "Creaci??n de item aceptado");
        await this.consultaTabla();
        this.modo ="0";
      } else {
        this._sharedService.showToastMsg("error", "", "Creaci??n de item negado");
      }

    } catch (error) {
      console.log(error);
      this._sharedService.mostarModalError(`${error.error.message}` || `${error.message}`);
    } finally {

    }
  }

  async actualizaItem(id:string, item:any) {
    try {
      
      const responseDatos = await this._usuarioService.updateRol(id, item).toPromise();
      if (responseDatos.code == "200") {
        this._sharedService.showToastMsg("success", "", "Actualizaci??n de item aceptado");
        await this.consultaTabla();
        this.modo ="0";
      } else {
        this._sharedService.showToastMsg("error", "", "Actualizaci??n de item negado");
      }

    } catch (error) {
      console.log(error);
      this._sharedService.mostarModalError(`${error.error.message}` || `${error.message}`);
    } finally {

    }
  }

}

type TItem = {
  nombre: string;
  aplicaciones: string[];
}