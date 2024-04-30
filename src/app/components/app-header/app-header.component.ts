import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {

  constructor(private router: Router, private authService: AuthService) {
  }

  goHome(){
    this.router.navigate(['/home']);
  }
  goListUsers(){
    this.router.navigate(['/users/list']);
  }
  logOut(){
    this.authService.logout();
  }
}
