import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { AuthenticationService } from '@app/_services';
import { Router,NavigationExtras } from "@angular/router";
import { UserForRegistration } from '@app/_models/userForRegistration';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {

  users: User[];
  usersForRegister: UserForRegistration[];

  constructor(private router: Router, 
    private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
        console.log(data);
      });

      this.userService.getUserForUsers()
      .subscribe(data => {
        this.usersForRegister = data;
        console.log(data);
      });
  }

  deleteUser(user: User): void {
    console.log(user);
    this.userService.deleteUser(user)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  deleteUserForRegister(user: UserForRegistration): void {
    console.log(user);
    this.userService.deleteUserForRegister(user)
      .subscribe(data => {
        this.usersForRegister = this.usersForRegister.filter(u => u !== user);
      })
  };

  activateUser(user: User): void{
    console.log(user);
    this.userService.activateUser(user)
      .subscribe(data => {
        this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
        console.log(data);
      });
      })
  }

  editUser(user: User): void {
    console.log(user.id);
     const navigationExtras: NavigationExtras = {state: {example: user.id}};
     console.log(navigationExtras);
    this.router.navigate(['edit-user'], { queryParams: { serviceId: user.id} });
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}
