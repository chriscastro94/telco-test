import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { hostConvini, environment } from '../../environments/environment';
import { HTTP_OPTIONS, HTTP_OPTIONS_TOKEN } from './shared.service';
import { SessionEndpoint } from './enums/endpoint.enums';
import { map } from 'rxjs/operators';

@Injectable()
export class UsuariosService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = hostConvini;
    }

    logout(): void {
        sessionStorage.clear();
    }

    login = (
        request: TRequestDatosAuth
    ): Observable<any> => {
        const $URL = `${environment.hostBackend}${SessionEndpoint.Login}`;
        return this._http.post<any>(
            $URL,
            request,
            HTTP_OPTIONS_TOKEN
        );
    };

    auth(request: any): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.Login}`;
        return this._http.post<any>($URL, request, HTTP_OPTIONS_TOKEN);
    }

    users(): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.users}`;
        return this._http.get<any>($URL, HTTP_OPTIONS_TOKEN);
    }

    createUser(request: any): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.createUser}`;
        return this._http.post<any>($URL, request, HTTP_OPTIONS_TOKEN);
    }

    updateUser(id:string, request: any): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.updateUser}?id=${id}`;
        return this._http.put<any>($URL, request, HTTP_OPTIONS_TOKEN);
    }

    cambiaEstadoUser(id:string): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.cambiaEstadoUser}?id=${id}`;
        return this._http.put<any>($URL, {}, HTTP_OPTIONS_TOKEN);
    }

    /*
	 * Metodos de Rol
	 */
	

    roles(): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.roles}`;
        return this._http.get<any>($URL, HTTP_OPTIONS_TOKEN);
    }

    createRol(request: any): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.createRol}`;
        return this._http.post<any>($URL, request, HTTP_OPTIONS_TOKEN);
    }

    updateRol(id:string, request: any): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.updateRol}?id=${id}`;
        return this._http.put<any>($URL, request, HTTP_OPTIONS_TOKEN);
    }

    cambiaEstadoRol(id:string): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.cambiaEstadoRol}?id=${id}`;
        return this._http.put<any>($URL, {}, HTTP_OPTIONS_TOKEN);
    }

    /*
	 * Metodos de Aplicaciones
	 */

    aplicaciones(): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.aplicaciones}`;
        return this._http.get<any>($URL, HTTP_OPTIONS_TOKEN);
    }

    createAplicacion(request: any): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.createAplicacion}`;
        return this._http.post<any>($URL, request, HTTP_OPTIONS_TOKEN);
    }

    updateAplicacion(id:string, request: any): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.updateAplicacion}?id=${id}`;
        return this._http.put<any>($URL, request, HTTP_OPTIONS_TOKEN);
    }

    cambiaEstadoAplicacion(id:string): Observable<any> {
        const $URL = `${environment.hostBackend}${SessionEndpoint.cambiaEstadoAplicacion}?id=${id}`;
        return this._http.put<any>($URL, {}, HTTP_OPTIONS_TOKEN);
    }

}

export type TRequestDatosAuth = {
    usuario: string;
    password: string;
};

export type TUser = {
    id: number;
    roles: TRol[];
    usuario: string;
    nombre: string;
    password: string;
    estado: string;
};

export type TRol = {
    id: number;
    aplicaciones: TApplicacion[];
    nombre: string;
    estado: string;
};

export type TApplicacion = {
    id: number;
    descripcion: string;
    nombre: string;
    estado: string;
};
