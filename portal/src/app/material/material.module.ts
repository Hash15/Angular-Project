import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import {MatDialog} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //MatDialog,
    MatDialogModule,
    MatIconModule
  ],
  exports:[
    //MatDialog
    MatDialogModule,
    MatIconModule
  ]
})
export class MaterialModule { }
