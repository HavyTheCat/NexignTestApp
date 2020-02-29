import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { NonAvailability } from '../class/non-availability';
import { Employee } from '../class/employee';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DataService {

  private url = 'http://localhost:3000';
  private unAvailable = new BehaviorSubject<NonAvailability[]>([]);
  private unAvailableArr: NonAvailability[] = [];
  constructor(private http: HttpClient) { }

  getUnAvailable(): Observable<NonAvailability[]> {
    this.http.get<NonAvailability[]>(`${this.url}/nonAvailability`).subscribe(
      res => {if (res) {
        this.unAvailableArr = res;
        this.unAvailable.next(res);
        }});
    return this.unAvailable.asObservable();
  }

  setUnAvailable(unAvailable: NonAvailability) {
    let newId = '0';
    if (this.unAvailableArr.length > 0) {
      newId = this.unAvailableArr.reduce((prev, current) => (prev.id > current.id) ? prev : current).id + 1;
    }
    unAvailable.id = newId;
    this.unAvailableArr.push(unAvailable);
    this.unAvailable.next(this.unAvailableArr);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}/employee`);
  }

  getNonAvailabilityTypes(): Observable<NonAvailability[]> {
    return this.http.get<NonAvailability[]>(`${this.url}/nonAvailabilityType`);
  }
}

