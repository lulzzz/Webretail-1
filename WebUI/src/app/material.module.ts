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
  MatSelectModule
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
    MatSelectModule
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
    MatSelectModule
  ]
})
export class MaterialModule { }
