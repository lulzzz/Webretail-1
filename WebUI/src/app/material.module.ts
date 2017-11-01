import { NgModule } from '@angular/core';

import {
  MatExpansionModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatGridListModule,
  MatCheckboxModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatGridListModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule
  ],
  exports: [
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatGridListModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule
  ]
})
export class MaterialModule { }
