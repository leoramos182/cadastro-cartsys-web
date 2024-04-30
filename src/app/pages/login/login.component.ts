import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ToastrService} from "ngx-toastr";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {ApiConfig} from "../../consts/api-config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidLogin?: boolean;
  private url = `${ApiConfig.BASE_URL}/auth/`;

  constructor(private router: Router,
              private http: HttpClient,
              private jwtHelper : JwtHelperService,
              private toastr: ToastrService) { }

    form = new UntypedFormGroup({
        email: new UntypedFormControl(null),
        password: new UntypedFormControl(null),
    });

  public login = (form: any) => {
    const credentials = JSON.stringify(form.value);

    this.http.post(this.url + "login", credentials, {
      responseType: "json",
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
        if (response && response.hasOwnProperty("result")){
            const token = (response as any).result.token;
            localStorage.setItem("jwt", token);
            this.invalidLogin = false;
            this.toastr.success("Logged In successfully");
            this.router.navigate(["/home"]);
        }
        }, err => {
          this.invalidLogin = true;
        this.toastr.error("Invalid Login");

    });
  }

    isUserAuthenticated() {
        const token = localStorage.getItem("jwt");
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        }
        else {
            return false;
        }
    }
}
