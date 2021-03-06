import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageBlogsComponent } from './manage-blogs/manage-blogs.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';


import { AuthGuard } from '../auth/auth.guard';
import { PageFormComponent } from './page-form/page-form.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
      path: '',
      children: [
        { path: 'blogs', component: ManageBlogsComponent },
        { path: 'blogs/create', component: BlogFormComponent },
        { path: 'blogs/edit/:id', component: BlogFormComponent },
        { path: 'categories', component: ManageCategoriesComponent },
        { path: 'categories/create', component: CategoryFormComponent },
        { path: 'categories/edit/:id', component: CategoryFormComponent },
        { path: 'pages', component: ManagePagesComponent },
        { path: 'pages/create', component: PageFormComponent },
        { path: 'pages/edit/:id', component: PageFormComponent },
        { path: 'users', component: ManageUsersComponent },
        { path: 'users/create', component: UserFormComponent },
        { path: 'users/edit/:id', component: UserFormComponent },
        { path: '', component: AdminDashboardComponent }
      ],
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
