import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-blogpost-recent',
    templateUrl: './blogpost-recent.component.html',
    styleUrls: ['./blogpost-recent.component.sass']
})
export class BlogpostRecentComponent implements OnInit {

    blogs: Blogpost;
    error: {};

    constructor(private blogpostService: BlogpostService, private titleService: Title) { }

    ngOnInit() {
        this.blogpostService.getRecentBlogs().subscribe(
            (data: Blogpost) => this.blogs = data,
            error => this.error = error
        );
    }

    setPageTitle(title: string) {
        this.titleService.setTitle(title);
    }

}
