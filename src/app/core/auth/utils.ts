import { HttpHeaders } from '@angular/common/http';
import { InitialModels } from 'src/app/model/intial-models';
import { Injectable } from '@angular/core';

@Injectable({providedIn : 'root'})
export class Utils {
  constructor(){}

  getHTTPAuthHeader(){
    let	encodedString = 'Basic '+ this.getBASE64Code(InitialModels.username+':'+InitialModels.password); //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdGp3dHJlc291cmNlaWQiXSwidXNlcl9uYW1lIjoiTWFqaWQiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTQ3NDU1NjYzLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiRV9BRE1JTiJ9XSwianRpIjoiZDc4ZWY3MjgtMTk0YS00ZTY0LWE0MTUtYjY1MTM4ZGQwNTdiIiwiY2xpZW50X2lkIjoiZW5nYWdlcHJvd2ViIn0.e9UBzg3s75v5mKhZFJqqt1i9dPDal6NIJU8s4B9SmME";

    return {
        headers:new HttpHeaders({'Authorization':encodedString,
                                 'Content-Type':'application/json'})
    }
  }
  getBASE64Code(credentials:string):String{
    console.log(btoa(credentials));

    return btoa(credentials);
 }
}