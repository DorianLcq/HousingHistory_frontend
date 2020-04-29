import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-housing-details',
  templateUrl: './housing-details.component.html',
  styleUrls: ['./housing-details.component.scss']
})
export class HousingDetailsComponent  {
  
  @Input() id;
  @Input() postcode;
  @Input() addressLine1;
  @Input() addressLine2;
  @Input() city;
  @Input() county;
  @Input() country;
  @Input() movingDate;
  @Input() user;
  

  constructor() { }

  



  

}
