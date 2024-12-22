import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  edit :boolean=false;
  id :any;
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
  }

  public getMethod(){
    //Remplacé ce lien par le entry point get de pièrre
    //Que fait la method subscribe
    this.http.get('http://localhost:3000/mangas').subscribe((data) =>{
      console.log(data);
      this.getJsonValue = data;
    });
  }

  public postMethod(){
    //On ajoute les crochets pour indiquer les données qu'on souhaite envoyé à notre base de données
    let body = {
      "name": ''+this.name,
      "type": ''+this.type,
      "note": ''+this.note,
    };
    this.http.post('http://localhost:3000/register',body).subscribe((data) =>{
      console.log(data);
      this.postJsonValue = data;
    });
  }
  public deleteMethod(id:any){
    this.http.delete('http://localhost:3000/delete/'+id).subscribe((data) =>{
      console.log("delete");
    });
  }

  public editMethod(){
    //On ajoute les crochets pour indiquer les données qu'on souhaite envoyé à notre base de données
    let body = {
      "name": ''+this.name,
      "type": ''+this.type,
      "note": ''+this.note,
    };
    this.http.put('http://localhost:3000/edit/'+this.id,body).subscribe((data) =>{
      console.log(data);
    });
    this.edit = !this.edit;
  }
  public getId(id:any){
    this.id = id;
    this.edit = !this.edit;
  }
}
