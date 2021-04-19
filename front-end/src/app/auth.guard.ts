import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SharedService, USER_INFO } from './services/shared.service';
import { CookieService } from "ngx-cookie-service";
import { Observable } from 'rxjs';
import { navItems } from './_nav';
import { environment } from '../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate,  CanActivateChild{


    constructor(private router : Router, private _sharedService: SharedService, private cookies: CookieService,){}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return true;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       return true;
    }
    
   

    public getCookiesDataStatus(): boolean{
        let status = false;
        try{
           // console.log("cookiesRaw:" , this.cookies.get("USER_INFO"));
            var responseDatos = JSON.parse(this.cookies.get("USER_INFO"));
            USER_INFO.id = responseDatos.usuario.id;
            USER_INFO.nombre = responseDatos.usuario.nombre;
            USER_INFO.usuario = responseDatos.usuario.usuario;
            USER_INFO.password = responseDatos.usuario.password;
            console.log("cookies:" , USER_INFO);
            status = true;
        }catch(error){
            console.log(error);
            status = false;
        }
       
        return status;
    }

}