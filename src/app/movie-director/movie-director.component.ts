import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
 @Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)  
  
  public data: {
    Name: string;
    Bio: string;
    Birth: Date;
    Death: Date;
  }
  ) { }

  ngOnInit(): void { 
  }
   
}
