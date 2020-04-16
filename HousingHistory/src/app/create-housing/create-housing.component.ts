import { Component, OnInit } from '@angular/core';
import {HousingService} from "../services/housing.service";
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

  constructor(public router: Router, private housingService:HousingService) { 
    this.selectedHousing = [{id: 1, 
                             postcode:'', 
                             addressLine1:'', 
                             addressLine2:'', 
                             city:'',
                             county:'', 
                             country:'', 
                             movingDate: ''}];
  }

  registerHousing(selectedId) {
    this.fiveYearsCheck = this.housingService.compareDate(this.selectedHousing[selectedId].movingDate);
    this.selectedHousing[selectedId].movingDate += 'T00:00';
    if(postcodeValidator(this.selectedHousing[selectedId].postcode, 'UK'))
    {
      if(this.fiveYearsCheck)
      {
        this.housingService.registerNewHousing(this.selectedHousing[selectedId]).subscribe(
          response => {
              this.inputDate = this.selectedHousing[selectedId].movingDate.substr(0, 10);
              alert('Your housing ' + this.selectedHousing[selectedId].postcode + ' has been created !')
              this.selectedHousing.push({id: -1, 
                postcode:'', 
                addressLine1:'', 
                addressLine2:'', 
                city:'',
                county:'', 
                country:'', 
                movingDate: this.inputDate})
                if (document.getElementById("hideButton").style.display === "none") {
                  document.getElementById("hideButton").style.display = "block";
                } 
                else {
                  document.getElementById("hideButton").style.display = "none";
                }
              (<HTMLInputElement>document.getElementById("myDate")).value = this.inputDate;
              
          },
          error => console.log('error', error)
        );
       
        
      }
      else
      { 
        this.selectedHousing.pop();
        if (document.getElementById("hideButton").style.display === "none") {
          document.getElementById("hideButton").style.display = "block";
        } 
        else {
          document.getElementById("hideButton").style.display = "none";
        }
        alert("We don't need this housing because it was more than 5 five years ago")
        this.router.navigate(['/add']);
      }
    }
    else
    {
      alert( this.selectedHousing[selectedId].postcode + " is not a postcode")
    }
  }
}
