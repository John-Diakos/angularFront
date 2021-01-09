import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/_services';
import { Application } from '@app/_models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {
  homeForm: FormGroup;
  active: boolean;
  selectedNotWorking: number;
  loading = false;
  submitted = false;
  username: string;
  firstName: string;
  lastName: string;
  id: number;
  selectedDate: Date;
  department: [];
  dep: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.active = obj['activate'];
    this.firstName =  obj['firstName'];
    this.lastName =  obj['lastName'];
    this.id = obj['id'];

    this.userService.getDepartment().subscribe((data)=>{
      console.log(data);
      this.department = data;
    });
  }

  get f() { return this.homeForm.controls; }

  ngOnInit() {
    this.homeForm = this.formBuilder.group({
        date: ['', ],
        departments: ['',],
        title: ['', Validators.required]
    });
  }

  selectChangeHandler (event: any) {
    this.selectedNotWorking = event.target.value;
  }

  onSubmit() {
      this.submitted = true;

      if (this.homeForm.invalid) {
          return;
      }

      this.loading = true;
     
      let request = new Application();
      request.title = this.f.title.value;
      request.userId = this.id;
      request.dateOfApp = this.selectedDate;
      request.department = this.dep;
      console.log("request");
      console.log(request);
      this.userService.requestRegister(request).subscribe((data)=>{
        console.log(data);
        if(data) {
          alert('User updated successfully.');
        }else {
          alert(data);
        }
      });
      
      this.loading = false;
  }

  isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

}
