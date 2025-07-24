import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  employeeForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  loading = false;
  error = '';

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      employeeId: ['', Validators.required],
      dpi: ['', Validators.required],
      nit: ['', Validators.required],
      firstName: ['', Validators.required],
      name2: ['', Validators.required],
      lastName: ['', Validators.required],
      lastName2: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      dob: ['', Validators.required],
      age : [0, [Validators.required, Validators.min(0)]],
      igsS_No: ['', Validators.required],
      irtra   : ['', Validators.required],
      passport_No: ['', Validators.required],
      addr1: ['', Validators.required],
      addr2: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      hireDate: ['', Validators.required],
      createdAt: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load employees';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;

      if (this.isEditing && this.editingId) {
        this.updateEmployee(this.editingId, employeeData);
      } else {
        this.createEmployee(employeeData);
      }
    }
  }

  createEmployee(employee: Employee): void {
    this.employeeService.createEmployee(employee).subscribe({
      next: (newEmployee) => {
        this.employees.push(newEmployee);
        this.resetForm();
      },
      error: (error) => {
        this.error = 'Failed to create employee';
      }
    });
  }

  updateEmployee(id: number, employee: Employee): void {
    this.employeeService.updateEmployee(id, employee).subscribe({
      next: (updatedEmployee) => {
        const index = this.employees.findIndex(emp => emp.employee_ID === id);
        if (index !== -1) {
          this.employees[index] = updatedEmployee;
        }
        this.resetForm();
      },
      error: (error) => {
        this.error = 'Failed to update employee';
      }
    });
  }

  editEmployee(employee: Employee): void {
    this.isEditing = true;
    this.editingId = employee.employee_ID!;
    this.employeeForm.patchValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      salary: employee.salary,
      hireDate: new Date(employee.hireDate).toISOString().split('T')[0],
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.employees = this.employees.filter(emp => emp.employee_ID !== id);
        },
        error: (error) => {
          this.error = 'Failed to delete employee';
        }
      });
    }
  }

  resetForm(): void {
    this.employeeForm.reset({
      salary: 0
    });
    this.isEditing = false;
    this.editingId = null;
  }
}
