import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesSearchService {

  url: string = 'https://api.github.com/search/repositories?q=';

  parameter: string = 'in:name'; //repository search by name

  constructor(private http: HttpClient) { }

  readRepositories(name: string) {
    return this.http.get(this.url + name + '+' + this.parameter);
  }
}
