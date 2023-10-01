import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const routes: Routes =[
  { path: 'project', component: ProjectComponent },
  { path: 'project-detail/:id', component: ProjectDetailComponent },
  { path: 'project-detail', component: ProjectDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProjectRoutingModule { }
