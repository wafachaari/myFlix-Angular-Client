import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent implements OnInit {
  /**
   * Data from the movie-card component
   * @param data
   */
  constructor(@Inject(MAT_DIALOG_DATA)  
  
  public data: {
    Name: string;
    Description: string;
    
  }) { }

  ngOnInit(): void {
  }

}
