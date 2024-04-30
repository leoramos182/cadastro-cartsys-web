import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ApiConfig} from "../consts/api-config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'jwt';
    private loginUrl = `${ApiConfig.BASE_URL}/login`;


  getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem("jwt");
      if (token) {
          return new HttpHeaders({
              "Authorization": `Bearer ${token}`,
          })
      }
      return new HttpHeaders();
  }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem(this.tokenKey);
        return token !== null;
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

  constructor(private http: HttpClient,
              private router: Router) { }
}
