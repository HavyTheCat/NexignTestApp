import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

import { NonAvailabilityComponent } from './non-availability.component';
import { Route } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DataService } from 'src/app/share/data.service';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { NonAvailabilityDialogComponent } from '../non-availability-dialog/non-availability-dialog.component';


export const NonAvailabilityRoutes: Route[] = [
  {
      path: '',
      component: NonAvailabilityComponent
  }
];

@NgModule({
  declarations: [NonAvailabilityComponent, NonAvailabilityDialogComponent],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    RouterModule.forChild(NonAvailabilityRoutes),
    CommonModule
  ],
  providers: [
    DataService,
    MatDatepickerModule
  ],
  entryComponents: [NonAvailabilityDialogComponent]
})
export class NonAvailabilityModule { }
