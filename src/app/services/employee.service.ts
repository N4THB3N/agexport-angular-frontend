import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

      addEmployee(data: any): Observable<any> {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '
        };
        return this._http.post('https://localhost:7120/employees/insert', data, {headers});
    }

      getEmployeeList(): Observable<any> {
        let token = localStorage.getItem('token')
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        };
        return this._http.get('https://localhost:7120/employees/', {headers});
    }
}
