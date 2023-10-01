import { Component, OnInit } from '@angular/core';
import { Project } from '@model/project';
import { Router } from '@angular/router';  
import { ProjectService } from '@service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: Project[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'edit'];
  dataSource = this.projects;

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.projectService.getAll().subscribe({
      next: (res: Project[]) => {
        this.projects = res;
      },
      error: (err: any) => console.log(err),
    });
  }  

  edit(id: number):void {
    this.router.navigate(['/pvt/project/project-detail', id]);
  }

  create(){
    this.router.navigate(['/pvt/project/project-detail']);  
  }  


}
