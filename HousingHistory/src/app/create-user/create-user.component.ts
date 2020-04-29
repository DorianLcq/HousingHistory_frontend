import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {


  selectedUser;
  users = [{username : 'Test',
            email : 'test@test.com'}];
  counter = 0; 

  constructor(public router: Router, private userService:UserService) {
    this.getUser();
    this.selectedUser = [{id: 1, 
      username:'', 
      email:''}];
    this.counter = this.users.length;
    console.log(this.counter);
  }

  registerUser() {
    this.selectedUser.id = this.counter;
    this.userService.registerNewUser(this.selectedUser).subscribe(
      response => {
        alert('User ' + this.selectedUser.username + ' has been created !')
        this.router.navigate(['/create-housing/' + this.selectedUser.username], {state : {userId : this.selectedUser.id}});
      },
      error => console.log('error', error)
    );
  }

  getUser = () => {
    this.userService.getAllUser().subscribe(
      data => {
        this.users = data.results;
        this.counter = this.users.length + 1;
        console.log(this.users);
        console.log(this.counter);
      },
      error => {
        console.log(error)
      }
    )

  }

}
