import { Component, OnInit } from '@angular/core';
import {HousingService} from "../services/housing.service";

@Component({
  selector: 'app-create-housing',
  templateUrl: './create-housing.component.html',
  styleUrls: ['./create-housing.component.scss'],
  providers: [HousingService]
})
export class CreateHousingComponent {

  selectedHousing;
 

  constructor(private housingService:HousingService) { 
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
    this.housingService.registerNewHousing(this.selectedHousing).subscribe(
      response => {
        alert('Housing ' + this.selectedHousing.postcode + ' has been created !')
      },
      error => console.log('error', error)
    );
  }

}
