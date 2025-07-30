import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent {
  empForm: FormGroup;
  education: string[] = ['Primary', 'Secondary', 'Tertiary'];

  constructor(private _fb: FormBuilder, private _empService: EmployeeService, private _dialogRef: DialogRef<EmpAddEditComponent>) {
    this.empForm = this._fb.group({
      firstName: [''],
      secondName: [''],
      lastName: [''],
      lastName2: [''],
      email: [''],
      dob: [''],
      dpi: [''],
    });
  }

  onFormSubmit(){
    if(this.empForm.valid){
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (res) => {
          alert('Employee added successfully');
          this._dialogRef.close();
        },
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      console.error('Form is invalid');
    }
  }
}
