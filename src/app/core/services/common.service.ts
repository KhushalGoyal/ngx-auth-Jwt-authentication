import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({providedIn : 'root'})
export class CommonService{
   constructor(private http: HttpClient, private auth: AuthenticationService){

   }

   get(url){
     return this.http.get(url).pipe(catchError(err => {
         this.handelError(err)
         return of(err)
     }))
   }

   handelError(err){
       console.log(err);
   }
}