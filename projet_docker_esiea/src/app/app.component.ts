import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public getJsonValue: any;
  public postJsonValue: any;
  name :string = "";
  type :string = "";
  note :string = "";
  constructor(private http: HttpClient){

  }
  title = 'projet_docker_esiea';
  ngOnInit(): void {
    this.getMethod();
    this.postMethod();
  }

  public getMethod(){
    //Remplacé ce lien par le entry point get de pièrre
    //Que fait la method subscribe
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe((data) =>{
      console.log(data);
      this.getJsonValue = data;
    });
  }

  public postMethod(){
    //On ajoute les crochets pour indiquer les données qu'on souhaite envoyé à notre base de données
    let body = {
      id:'',
      name: ''+this.name,
      type: ''+this.type,
      note: ''+this.note,
    };
    this.http.post('https://jsonplaceholder.typicode.com/posts',body).subscribe((data) =>{
      console.log(data);
      this.postJsonValue = data;
    });
  }
}
