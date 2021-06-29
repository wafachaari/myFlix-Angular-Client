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
/**
 * This component renders the User Profile view.
 */
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  user: any = {};
  movies: any = [];
  favourite: any = [];

  /**
   * @param fetchApiData
   * @param dialog
   * @param snackBar
    
   */
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }
     /**
   * This method will run the getUser method after the User Profile Component is initialised and rendered.
   * @returns User object.
   */
  ngOnInit(): void {
    this.getUser();
  }
/**
   * This method will contact an external API and receive a User object and an array of movie objects.
   * @returns User object and array of movie objects.
   */
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
 /**
   * This method will contact an external API,
   * receive an array of movie objects and store them in state,
   * and then filter it.
   * @returns array of movie objects.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }
  /**
   * This method will contact an external API,
   * and delete the movie id from the favorites array
   */
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
   /**
   * This method will contact an external API,
   * and delete the User from the Users array.
   */
  deleteUserData(): void {
    this.dialog.open(UserProfileDeleteComponent, {
      width: '350px'
    });
  }
}
