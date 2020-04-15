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
  

  constructor(public router: Router, private housingService:HousingService) { 
    this.selectedHousing = {id: -1, 
                            postcode:'', 
                            addressLine1:'', 
                            addressLine2:'', 
                            city:'',
                            county:'', 
                            country:'', 
                            movingDate: ''}
  }

  registerHousing() {
    this.fiveYearsCheck = this.housingService.compareDate(this.selectedHousing.movingDate);
    this.selectedHousing.movingDate += 'T00:00';
    if(postcodeValidator(this.selectedHousing.postcode, 'UK'))
    {
      if(this.fiveYearsCheck)
      {
        this.housingService.registerNewHousing(this.selectedHousing).subscribe(
          response => {
              alert('Your housing ' + this.selectedHousing.postcode + ' has been created !')
              this.selectedHousing = {id: -1, 
                postcode:'', 
                addressLine1:'', 
                addressLine2:'', 
                city:'',
                county:'', 
                country:'', 
                movingDate: ''}
              this.router.navigate(['/add']);
            
          },
          error => console.log('error', error)
        );
      }
      else
      {
        alert("We don't need this housing because it was more than 5 five years ago")
        this.router.navigate(['/list']);
      }
    }
    else
    {
      alert( this.selectedHousing.postcode + " is not a postcode")
    }
  }
  
}
