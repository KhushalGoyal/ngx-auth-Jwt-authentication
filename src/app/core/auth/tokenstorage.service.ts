
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TokenStorage {

  /**
   * Get access token
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('accessToken');
    return of(token);
  }

  /**
   * Get refresh token
   * @returns {Observable<string>}
   */
  public getRefreshToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('refreshToken');
    return of(token);
  }

  /**
   * Set access token
   * @returns {TokenStorage}
   */
  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem('accessToken', token);

    return this;
  }

   /**
   * Set refresh token
   * @returns {TokenStorage}
   */
  public setRefreshToken(token: string): TokenStorage {
    localStorage.setItem('refreshToken', token);

    return this;
  }

   /**
   * Remove tokens
   */
  public clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
// import { Injectable } from '@angular/core'
// import { Observable, of } from 'rxjs';

// @Injectable({
//    providedIn :'root' 
// })

// export class TokenStorage {
//     /**
//      * To get the stored Token and to store the tokens
//      */

//     /**return observable of refresh token */
//     getRefreshToken(): Observable<any>{
//         const refreshToken: string = localStorage.getItem('refreshToken');
//         return of(refreshToken)
//     }

//     public setAccessToken(token: string): TokenStorage {
//       localStorage.setItem('accessToken', token);
//       return this;
//     }

//     public setRefreshToken(token: string): TokenStorage {
//         localStorage.setItem('refreshToken', token);
//         return this;
//       }
//       public setUserRoles(role: string): TokenStorage {
//         localStorage.setItem('userRole', role);
//         return this;
//       }
//       public setTokenType(type: string): TokenStorage {
//         localStorage.setItem('tokenType', type);
//         return this;
//       }
//       public setUserName(token: string): TokenStorage {
//         localStorage.setItem('userName', token);
//         return this;
//       }
//       public clear(){
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         localStorage.removeItem('userRoles');
//         localStorage.removeItem('tokenType');
//         localStorage.removeItem('username');
//         localStorage.removeItem('tasks');
//         localStorage.removeItem('fullname');
//         localStorage.removeItem('profileImage');
//       }
// }