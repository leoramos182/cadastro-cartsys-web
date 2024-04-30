import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import { Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import UserFilter from "../../models/user-filter";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {UserResult} from "../../models/user-result";

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{

    grid: UserResult[] = []

    constructor(private userService: UserService,
                private route: Router,
                private toastr: ToastrService) {
    }

    formFilters = new UntypedFormGroup({
        name: new UntypedFormControl(null),
        email: new UntypedFormControl(null),
        active: new UntypedFormControl(null),
    });

    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers() {
        this.userService.getAllUsers()
            .subscribe(resp =>{
                this.grid = resp
            } )
    }

    goToEditUser(id: string){
        this.route.navigate([`/users/edit/${id}`]);
    }

    goToCreateUser(){
        this.route.navigate([`/users/new`]);
    }

    deleteUser(id: string){
        this.userService.delete(id)
            .subscribe(() => {
                this.toastr.success('User Deleted', 'Success');
                this.getAllUsers();
            })
    }

    changeStatus(id: string){
        this.userService.changeStatus(id)
            .subscribe(() => {
                this.toastr.success('User Status Changed', 'Success');
                this.searchUsers(this.formFilters.value);
            })
    }

    searchUsers(filter: UserFilter){
        this.userService.searchUsers(filter)
            .subscribe(resp => {
                this.toastr.success('Fetch Users by filter', 'Success');
                this.grid = resp;
            })
    }

    clearForm(){
        this.formFilters.reset();
    }

}
