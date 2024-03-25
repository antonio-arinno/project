import { Component, OnInit } from '@angular/core';;
import { Imputation } from '@model/imputation';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core' ;
import { ImputationService } from '@service/imputation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, mergeMap, startWith, BehaviorSubject, isEmpty } from 'rxjs';
import { Project } from '@model/project';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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
  events: any;


  constructor(private imputationService: ImputationService, 
              private projectService: ProjectService,
              private fb: FormBuilder, 
              private activateRoute: ActivatedRoute, 
              private router: Router,
              private dateAdapter: DateAdapter<any>) {           
    this.buildForm();
 //   this.dateAdapter.setLocale('fr');   
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
    this.imputation.items = this.imputation.items.filter((item: ImputationItem) => id !== item.id);
    this.imputationItem.next(this.imputation.items);
  }  

  addItem(){
    this.selectedImputationItem.time = this.form.get('time')?.value;
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
