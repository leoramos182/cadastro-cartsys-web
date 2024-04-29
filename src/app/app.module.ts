import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule, ToastrService} from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { HomeComponent } from './home/home.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {JwtInterceptor} from "./auth/jwt.interceptor";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";


const toastConfig = {
  timeOut: 3000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
};

export const ToastConfig = new InjectionToken('ToastConfig');


@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    CreateEditUserComponent,
    AppHeaderComponent,
    HomeComponent,
    AppFooterComponent,
    LoginComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ToastrModule.forRoot({
            timeOut: 3000,  // Default time for toast
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
  providers: [{ provide: ToastConfig, useValue: toastConfig },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
