
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dog } from '../models/dog';


@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

    private url = environment.baseUrl + 'api'
    private authUrl = environment.baseUrl + 'api/auth/dogs'

    public index(): Observable<Dog[]> {
      const httpOptions = this.getHttpOptions();
      return this.http.get<Dog[]>(this.url +'/dogs', httpOptions).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('DogService.index(): Error retrieving Dog List');
        })
      );
    }

      show(id: number): Observable<Dog>{
        const httpOptions = this.getHttpOptions();
        return this.http.get<Dog>(`${this.url}` + '/dogs' + `${id}`, httpOptions).pipe(
          catchError((err: any) =>{
          console.log(err);
          return throwError('DogService.show(): Error getting dog id');
          })
        );
      }

      showAllUserDogs(): Observable<Dog[]> {
        const httpOptions = this.getAuthHttpOptions();
        return this.http.get<Dog[]>(this.authUrl, httpOptions).pipe(
          catchError((err: any) => {
            console.log(err);
            return throwError('DogService.showAllUserDogs(): Error retrieving Dog List');
          })
        );
      }

      showUserDog(id: number): Observable<Dog>{
        console.log('dogService - show use dog - user dogid ' + id);

        const httpOptions = this.getAuthHttpOptions();
        return this.http.get<Dog>(`${this.authUrl}` + '/'+ `${id}`, httpOptions).pipe(
          catchError((err: any) =>{
          console.log(err);
          return throwError('DogService.showUserDog(): Error getting user by dog id');
          })
        );
      }


      create(newDog: Dog): Observable<Dog>{
        if(! this.authService.checkLogin){
          console.log('User is not logged in at DogService.create()');
          this.router.navigateByUrl('/login');
        }
        const httpOptions = this.getAuthHttpOptions();
        return this.http.post<Dog>(this.authUrl, newDog, httpOptions).pipe(
          catchError((err: any) => {
            console.log(err);
            return throwError('DogService.create(): Error retrieving create');
          })
        );
      }
    update(dog: Dog): Observable<Dog>{
      if(! this.authService.checkLogin){
        console.log('User is not logged in at DogService.update()');
        this.router.navigateByUrl('/login');
      }
      const httpOptions = this.getAuthHttpOptions();
      console.log(dog);

      return this.http.put<Dog>(this.authUrl + '/'+ `${dog.id}`, dog, httpOptions).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('DogService.update(): Error updating dog');
        })
      );
    }

    destroy(id: number): Observable<Dog>{
      if(! this.authService.checkLogin){
        console.log('User is not logged in at DogService.delete()');
        this.router.navigateByUrl('/login');
      }
      const httpOptions = this.getAuthHttpOptions();
      return this.http.delete<Dog>(this.authUrl + '/'+ id, httpOptions).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('DogService.destroy(): Error disabling dog');
        })
      );
    }

    getHttpOptions(): Object{
      const credentials = this.authService.getCredentials();
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Basic ${credentials}`,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-type': 'application/json'
        })
      };
      return httpOptions;
    }

    getAuthHttpOptions() {
      const credentials = this.authService.getCredentials();
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Basic ${credentials}`,
          'X-Requested-With': 'XMLHttpRequest'
        })
      };
      return httpOptions;
    }


}
