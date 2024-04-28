import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import CreateUserCommand from "../Models/create-user-command";
import {UserService} from "../services/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize, takeWhile} from "rxjs";
import {ToastrService} from "ngx-toastr";
import UpdateUserCommand from "../Models/update-user-command";

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent implements OnInit{

  userId: any;
  command: any;
  obs: any;
  submitted = false;
  form: any;


  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private spinnerService: NgxSpinnerService,
              private toastrService: ToastrService) {
  }

  createForm() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      email: new UntypedFormControl(null, [
        Validators.required,
        Validators.email,
      ]),
    });

    // If it's a new user, add the password fields
    if (!this.userId) {
      this.form.addControl(
          'password',
          new UntypedFormControl(null, Validators.required)
      );
      this.form.addControl(
          'confirmPassword',
          new UntypedFormControl(null, Validators.required)
      );
    }
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id')!;
    })

    if(this.userId){
      this.userService.getUser(this.userId).subscribe(resp => {
        this.form.get('name').setValue(resp.name);
        this.form.get('email').setValue(resp.email);
      })
    }

    this.createForm();
  };

  createNewUser(){
    this.spinnerService.show();
    this.submitted = true

    if(!this.userId){
      if(this.form.get('password')?.value !== this.form.get('confirmPassword')?.value)
        return
    }

    if (this.form.invalid)
      return;

    if(!this.userId){
      this.command = { ...this.form.value } as CreateUserCommand
      console.log(this.command)
      this.obs = this.userService.create(this.command)
    }
    else{
      this.command = { ...this.form.value } as UpdateUserCommand
      console.log(this.command)
      this.obs = this.userService.update(this.userId, this.command)
    }

    this.obs.pipe(
        finalize(() => this.spinnerService.hide())
    ).subscribe(() => {
      this.toastrService.success(
          "Data saved",
          "Success"
      );
    })
  }

  testId(){
    console.log(this.userId);
  }

}
