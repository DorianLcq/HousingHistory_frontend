import { Component, OnInit } from '@angular/core';
import {HousingService} from "../services/housing.service";

@Component({
  selector: 'app-housing-list',
  templateUrl: './housing-list.component.html',
  styleUrls: ['./housing-list.component.scss'],
  providers: [HousingService],
})

export class HousingListComponent  {

  housinghistory = [{postcode : 'Test'}];

  constructor(private housingService:HousingService) { 
    this.getHousing();
  }

  getHousing = () => {
    this.housingService.getAllHousing().subscribe(
      data => {
        this.housinghistory = data;
      },
      error => {
        console.log(error)
      }
    )

  }

}
