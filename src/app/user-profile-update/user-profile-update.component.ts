import { Component, OnInit,Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service'
@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss']
})

/**
 * This component will render the Update User Profile form.
 */
export class UserProfileUpdateComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  movies: any = [];
  favorites: any = [];

  /**
   *
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */
  constructor(public fetchApiData:FetchApiDataService,    public dialogRef: MatDialogRef<UserProfileUpdateComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }// edit user info
    /**
   * This method will contact an external API,
   * and update the User Info in the Users array.
   */
  editUser(): void {
    this.fetchApiData.EditUserInfo(this.userData).subscribe((resp) => {
      this.dialogRef.close();
      console.log(resp);
      localStorage.setItem('user', resp.Username);
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000
      });
    }, (res) => {
      console.log(res);
      this.snackBar.open(res, 'OK', {
        duration: 2000
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

}


