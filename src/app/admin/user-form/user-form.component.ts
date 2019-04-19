import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit {

    checkRole: string;
    pageTitle: string;
    error: string;
    userForm: FormGroup;
    uploadError: string;
    /* role = [
        {name: 'Benutzer', state: 'user'},
        {name: 'Administrator', state: 'admin'},
      ]; */

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        let userCredentials = JSON.parse(sessionStorage.getItem('currentUser'));
        this.checkRole = userCredentials.roles;

        if (id) {
            this.pageTitle = 'Benutzer bearbeiten';
            this.userService.getUser(+id).subscribe(
                res => {
                    this.userForm.patchValue({
                        username: res.username,
                        email: res.email,
                        first_name: res.first_name,
                        last_name: res.last_name,
                        is_active: res.is_active,
                        roles: res.roles,
                        id: res.id
                    });
                }
            );
        } else {
            this.pageTitle = 'Benutzer erstellen';
        }

        this.userForm = this.fb.group({
            id: [''],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: [''],
            email: ['', [Validators.required, Validators.email]],
            first_name: [''],
            last_name: [''],
            is_active: ['1'],
            roles: ['user']
        });

        this.titleService.setTitle(this.pageTitle + ' | ' + 'RICMS')
    }

    get username() { return this.userForm.get('username'); }
    get first_name() { return this.userForm.get('first_name'); }
    get is_active() { return this.userForm.get('is_active'); }
    get email() { return this.userForm.get('email'); }
    get password() { return this.userForm.get('password'); }
    get roles() { return this.userForm.get('roles'); }

    onSubmit() {
        const formData = new FormData();
        formData.append('username', this.userForm.get('username').value);
        formData.append('first_name', this.userForm.get('first_name').value);
        formData.append('last_name', this.userForm.get('last_name').value);
        formData.append('email', this.userForm.get('email').value);
        formData.append('password', this.userForm.get('password').value);
        formData.append('is_active', this.userForm.get('is_active').value);
        formData.append('roles', this.userForm.get('roles').value);

        const id = this.userForm.get('id').value;

        if (id) {
            this.userService.updateUser(formData, +id).subscribe(
                res => {
                    if (res.status === 'error') {
                        this.uploadError = res.message;
                    } else {
                        this.router.navigate(['/admin/users']);
                    }
                },
                error => this.error = error
            );
        } else {
            this.userService.createUser(formData).subscribe(
                res => {
                    if (res.status === 'error') {
                        this.uploadError = res.message;
                    } else {
                        this.router.navigate(['/admin/users']);
                    }
                },
                error => this.error = error
            );
        }
    }
}
