import { Component, OnInit } from '@angular/core';
import { Movie }    from '../movie';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  constructor(private http: HttpClient){

  }

  urlKey = '2419e5be';

  model = new Movie(' ');
  

  ngOnInit():  void {
    
  }
  

  loadInfo(): void{
    this.model.actors = ' no actors found! '
    this.model.awards= ' no awards found! '
    this.model.year = 0
    this.model.genre= ' no genre found! '
    this.model.plot= ' no plot found! '
    this.model.img= ''
    console.log(this.model.name);
    this.http.get<WebData>('http://www.omdbapi.com/?t=' + this.model.name +'&apikey=' + this.urlKey).subscribe(data => {
      console.log(data);
      this.model.name = data.Title;
      this.model.actors = data.Actors;
      this.model.awards = data.Awards;
      this.model.year = data.Year;
      this.model.genre = data.Genre;
      this.model.plot = data.Plot;
      // let rate: { string: RateType[] } = JSON.parse(data.Ratings.toString());
      // this.model.rating = rate.string[0].Value;
      this.model.img = data.Poster;
    });
  }


  submitted = false;

  onSubmit() { this.submitted = true; }

}

// interface RateType{
//   Source: string
//   Value: string
// }



interface WebData {
  Title: string;
  Actors: string;
  Awards: string;
  Year: number;
  Genre: string;
  Plot: string;
  Poster: string;
}


