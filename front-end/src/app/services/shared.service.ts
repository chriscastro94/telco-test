import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from "ngx-cookie-service";
import { IOption } from 'ng-select';

export const USER_INFO = {
  id: null,
  usuario: null,
  password: null,
  nombre: null
};

export const HTTP_OPTIONS_TOKEN_PDF = {
  
  headers: new HttpHeaders({
    'Accept': 'application/pdf',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization'
  }), responseType: 'blob' as 'json'
};


export const HTTP_OPTIONS_TOKEN = {
  
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization'
  }),
};

export var HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
  }),
};

export const HTTP_OPTIONS_VND = {
  headers: new HttpHeaders({
    'Content-Type': 'application/vnd.api+json',
  }),
};

export const HTTP_OPTIONS_MULTIPART = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  }),
};

export const ANIOS: Array<IOption> = [{
  value: "2020",
  label: "2020",
},
{
  value: "2021",
  label: "2021",
}];

export const MESES: Array<IOption> = [
  {
    value: "1",
    label: "Enero",
  },
  {
    value: "2",
    label: "Febrero",
  },
  {
    value: "3",
    label: "Marzo",
  },
  {
    value: "4",
    label: "Abril",
  },
  {
    value: "5",
    label: "Mayo",
  },
  {
    value: "6",
    label: "Junio",
  },
  {
    value: "7",
    label: "Julio",
  },
  {
    value: "8",
    label: "Agosto",
  },
  {
    value: "9",
    label: "Septiembre",
  },
  {
    value: "10",
    label: "Octubre",
  },
  {
    value: "11",
    label: "Noviembre",
  },
  {
    value: "12",
    label: "Diciembre",
  }
];

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  listaTiposUsuario: string[] = [`ADMIN`, `CLIENTE`];

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private cookies: CookieService,) {

  }

  logout() {
 
      USER_INFO.usuario = null;
      USER_INFO.nombre = null;
      USER_INFO.password = null;
      this.cookies.deleteAll();
  }

  public getCookiesDataStatus(){
  
    try{
       // console.log("cookiesRaw:" , this.cookies.get("USER_INFO"));
        var responseDatos = JSON.parse(this.cookies.get("USER_INFO"));
       
        USER_INFO.id = responseDatos.usuario.id;
        USER_INFO.nombre = responseDatos.usuario.nombre;
        USER_INFO.usuario = responseDatos.usuario.usuario;
        USER_INFO.password = responseDatos.usuario.password;
        
    }catch(error){
        console.log(error);
        
    }
   
  
}

  stringIsNumber(s:string) {
    var x = +s; // made cast obvious for demonstration
    return x.toString() === s;
  }

  toUpperString(data: string) {
    var resp: string = "";
    try {
      resp = data.toUpperCase();
    } catch (ex) {
      resp = data;
    }
    return resp;
  }

  diasEntreDosFecha(date1Raw: string, date2Raw: string) {
    var resp: number = 0;
    try {

      var date1 = new Date(date1Raw);
      var date2 = new Date(date2Raw);

      // To calculate the time difference of two dates 
      var Difference_In_Time = date2.getTime() - date1.getTime();

      // To calculate the no. of days between two dates 
      resp = Difference_In_Time / (1000 * 3600 * 24);

    } catch (ex) {
      resp = 0;
    }
    return resp;

  }

  validaTipoIdentificacion(type: string) {
    var resp: string = "N/A";
    try {
      if (type == "C") {
        resp = "Cédula";
      }
      if (type == "R") {
        resp = "RUC";
      }
      if (type == "P") {
        resp = "Pasaporte";
      }

    } catch (ex) {
      resp = "N/A";
    }
    return resp.toUpperCase();
  }

  totalMessageTime(msg: string): number {
    var resp: number = 0;
    try {
      resp = Math.min(Math.max(msg.length * 50, 2000), 7000) + 1500;
    } catch (ex) {
      resp = 0;
    }
    return resp
  }

  mostrarModalSuccess(titulo: string) {
    Swal.fire({
      icon: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: 1500
    });
  }

  mostarModalWarning(mensaje: string) {
    Swal.fire({
      icon: 'warning',
      text: mensaje,
    });
  }

  mostarModalError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      text: mensaje,
    });
  }

  quitarValoresNull = (objeto: any) => {
    Object.keys(objeto).forEach(function (key) {
      if (objeto[key] === null || objeto[(key = `null`)]) {
        objeto[key] = '';
      }
    });
    return objeto;
  };

  quitarValoresUndefined = (objeto: any) => {
    Object.keys(objeto).forEach((key) => {
      const nested = objeto[key];
      objeto[key] = nested;
      if (objeto[key] === undefined || objeto[key] === null) {
        objeto[key] = 'N/A';
      }
      if (typeof nested === 'object' && nested != null) {
        Object.keys(nested).forEach((innerKey) => {
          if (nested[innerKey] === undefined || nested[innerKey] === null) {
            nested[innerKey] = 'N/A';
          }
        });
      }
    });
    return objeto;
  };

  volverAIntentar = async (message: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Volver a intentar',
      cancelButtonText: 'Cancelar',
    });
    return result;
  };

  preguntarEjecucion = async (question: string, message: string, actionDescription: string) => {
    const result = await Swal.fire({
      title: question,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2b2b2b',
      cancelButtonColor: '#d33',
      confirmButtonText: actionDescription,
      cancelButtonText: 'Cancelar',
    });
    return result;
  };

  mostrarSpinner = (name: string) => {
    this.spinner.show(name);
  };

  quitarSpinner = (name: string) => {
    this.spinner.hide(name);
  };

  showToastMsg(type: string, title: string, msg: string) {
    switch (type) {
      case "error":
        this.toastr.error(msg, 'Error', {
          timeOut: this.totalMessageTime(msg),
          progressBar: true
        });
        break;
      case "warning":
        this.toastr.warning(msg, 'Alerta', {
          timeOut: this.totalMessageTime(msg),
          progressBar: true
        });
        break;
      case "success":
        this.toastr.success(msg, 'Exito', {
          timeOut: this.totalMessageTime(msg),
          progressBar: true
        });
        break;
      default:
        this.toastr.info(msg, 'Informacion', {
          timeOut: this.totalMessageTime(msg),
          progressBar: true
        });
        break;
    }

  }
}
