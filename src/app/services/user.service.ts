import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";

type Params = { [key: string]: any };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5167/api/users';

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(map(resp => resp.data));
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

