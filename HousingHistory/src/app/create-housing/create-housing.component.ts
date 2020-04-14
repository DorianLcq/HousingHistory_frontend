import { Component, OnInit } from '@angular/core';
import {HousingService} from "../services/housing.service";
import {Router } from '@angular/router';

@Component({
  selector: 'app-create-housing',
  templateUrl: './create-housing.component.html',
  styleUrls: ['./create-housing.component.scss'],
  providers: [HousingService]
})
export class CreateHousingComponent {

  selectedHousing;
  fiveYears = false;
 

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

  registerHousing(fiveYears) {
    this.housingService.registerNewHousing(this.selectedHousing).subscribe(
      response => {
        if(!fiveYears)
        {
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
        }
        if(fiveYears)
        {
          alert('Your last housing ' + this.selectedHousing.postcode + ' has been created !')
          this.selectedHousing = {id: -1, 
            postcode:'', 
            addressLine1:'', 
            addressLine2:'', 
            city:'',
            county:'', 
            country:'', 
            movingDate: ''}
          this.router.navigate(['/list']);
        }
        
      },
      error => console.log('error', error)
    );
  }
}
