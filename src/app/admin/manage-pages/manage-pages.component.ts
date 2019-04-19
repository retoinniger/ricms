import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PageService } from 'src/app/services/page.service';
import { Page } from '../../models/page';

@Component({
    selector: 'app-manage-pages',
    templateUrl: './manage-pages.component.html',
    styleUrls: ['./manage-pages.component.sass']
})
export class ManagePagesComponent implements OnInit {

    title = 'Seiten verwalten';
    pages: Page;
    error: string;

    constructor(private pageService: PageService, private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle('Seiten verwalten | RICMS');

        this.pageService.getPages().subscribe(
            (data: Page) => this.pages = data,
            error => this.error = error
        );
    }

    onDelete(id: number) {
        if (confirm('Den Eintrag wirklich Löschen id = ' + id)) {
            this.pageService.deletePage(+id).subscribe(
                res => {
                    console.log(res);
                    this.ngOnInit();
                },
                error => this.error = error
            );
        }
    }

}
