import { Component, OnInit } from '@angular/core';
import {HousingService} from "../services/housing.service";
import {UserService} from "../services/user.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-housing-list',
  templateUrl: './housing-list.component.html',
  styleUrls: ['./housing-list.component.scss'],
  providers: [HousingService],
})

export class HousingListComponent implements OnInit{

  housinghistory: Array<{id: number, postcode: string, addressLine1 : string, addressLine2 : string, city : string, county : string, country : string, movingDate : string, user : number }> = [];
  token;
  private routeSub: Subscription;
  users;
  userid;

  constructor(private route: ActivatedRoute, private housingService:HousingService, private userService:UserService) { 
    this.getUser();
    this.getHousing();
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      //console.log(params['token']);
      this.token = params['token'];
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getHousing = () => {
    this.housingService.getAllHousing().subscribe(
      data => {
        console.log(this.userid)
        for(let i = 0; i < data.results.length; i++){
          if(data.results[i].user == this.userid){
            this.housinghistory.push(data.results[i]);
          }
        }
      },
      error => {
        console.log(error)
      }
    )
    console.log(this.housinghistory)

  }

  getUser = () => {
    this.userService.getAllUser().subscribe(
      data => {
        this.users = data.results;
        for(let i = 0; i < data.results.length; i++){
          if(data.results[i].token == this.token)
          {
            this.userid = data.results[i].id;
          }
        }
        //console.log(this.userid);
        //console.log(this.users);
      },
      error => {
        console.log(error)
      }
    )

  }

}
