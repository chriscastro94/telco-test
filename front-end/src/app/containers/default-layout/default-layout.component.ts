import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {  SharedService, USER_INFO } from '../../services/shared.service';
import { navItems } from '../../_nav';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  user_info: any;

  constructor(private router : Router, private _sharedService: SharedService,){
    this._sharedService.getCookiesDataStatus();
    this.getUserName();
    console.log("User-Info", USER_INFO);
    
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
 
  getUserName(){
   this.user_info =  USER_INFO || {nombre: "Usuario"} 
  }

  logout(){
    sessionStorage.clear();
    this._sharedService.logout();
    this.router.navigate(['/login']);
  }
}
