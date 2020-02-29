import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/share/data.service';
import { Subscription, Observable, from } from 'rxjs';
import { NonAvailability } from 'src/app/class/non-availability';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { groupBy, map, mergeMap, reduce } from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { SummaryEntry } from 'src/app/class/summary-entry';
import { NonAvailabilityDialogComponent } from '../non-availability-dialog/non-availability-dialog.component';

@Component({
  selector: 'app-non-availability',
  templateUrl: './non-availability.component.html',
  styleUrls: ['./non-availability.component.css']
})
export class NonAvailabilityComponent implements OnInit, OnDestroy {

  constructor(private data: DataService,
              private dialog: MatDialog) { }
  private subs: Subscription[] = [];
  private unAvailable: NonAvailability[] = [];
  summaryArr: SummaryEntry[] = [];
  dataSource = new MatTableDataSource(this.unAvailable);
  countdataSource = new MatTableDataSource(this.summaryArr);
  public displayedColumns: string[] = ['position', 'name', 'type', 'startDate', 'endDate'];
  public countDisplayedColumns: string[] = ['type', 'count'];

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
});

  ngOnInit(): void {
    this.subs.push(
      this.data.getUnAvailable().subscribe(res => {
        this.unAvailable = res;
        this.setSummarySource(this.unAvailable);
        this.countdataSource = new MatTableDataSource(this.summaryArr);
        this.dataSource = new MatTableDataSource(this.unAvailable);
      })
    );
  }

  onCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(NonAvailabilityDialogComponent, dialogConfig);

  }

  setSummarySource(arr: NonAvailability[]): void {
    this.summaryArr = [];
    if (arr) {
      from(arr).pipe(groupBy((r: NonAvailability) => r.nonAvailabilityType.title),
      mergeMap( group => group.pipe(
        reduce((total, item) => total + 1, 0),
        map(total => ({type: group.key, count: total}))
      ))).subscribe(x => {
        this.summaryArr.push(x);
      }).unsubscribe();
    }
    this.countdataSource = new MatTableDataSource(this.summaryArr);
  }


  getDateRange(value) {
    const fromDate = value.fromDate;
    const toDate = value.toDate;
    const filtredArr = this.unAvailable.filter(u => {
      return new Date(u.startDate) >= new Date(fromDate) && new Date(u.endDate) <= new Date(toDate);
    });
    this.setSummarySource(filtredArr);
    this.dataSource = new MatTableDataSource(filtredArr);
  }

    get fromDate() { return this.filterForm.get('fromDate'); }
    get toDate() { return this.filterForm.get('toDate'); }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe);
  }

}


