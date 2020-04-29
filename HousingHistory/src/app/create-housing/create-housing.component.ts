import { Component, OnInit } from '@angular/core';
import {HousingService} from "../services/housing.service";
import {UserService} from "../services/user.service";
import {Router } from '@angular/router';
import { postcodeValidator} from 'postcode-validator';


@Component({
  selector: 'app-create-housing',
  templateUrl: './create-housing.component.html',
  styleUrls: ['./create-housing.component.scss'],
  providers: [HousingService]
})
export class CreateHousingComponent {

  selectedHousing;
  fiveYearsCheck;
  inputDate = '';
  username;
  users;
  index;

  constructor(public router: Router, private housingService:HousingService, private userService:UserService) { 
    this.selectedHousing = [{id: 1, 
                             postcode:'', 
                             addressLine1:'', 
                             addressLine2:'', 
                             city:'',
                             county:'', 
                             country:'', 
                             movingDate: '',
                             userId : history.state.userId}];
    console.log(history.state.userId);
    this.users = this.getUser();
  }

  registerHousing(selectedId) {
    this.fiveYearsCheck = this.housingService.compareDate(this.selectedHousing[selectedId].movingDate);
    this.selectedHousing[selectedId].movingDate += 'T00:00';
    if(postcodeValidator(this.selectedHousing[selectedId].postcode, 'UK'))
    {
      
        this.housingService.registerNewHousing(this.selectedHousing[selectedId]).subscribe(
          response => {
            if(this.fiveYearsCheck)
            {
              this.inputDate = this.selectedHousing[selectedId].movingDate.substr(0, 10);
              alert('Your housing ' + this.selectedHousing[selectedId].postcode + ' has been created !')
              this.selectedHousing.push({id: -1, 
                postcode:'', 
                addressLine1:'', 
                addressLine2:'', 
                city:'',
                county:'', 
                country:'', 
                movingDate: this.inputDate,
                userId: history.state.userId})
                if (document.getElementById("hideButton").style.display === "none") {
                  document.getElementById("hideButton").style.display = "block";
                } 
                else {
                  document.getElementById("hideButton").style.display = "none";
                }
              (<HTMLInputElement>document.getElementById("myDate")).value = this.inputDate;
            }
            else{
               if (document.getElementById("hideButton").style.display === "none") {
                document.getElementById("hideButton").style.display = "block";
              } 
              else {
                document.getElementById("hideButton").style.display = "none";
              }
              alert("This was your last housing. You will receive an email with an url to see your housing history. Thank you");
              this.sendEmail(this.selectedHousing[0].userId);
              this.router.navigate(['']);
              }
          },
          error => console.log('error', error)
        );
    }
    else
    {
      alert( this.selectedHousing[selectedId].postcode + " is not a postcode")
    }
  }

  getUser = () => {
    this.userService.getAllUser().subscribe(
      data => {
        this.users = data.results;
        console.log(this.users);
      },
      error => {
        console.log(error)
      }
    )

  }

  sendEmail(userId) {
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i].id == userId){
        this.index = i;
        console.log(this.index);
      }
    }
    console.log(this.users);
    console.log(this.users[this.index]);
    this.userService.sendOneEmail(this.users[this.index]).subscribe(
      response => {
        
      },
      error => console.log('error', error)
    );
  }
}
