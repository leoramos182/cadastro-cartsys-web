import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

    private tokenKey = 'auth-token'; // Key for storing token in localStorage
    private loginUrl = 'http://localhost:5167/login';

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, password }).pipe(
        tap((response: any) => {
          const token = response.token;
          if (token) {
            localStorage.setItem(this.tokenKey, token);
          }
        })
    );
  }

  getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem("jwt");
      if (token) {
          var teste = new HttpHeaders({
              "Authorization": `Bearer ${token}`, // Use "Bearer" schema for JWT
          });
          return teste
      }
      return new HttpHeaders();
  }

    logout(): void {
        localStorage.removeItem(this.tokenKey); // Clear the token from storage
        this.router.navigate(['/login']); // Redirect to login page
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
