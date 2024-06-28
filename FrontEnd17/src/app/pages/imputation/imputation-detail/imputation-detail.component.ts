import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Observable, map, mergeMap, startWith, BehaviorSubject} from 'rxjs';
import { ImputationService } from '@core/services/imputation.service';
import { Imputation } from '@core/model/imputation';
import { ImputationItem } from '@core/model/imputation-item';
import { Project } from '@core/model/project';
import { ProjectService } from '@core/services/project.service';

@Component({
  selector: 'app-imputation-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule, MatCardModule, ReactiveFormsModule, MatInputModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule],
  templateUrl: './imputation-detail.component.html',
  styleUrl: './imputation-detail.component.scss'
})
export class ImputationDetailComponent {

  imputationService = inject(ImputationService);
  projectService = inject(ProjectService);
  fb = inject(FormBuilder);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
 
  form!: FormGroup;
  imputation!: Imputation;
  displayedColumns: string[] = ['id', 'project', 'time', 'delete'];
  
  private imputationItem: BehaviorSubject<ImputationItem[]> = new BehaviorSubject<ImputationItem[]>([]);
  imputationItem$ = this.imputationItem.asObservable();

  selectedImputationItem: ImputationItem = new ImputationItem();

  error!: string;
  message!: string;
  message2!: string;  

  projectControl = new FormControl();
  filteredProjects!: Observable<Project[]>;  
  events: any;

  ngOnInit(): void {
    this.buildForm();
    this.imputation = new Imputation();
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      const cmpDate = /\d{4}-\d{2}-\d{2}/;
      if(!id.match(cmpDate)){
        this.imputationService.get(id).subscribe({
          next:(res: Imputation)=> {
            this.form.get('id')?.setValue(res.id);
            this.form.get('date')?.setValue(res.date);
            this.imputation = res;
            this.imputationItem.next(this.imputation.items);
          },
          error: (err: any) => console.log(err)
        });
      }else{
        this.form.get('date')?.setValue(id);
      }
    });     


    this.filteredProjects = this.projectControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.description),
        mergeMap(value => value ? this._filter(value) : this._getAll())
      );      
  }  

  private buildForm(){
    this.form = this.fb.group({
      id: [''],
      date: [''],
      time: ['']
    });  
  }  

  private _getAll(): Observable<Project[]> {
    return this.projectService.getAll();
  }  

  private _filter(value: string): Observable<Project[]> {
    const filterValue = value.toLowerCase();
    return this.projectService.getSelection(filterValue);
  }  

  displayFn(project: Project): string {
    return project && project.name ? project.name : '';
  }

  selectProject(event: MatAutocompleteSelectedEvent): void {
    let imputationItem = new ImputationItem();
    imputationItem.project = event.option.value as Project;
    this.selectedImputationItem = imputationItem;
  }    

  update(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      this.imputation.date = this.form.get('date')?.value;
      this.imputationService.update(this.imputation).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/imputation');
        },
        error: (err: any) => {
          this.error = err.error.error;
          this.message = err.error.message;
          this.message2 = err.message;
        },
      });
    }
  }     
  
  create(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      this.imputation.date = this.form.get('date')?.value;
      this.imputationService.create(this.imputation).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/imputation');
        },
        error: (err: any) => {
          this.error = err.error.error;
          this.message = err.error.message;
          this.message2 = err.message;
        },
      });
    }
  }        

  delete(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      this.imputation = this.form.value;
      this.imputationService.delete(this.imputation.id).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/imputation');
        },
        error: (err: any) => {
          this.error = err.error.error;
          this.message = err.error.message;
          this.message2 = err.message;
        },
      });
    }
  }        

  deleteImputationItem(id: number): void {
    this.imputation.items = this.imputation.items.filter((item: ImputationItem) => id !== item.id);
    this.imputationItem.next(this.imputation.items);
  }  

  addItem(){
    this.selectedImputationItem.time = this.form.get('time')?.value;
    console.log(this.selectedImputationItem);
    console.log(this.imputation.items);
    this.imputation.items.push(this.selectedImputationItem);
    this.imputationItem.next(this.imputation.items);    
  }

  dataChange() {
    const date = `${this.form.get('date')?.value.getFullYear()}-${(this.form.get('date')?.value.getMonth()+1).toString().padStart(2, '0')}-${this.form.get('date')?.value.getDate().toString().padStart(2, '0')}`;
    console.log('dateChange - ', date);
    this.imputationService.getByDate(date).subscribe({
      next:(res: Imputation)=> {
        console.log(res);
        if(res==null){
 //         this.form.get('id')?.setValue(null);
          this.imputation = new(Imputation);
          this.form.get('id')?.setValue(this.imputation.id);
          this.imputationItem.next(this.imputation.items);
        }else{
          this.form.get('id')?.setValue(res.id);
          this.form.get('date')?.setValue(res.date);
          this.imputation = res;
          this.imputationItem.next(this.imputation.items);
        }
      },
      error: (err: any) => console.log(err)
    });
  }

}
