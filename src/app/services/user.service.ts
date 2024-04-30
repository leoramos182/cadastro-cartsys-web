import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import UserFilter from "../models/user-filter";
import {AuthService} from "./auth.service";
import {ApiConfig} from "../consts/api-config";
import {BaseResult} from "../models/base-result";
import User from "../models/user";
import CreateUserCommand from "../models/create-user-command";
import UpdateUserCommand from "../models/update-user-command";
type Params = { [key: string]: any };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  private apiUrl = `${ApiConfig.BASE_URL}/api/users`
  headers = this.authService.getAuthHeaders();


  getUser(id: string): Observable<User> {

    return this.http.get<BaseResult<User>>(`${this.apiUrl}/${id}`,
        {headers: this.headers}).pipe(map(resp => resp.data));
  }

  getAllUsers(): Observable<User[]> {

    return this.http.get<BaseResult<User[]>>(`${this.apiUrl}`,
        {headers: this.headers}).pipe(map(resp => resp.data));
  }

  create(data: CreateUserCommand): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}`, data, {headers: this.headers}).pipe(map(resp => resp));
  }

  update(id: string, data: UpdateUserCommand): Observable<any> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, data, {headers: this.headers}).pipe(map(resp => resp));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {headers: this.headers}).pipe(map(resp => resp));
  }

  changeStatus(id: string): Observable<any> {
    return this.http.patch<User>(`${this.apiUrl}/${id}/change-status`, null, {headers: this.headers}).pipe(map(resp => resp));
  }

  searchUsers(filter: UserFilter): Observable<any> {
    const queryParams = this.createHttpParams(filter);
    return this.http.get<BaseResult<User[]>>(`${this.apiUrl}/search?`, {params: queryParams, headers: this.headers}).pipe(map(resp => resp.data));
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

