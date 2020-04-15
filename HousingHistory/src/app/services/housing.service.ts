import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HousingService {

  baseUrl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  today = new Date();
  fiveYears = this.today.getFullYear() - 5 + '-'+(this.today.getMonth()+1)+'-'+this.today.getDate();

  constructor(private http: HttpClient) { }

  getAllHousing(): Observable<any>{
    return this.http.get(this.baseUrl + '/housinghistory/', 
    {headers : this.httpHeaders} );
  }

  registerNewHousing(housing): Observable<any>{
    const body = {postcode: housing.postcode,
                 addressLine1: housing.addressLine1, 
                 addressLine2: housing.addressLine2, 
                 city: housing.city, 
                 county: housing.county, 
                 country: housing.country, 
                 movingDate: housing.movingDate};
    return this.http.post(this.baseUrl + '/housinghistory/' , body, {headers : this.httpHeaders} );
  }

  compareDate(movingDate) {
    if(movingDate < this.fiveYears)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  
}
