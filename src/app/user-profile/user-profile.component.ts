import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileDeleteComponent } from '../user-profile-delete/user-profile-delete.component';
import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  user: any = {};
  movies: any = [];
  favourite: any = [];
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }
  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.userData = resp;
      this.user=resp;
      console.log(resp.FavoriteMovies);
     // this.favourite = resp.FavoriteMovies;
      console.log(this.favourite);
      this.userData.Birthday = resp.Birthday.substr(0, 10);

      this.getMovies();
    })
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }
  removeFavorites(id: string): void {
    this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {

      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 2000,
      });
    });


    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favourite.push(movie);
      }
    });
    console.log(this.favourite);
    return this.favourite;
  }



  editUserData(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '350px'
    });
  }
  deleteUserData(): void {
    this.dialog.open(UserProfileDeleteComponent, {
      width: '350px'
    });
  }
}
