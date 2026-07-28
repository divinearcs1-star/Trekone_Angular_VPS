import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AstrictDirective } from '../astrict.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AstrictDirective
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ToastrModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ToastrModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SharedModule { }
