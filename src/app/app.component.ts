import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import User from "./Models/user";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
}
