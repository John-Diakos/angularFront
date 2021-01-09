import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { UserForRegistration } from '@app/_models/userForRegistration';
import { UserService } from '@app/_services';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.less']
})
export class AddUserComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  selectedRole: string;
  selectedDepartment: string;
  selectedDate: Date;
  usersForRegister: UserForRegistration[];

  constructor(
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) {

  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          name: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', Validators.email],
          age: ['', ],
          birthDay: ['',],
          departmnet:['',]
      });

      this.userService.getUserForUsers()
      .subscribe(data => {
        this.usersForRegister = data;
        console.log(data);
      });
  }

  selectRights(event: any) {
    this.selectedRole = event.target.value;
  }

  selectDeparture(event: any) {
    this.selectedDepartment = event.target.value;
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      console.log(this.f.username.value);
      console.log(this.f.password.value);
      console.log(this.selectedRole);

      this.authenticationService.register(
        this.f.name.value,
        this.f.lastName.value,
        this.f.email.value,
        this.f.username.value,
        this.f.password.value,
        this.f.age.value,
        this.f.birthDay.value,
        this.selectedRole,
        this.f.departmnet.value
        ).subscribe((reponse)=>{
      alert("Επιτυχής εγγραφή");

     });


      this.loading = false;
      this.loginForm.reset();

  }

  deleteUserForRegister(user: UserForRegistration): void {
    console.log(user);
    this.userService.deleteUserForRegister(user)
      .subscribe(data => {
        this.usersForRegister = this.usersForRegister.filter(u => u !== user);
      })
  };
}
