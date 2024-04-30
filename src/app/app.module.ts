import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { CreateEditUserComponent } from './pages/create-edit-user/create-edit-user.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { HomeComponent } from './pages/home/home.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './pages/login/login.component';
import {JwtInterceptor} from "./services/interceptors/jwt.interceptor";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {NgxPaginationModule} from "ngx-pagination";

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
        ReactiveFormsModule,
        NgxPaginationModule
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
