import { Component, OnInit, OnDestroy, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/class/employee';
import { DataService } from 'src/app/share/data.service';
import { Subscription } from 'rxjs';
import { NonAvailability } from 'src/app/class/non-availability';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';




@Component({
  selector: 'app-non-availability-dialog',
  templateUrl: './non-availability-dialog.component.html',
  styleUrls: ['./non-availability-dialog.component.css']
})
export class NonAvailabilityDialogComponent implements OnInit, OnDestroy {

  constructor(
    private dialogref: MatDialogRef<NonAvailabilityDialogComponent>,
    private dataServ: DataService) {
    this.subs.push(this.dataServ.getEmployees().subscribe(res => this.employees = res));
    this.subs.push(this.dataServ.getNonAvailabilityTypes().subscribe(res => this.types = res));
  }

  private subs: Subscription[] = [];
  public employees: Employee[] = [];
  public types: NonAvailability[] = [];

  private employeeVal: Employee;

  public form = new FormGroup({
    employee: new FormControl([Validators.required]),
    nonAvailabilityType: new FormControl([Validators.required]),
    startDate: new FormControl([Validators.required]),
    endDate: new FormControl([Validators.required])
  });

  close(): void {
    this.dialogref.close();
  }

  save(): void {
    this.dataServ.setUnAvailable(this.form.value);
    this.dialogref.close();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe);
  }

}
