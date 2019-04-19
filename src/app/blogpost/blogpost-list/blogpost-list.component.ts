import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-blogpost-list',
    templateUrl: './blogpost-list.component.html',
    styleUrls: ['./blogpost-list.component.sass']
})
export class BlogpostListComponent implements OnInit {

    contentTitle = 'Blogs';
    blogs: Blogpost;
    error: {};

    constructor(
        private title: Title,
        private blogpostService: BlogpostService,
        private titleService: Title
    ) { }

    ngOnInit() {
        this.title.setTitle(this.contentTitle + ' | ' + 'RICMS');

        this.blogpostService.getBlogs().subscribe(
            (data: Blogpost) => this.blogs = data,
            error => this.error = error
        );
    }

    setPageTitle(title: string) {
        this.titleService.setTitle(title);
    }

}
