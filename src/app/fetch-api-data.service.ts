import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

 
const apiUrl = 'https://movie-api-db-30.herokuapp.com/';

//User Registration
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {
  }
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

//User Login
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http: HttpClient) {
  } 
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }
 
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

//Get All Movies
@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) { }
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}


//Get Director
@Injectable({
  providedIn: 'root',
})
export class GetDirectorService {
  constructor(private http: HttpClient) { }
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}


//Get Genre
@Injectable({
  providedIn: 'root',
})
export class GetGenreService {
  constructor(private http: HttpClient) { }

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

 
// get user info
@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  constructor(private http: HttpClient) {
  }
  GetUser(): Observable<any> {
    const token = localStorage.getItem('item');
    const user = localStorage.getItem('user');
    return this.http.get(apiUrl + `user/${user}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
}
  private handleError(error: HttpErrorResponse): any{
  if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
  } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`)
  }
  return throwError(
    'Something bad happened');
  }
}

 
// Adds user favorite movie
@Injectable({
  providedIn: 'root'
})
export class AddMovieService {
  constructor(private http: HttpClient) {
  }

  addFavMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('item');
    const user = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${user}/movies/${_id}`, _id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  // non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
}
  private handleError(error: HttpErrorResponse): any{
  if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
  } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`)
  }
  return throwError(
    'Something bad happened');
  }
}


// Deletes user favorite movies
@Injectable({
  providedIn: 'root'
})
export class DeleteFavMovieService {
  constructor(private http: HttpClient) {
  }

  DeleteUserFavMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('item');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}/movies/${_id}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
}
  private handleError(error: HttpErrorResponse): any{
  if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
  } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`)
  }
  return throwError(
    'Something bad happened');
  }
}


// Edit user info
@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  constructor(private http: HttpClient) {
  }

  EditUserInfo(userDetails: any): Observable<any> {
    const token = localStorage.getItem('item');
    const user = localStorage.getItem('user');
    console.log(userDetails);
    return this.http.put(apiUrl + `users/${user}`, userDetails,  {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
}
  private handleError(error: HttpErrorResponse): any{
  if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
  } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`)
  }
  return throwError(
    'Something bad happened');
  }
}



// Deletes user
@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {
  constructor(private http: HttpClient){
  }
  Deleteuser(username: string): Observable<any> {
    const token = localStorage.getItem('item');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

   private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
}
  private handleError(error: HttpErrorResponse): any{
  if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
  } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`)
  }
  return throwError(
    'Something bad happened');
  }
}

