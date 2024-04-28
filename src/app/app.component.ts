import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import User from "./Models/User";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cadastroCartsys.Web';
  user: any;

  constructor(private userService: UserService,
              private toastr: ToastrService) {}

  ngOnInit(): void{
    this.userService.getUser('8DABC1D7-C71F-48F9-84A6-5FF2855D1423')
        .subscribe((resp) => {
          console.log(resp)
          this.user = resp
        } )
  }

  data: User = {
      name: "teste",
      email: "teste@email.com.br",
      password: "123123"
  }

  AddUser(){
      this.userService.create(this.data)
          .subscribe((resp) =>
          {
              this.showSuccessNotification();
          },
              error => {
              console.log(error)
                  this.showErrorNotification(error);
              })
  }

  showSuccessNotification(){
      this.toastr.success('Success message', 'Success');
  }

  showErrorNotification(error: string){
      this.toastr.error(error, 'Error');
  }
}
