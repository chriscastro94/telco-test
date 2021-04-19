import { ChangeDetectorRef, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsuariosService, TRequestDatosAuth, } from '../../../services/user.service';
import { SharedService, USER_INFO } from '../../../services/shared.service';
import { RouteConfigLoadStart, Router } from '@angular/router';
import { IOption } from 'ng-select';

@Component({
  templateUrl: 'aplicaciones.component.html',
  styleUrls: ['./aplicaciones.component.css'],
  providers: [UsuariosService,]
})

export class AplicacionesComponent implements OnInit {


  public listaTabla: any[] = [];

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
      descripcion:""
    }
  }

  async ngOnInit() {
    await this.consultaTabla();
    
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

  iniciaUpdate(id:string, item: any) {
    this.modo = "2";
    this.id = id;
    this.resetForm();
    this.formInfo = item;
    console.log("Update-item:", item);
    console.log("Update:", this.formInfo);
  }

  guardar() {
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

      const responseDatos = await this._usuarioService.aplicaciones().toPromise();
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

 


  async cambiaEstadoItem(id:string) {
    try {
      
      const responseDatos = await this._usuarioService.cambiaEstadoAplicacion(id).toPromise();
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
      
      const responseDatos = await this._usuarioService.createAplicacion(item).toPromise();
      if (responseDatos.code == "200") {
        this._sharedService.showToastMsg("success", "", "Creación de item aceptado");
        await this.consultaTabla();
        this.modo ="0";
      } else {
        this._sharedService.showToastMsg("error", "", "Creación de item negado");
      }

    } catch (error) {
      console.log(error);
      this._sharedService.mostarModalError(`${error.error.message}` || `${error.message}`);
    } finally {

    }
  }

  async actualizaItem(id:string, item:any) {
    try {
      
      const responseDatos = await this._usuarioService.updateAplicacion(id, item).toPromise();
      if (responseDatos.code == "200") {
        this._sharedService.showToastMsg("success", "", "Actualización de item aceptado");
        await this.consultaTabla();
        this.modo ="0";
      } else {
        this._sharedService.showToastMsg("error", "", "Actualización de item negado");
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
  descripcion: string;
}