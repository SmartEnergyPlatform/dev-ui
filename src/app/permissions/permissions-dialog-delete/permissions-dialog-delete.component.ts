import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-permissions-dialog-delete',
  templateUrl: './permissions-dialog-delete.component.html',
  styleUrls: ['./permissions-dialog-delete.component.css']
})
export class PermissionsDialogDeleteComponent {

  constructor(public dialogRef: MatDialogRef<PermissionsDialogDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

    yes() {
        this.dialogRef.close('yes');
    }

    no() {
        this.dialogRef.close('no');
    }

}
