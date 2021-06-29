// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
/**
 * This component will render various movie data.
 */
export class MovieCardComponent {
  movies: any[] = [];
  favoritemovies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }
 /**
   * This method will run the getMovies method after the MovieCard Component is initialised and rendered.
   * @returns array of movie objects.
   */
  ngOnInit(): void {
    this.getMovies();
    this.modifyfavoriteuser();
  }
  
 /**
   * This method will contact an external API and receive an array of movie objects.
   * @returns array of movie objects.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  modifyfavoriteuser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favoritemovies = resp.FavoriteMovies;
    });
  }

  isFavorite(movieID: string) {
    return this.favoritemovies.includes(movieID);
  }

  adddeletefavorite(movieId: string): any {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.removeFavorite(movieId).subscribe((resp: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      const index = this.favoritemovies.indexOf(movieId);
      return this.favoritemovies.splice(index, 1);
    } else {console.log(this.favoritemovies
      );
      this.fetchApiData.addFavorite(movieId).subscribe((response: any) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });console.log(this.favoritemovies
          );
      });
    } console.log(this.favoritemovies
      );
    return this.favoritemovies.push(movieId);
  }

 /**
   * This method will activate dialog/modal which displays info on movie director.
   * @param name - director name
   * @param bio - director biography
   * @param birth - director date of birth
   * @param death - director date of death
   */
  getDirector(name: string,
    bio: string,
    birth: string,
    death: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      }
    });
  }
/**
   * This method will activate dialog/modal which displays info on movie genres.
   * @param name - genre name
   * @param description - genre summary
   */
  getGenre(name: string,
    description: string,
  ): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
        Description: description,
      }
    });
  }

}