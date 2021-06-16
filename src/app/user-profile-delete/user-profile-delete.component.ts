import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// API Call
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile-delete',
  templateUrl: './user-profile-delete.component.html',
  styleUrls: ['./user-profile-delete.component.scss']
})
export class UserProfileDeleteComponent implements OnInit {

  constructor(public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }
  removeUserAccount(): void {
    this.fetchApiData.deleteUser().subscribe(
      (resp: any) => {
        this.snackBar.open(
          'Your account has successfully been deleted!',
          'OK',
          {
            duration: 2000,
          }
        );
        // Logs user out
        localStorage.clear();
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });

        // Refreshes and redirects to welcome view
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      }
    );
  }

  // user cancels deleting account
  cancel(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }

}
