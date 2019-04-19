import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../auth/auth.service';
import { CmspageService } from '../../cmspage/cmspage.service';
import { Page } from 'src/app/models/page';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    datum = new Date;
    pageNavs: Page;
    error: {};
    navbarOpen: boolean = false;
   
    constructor(private titleService: Title, private authService: AuthService, private cmsPage: CmspageService) { }

    ngOnInit() {
        this.cmsPage.getPages().subscribe(
            (data: Page) => this.pageNavs = data,
            error => this.error = error
          );
         this.checkLogin();
    }
    
    setPageTitle(title: string) {
        this.titleService.setTitle(title);
    }

    checkLogin() {
        if (this.authService.isLoggedIn || sessionStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    } 

    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }
}
