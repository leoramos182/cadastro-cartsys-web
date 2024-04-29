import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import UserFilter from "../models/user-filter";
import {AuthService} from "./auth.service";

type Params = { [key: string]: any };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  private apiUrl = 'http://localhost:5167/api/users';

  getUser(id: string): Observable<any> {
    var headers = this.authService.getAuthHeaders();

    return this.http.get<any>(`${this.apiUrl}/${id}`,
        {headers: headers}).pipe(map(resp => resp.data));
  }

  getAllUsers(): Observable<any> {
    var headers = this.authService.getAuthHeaders();

    return this.http.get<any>(`${this.apiUrl}`,
        {headers: headers}).pipe(map(resp => resp.data));
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data).pipe(map(resp => resp));
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data).pipe(map(resp => resp));
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(map(resp => resp));
  }

  changeStatus(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/change-status`, null).pipe(map(resp => resp));
  }

  searchUsers(filter: UserFilter): Observable<any> {
    const queryParams = this.createHttpParams(filter);
    return this.http.get<any>(`${this.apiUrl}/search?`, {params: queryParams}).pipe(map(resp => resp.data));
  }

  private createHttpParams(params: Params): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((param) => {
      if (params[param] !== undefined && params[param] !== null) {
        httpParams = httpParams.set(param, String(params[param]));
      }
    });

    return httpParams;
  }

}

