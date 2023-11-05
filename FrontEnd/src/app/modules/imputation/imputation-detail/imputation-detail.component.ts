import { Component, Input, OnInit } from '@angular/core';
import { Imputation } from '@model/imputation';
import { FormBuilder, 
  FormControl, 
  FormGroup,
  Validators } from '@angular/forms';
import { ImputationService } from '@service/imputation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, mergeMap, startWith, BehaviorSubject } from 'rxjs';
import { Project } from '@model/project';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ProjectService } from '@service/project.service';
import { ImputationItem } from '@model/imputation-item';

@Component({
  selector: 'app-imputation-detail',
  templateUrl: './imputation-detail.component.html',
  styleUrls: ['./imputation-detail.component.scss']
})
export class ImputationDetailComponent implements OnInit {

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


  constructor(private imputationService: ImputationService, 
              private projectService: ProjectService,
              private fb: FormBuilder, 
              private activateRoute: ActivatedRoute, 
              private router: Router) {           
    this.buildForm();
    this.imputation = new Imputation();
  }   
  
  private buildForm(){
    this.form = this.fb.group({
      id: [''],
      date: [''],
      time: ['']
    });  
  }  

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.imputationService.get(id).subscribe({
          next:(res: Imputation)=> {
            this.form.get('id')?.setValue(res.id);
            this.form.get('date')?.setValue(res.date);
            this.imputation = res;
            this.imputationItem.next(this.imputation.items);
          },
          error: (err: any) => console.log(err)
        });
      }
    });   
    

    this.filteredProjects = this.projectControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.description),
        mergeMap(value => value ? this._filter(value) : this._getAll())
      );      
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


/*    
    if (this.form.get('time')?.value != 0){
      let imputationItem = new ImputationItem();
      imputationItem.project = event.option.value as Project;
      imputationItem.time = this.form.get('time')?.value;
      this.imputation.items.push(imputationItem);
      this.imputationItem.next(this.imputation.items);
    } 
*/    
  }  

  update(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      this.imputation.date = this.form.get('date')?.value;
      this.imputationService.update(this.imputation).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/imputation/imputation');
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
          this.router.navigateByUrl('/pvt/imputation/imputation');
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
          this.router.navigateByUrl('/pvt/imputation/imputation');
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
    this.imputation.items = this.imputation.items.filter((item: ImputationItem) => id !== item.project.id);
    this.imputationItem.next(this.imputation.items);
  }  

  addItem(){
    this.selectedImputationItem.time = this.form.get('time')?.value;
    this.imputation.items.push(this.selectedImputationItem);
    this.imputationItem.next(this.imputation.items);    
  }

}
