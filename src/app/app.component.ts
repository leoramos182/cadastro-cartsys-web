import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cadastroCartsys.Web';
  user: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void{
    this.userService.getUser('8DABC1D7-C71F-48F9-84A6-5FF2855D1423')
        .subscribe((resp) => {
          console.log(resp)
          this.user = resp
        } )
  }
}
