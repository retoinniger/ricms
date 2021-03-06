import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    serverUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getCategories() {
        return this.http.get<Category>(this.serverUrl + 'api/adminCategories').pipe(
            catchError(this.handleError)
        );
    }

    getCategory(id: number) {
        return this.http.get<Category>(this.serverUrl + 'api/adminCategory/' + id).pipe(
            catchError(this.handleError)
        );
    }

    createCategory(category) {
        return this.http.post<any>(this.serverUrl + 'api/createCategory', category)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateCategory(category, id: number) {
        return this.http.post<any>(this.serverUrl + 'api/updateCategory/' + id, category)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteCategory(id: number) {
        return this.http.delete(this.serverUrl + 'api/deleteCategory/' + id).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened. Please try again later.');
    }
}
