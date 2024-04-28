import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {

  constructor(private router: Router) {
  }

  goHome(){
    this.router.navigate(['/home']);
  }
  goListUsers(){
    this.router.navigate(['/users/list']);
  }
}
