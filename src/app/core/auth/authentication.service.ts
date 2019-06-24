import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { tap, map, switchMap, catchError, timeout } from 'rxjs/operators';
import { AuthService } from 'ngx-auth';
import { TokenStorage } from './tokenstorage.service';
import { Utils } from './utils';

interface AccessData {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthenticationService implements AuthService {
  username: string;
  public onErrorCaught: Subject<ErrorList>;
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private utils: Utils
  ) {}

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable < boolean > {
    return this.tokenStorage
      .getAccessToken()
      .pipe(map(token => !!token));
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable < string > {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable <AccessData> {
    return this.tokenStorage
      .getRefreshToken()
      .pipe(
        switchMap((refreshToken: string) =>
          {
            console.log("refresh now")
            console.log('http://localhost:8000/refresh?refresh-token='+refreshToken)
            debugger;
            return this.http.get('http://localhost:8000/refresh?refresh-token='+refreshToken )
          }
        ),
        tap((tokens: AccessData) => this.saveAccessData(tokens)),
        catchError((err) => {
          this.logout();

          return Observable.throw(err);
        })
      );
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  /**
   * EXTRA AUTH METHODS
   */

  public doLogin(credential){
    let url = 'http://localhost:8000/login';
    this.username = credential.username;
    return this.http.post(url,credential, this.utils.getHTTPAuthHeader()).pipe(
			// To be reset to 1000 in production
			timeout(3000),
			tap(this.saveAccessData.bind(this)),catchError(err=>{
				if(this.refreshShouldHappen(err)){
					this.refreshToken();
				}else if(this.timeOutHappen(err)){
					this.onErrorCaught.next( this.getErrorList(err)  )
				}else{
					this.tokenStorage.clear()
					this.onErrorCaught.next( this.getErrorList(err)  )
				}
				return throwError(err);
			}));
   }
  
  public getErrorList(paramerror){
		let errorList;
		if(!paramerror.status){

			errorList = Object.assign({},
									{'title':'TimeOutError',
									 'detail':'',
									 'status':408});

		}else{
			errorList = Object.assign({},paramerror.error.errors[0]);
			errorList.status =  paramerror.status;
		}

		return errorList;
	}
  /**
   * Logout
   */
  public logout(): void {
    this.tokenStorage.clear();
    location.reload(true);
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAccessData({ accessToken, refreshToken }: AccessData) {
    this.tokenStorage
      .setAccessToken(accessToken)
      .setRefreshToken(refreshToken);
  }

  public timeOutHappen(err){
    return true;
  }
}
// import { AuthService } from 'ngx-auth';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of, throwError, Subject } from 'rxjs';
// import { TokenStorage } from './tokenstorage.service';
// import { switchMap, tap, catchError, timeout} from 'rxjs/operators';
// import { Utils } from './utils';

// @Injectable()
// export class AuthenticationService implements AuthService {
//   username: string;
//   private interruptedUrl: string;
//   public onErrorCaught: Subject<ErrorList>;

//   constructor(private http: HttpClient, private tokenStorage :TokenStorage,private utils:Utils) {
//     this.onErrorCaught = new Subject()
//   }
 
//   public isAuthorized(): Observable<boolean> {
//     const isAuthorized: boolean = !!localStorage.getItem('accessToken');
 
//     return of(isAuthorized);
//   }
 
//   public getAccessToken(): Observable<string> {
//     const accessToken: string = localStorage.getItem('accessToken');
 
//     return of(accessToken);
//   }
 
//   public doLogin(credential){
//     let url = 'http://localhost:8000/login';
//     this.username = credential.username;
//     return this.http.post(url,credential, this.utils.getHTTPAuthHeader()).pipe(
// 			// To be reset to 1000 in production
// 			timeout(3000),
// 			tap(this.saveAccessData.bind(this)),catchError(err=>{
// 				if(this.refreshShouldHappen(err)){
// 					this.refreshToken();
// 				}else if(this.timeOutHappen(err)){
// 					this.onErrorCaught.next( this.getErrorList(err)  )
// 				}else{
// 					this.tokenStorage.clear()
// 					this.onErrorCaught.next( this.getErrorList(err)  )
// 				}
// 				return throwError(err);
// 			}));
//   }
  
//   public refreshToken(): Observable<any> {
//     return this.tokenStorage.getRefreshToken().pipe(
//       switchMap((refreshToken : string) => {
//         console.log('refresh now');
//         let URL = 'http://localhost:8000/refresh?refresh-token='+refreshToken;
//         console.log(URL)
//         return this.http.get(URL).pipe(catchError(err=>{
//                 this.logout();
//                 return throwError(err);
//             }));
//     }),tap(this.saveAccessData.bind(this)),
//     catchError(err =>{
//         this.logout()
//         return throwError(err)
//     }))
//   }
    
//   logout() {
//         throw new Error("Method not implemented.");
//     }
 
//   public refreshShouldHappen(response: HttpErrorResponse): boolean {
//     return response.status === 401;
//   }

//   /**
// 	 * Save access data in the storage
// 	 * @private
// 	 * @param {AccessData} data
// 	 */
// 	private saveAccessData(accessData: any) {
// 		if (typeof accessData !== 'undefined') {
// 			this.tokenStorage
// 				.setAccessToken(accessData.token)
// 				.setRefreshToken(accessData.refreshToken)
// 				// .setUserRoles(accessData.authorities)
// 				// .setTokenType(accessData.token_type)
// 				.setUserName(this.username);
// 			// this.onCredentialUpdated$.next(accessData);
// 		}
// 	}
 
//   public verifyTokenRequest(url: string): boolean {
//     return url.endsWith('refresh-token');
//   }
 
//   public getInterruptedUrl(): string {
//     return this.interruptedUrl;
//   }
 
//   public setInterruptedUrl(url: string): void {
//     this.interruptedUrl = url;
//   }
  


//   public getErrorList(paramerror){
// 		let errorList;
// 		if(!paramerror.status){

// 			errorList = Object.assign({},
// 									{'title':'TimeOutError',
// 									 'detail':'',
// 									 'status':408});

// 		}else{
// 			errorList = Object.assign({},paramerror.error.errors[0]);
// 			errorList.status =  paramerror.status;
// 		}

// 		return errorList;
// 	}
// }




// export interface AccessData {
//   accessToken: string;
//   refreshToken: string;
// }

export interface ErrorList{
       
   title: string,
   detail: string,
   status:any
}