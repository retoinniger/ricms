import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.sass']
})
export class ManageUsersComponent implements OnInit {

    title = "Benutzer verwalten";
    users: User;
    error: string;

    constructor(private userService: UserService, private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle('Benutzer verwalten | RICMS');
        
        this.userService.getUsers().subscribe(
            (data: User) => this.users = data,
            error => this.error = error
        );
    }

    onDelete(id: number) {
        if (confirm('Den Eintrag wirklich Löschen id = ' + id)) {
            this.userService.deleteUser(+id).subscribe(
                res => {
                    console.log(res);
                    this.ngOnInit();
                },
                error => this.error = error
            );
        }
    }

}
