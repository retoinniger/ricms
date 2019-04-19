import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-manage-blogs',
    templateUrl: './manage-blogs.component.html',
    styleUrls: ['./manage-blogs.component.sass']
})
export class ManageBlogsComponent implements OnInit {

    title = 'Blogs verwalten';
    blogs: Blog;
    error: string;

    constructor(private blogService: BlogService, private browserTitle: Title) { }

    ngOnInit() {
        this.browserTitle.setTitle('Blogs verwalten | RICMS');
        
        this.blogService.getBlogs().subscribe(
            (data: Blog) => this.blogs = data,
            error => this.error = error
        );
    }

    onDelete(id: number) {
        if (confirm('Den Eintrag wirklich Löschen id = ' + id)) {
            this.blogService.deleteBlog(+id).subscribe(
                res => {
                    console.log(res);
                    this.ngOnInit();
                },
                error => this.error = error
            );
        }
    }

}
