import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService, TRequestDatosAuth,  } from '../../services/user.service';

import { SharedService, USER_INFO } from '../../services/shared.service';
import { ValidationFormsService } from '../../services/validation-forms.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { CookieService } from "ngx-cookie-service";


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuariosService, ValidationFormsService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginSubmitted = false;
  loginFormErrors: any;

  login_spinner = `login_spinner`;

  constructor(
    private router: Router,
    private _usuarioService: UsuariosService,
    private _sharedService: SharedService,
    private fb: FormBuilder,
    public vf: ValidationFormsService, private cookies: CookieService
  ) {
    this.cookies.deleteAll();
    sessionStorage.clear();
    this.loginFormErrors = this.vf.errorMessages;
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  async ngOnInit(): Promise<void> {

  }

  private login() {
    this.router.navigate(['/home']);
  }

  onReset() {
    this.loginSubmitted = false;
    this.createLoginForm();
  }

  authLogin = async () => {
    this.loginSubmitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    try {
      this._sharedService.mostrarSpinner(this.login_spinner);

      const usuario = this.loginForm.value.userName;
      const password = this.loginForm.value.password;
      const datosAuth: TRequestDatosAuth = {
        usuario,
        password
      };
      const responseDatos = await this._usuarioService.auth(datosAuth).toPromise();
      if (responseDatos) {
      
        console.log("USER", responseDatos);
        this.login();
        this.cookies.set("USER_INFO", JSON.stringify(responseDatos));
       
      } else {
        this._sharedService.showToastMsg("error", "", "Usuario o Contraseña Incorrecta");
      }
      
    } catch (error) {
      console.log(error);
      this._sharedService.mostarModalError(`${error.error.message}` || `${error.message}`);
    } finally {
      this._sharedService.quitarSpinner(this.login_spinner);
    }

    this.loginSubmitted = false;
    if (this.loginForm.invalid) {
      return;
    }
  }

}
