import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
    checkRole: string;
    constructor(private title: Title) { }

    ngOnInit() {
        this.title.setTitle('Übersicht | RICMS')
        // check role
        let userCredentials = JSON.parse(sessionStorage.getItem('currentUser'));
        this.checkRole = userCredentials.roles;
    }

}
