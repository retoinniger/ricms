import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Page } from '../models/page';;

@Injectable({
  providedIn: 'root'
})
export class PageService {

    serverUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getPages() {
        return this.http.get<Page>(this.serverUrl + 'page/adminPages').pipe(
            catchError(this.handleError)
        );
    }

    getPage(id: number) {
        return this.http.get<Page>(this.serverUrl + 'page/adminPage/' + id).pipe(
            catchError(this.handleError)
        );
    }

    createPage(Page) {
        return this.http.post<any>(this.serverUrl + 'page/createPage', Page)
            .pipe(
                catchError(this.handleError)
            );
    }

    updatePage(Page, id: number) {
        return this.http.post<any>(this.serverUrl + 'page/updatePage/' + id, Page)
            .pipe(
                catchError(this.handleError)
            );
    }

    deletePage(id: number) {
        return this.http.delete(this.serverUrl + 'page/deletePage/' + id).pipe(
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
