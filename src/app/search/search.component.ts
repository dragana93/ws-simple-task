import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { RepositoriesSearchService } from '../service/repositories-search.service';
import { Repository } from '../data/repository';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'programmingLanguage', 'url', 'details']; //columns in the table
  repositories: Repository[] = [];
  dataSource = new MatTableDataSource(this.repositories);
  searchControl = new FormControl(); //search field
  options: string[] = []; //favourite queries

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private repositoriesSearchService: RepositoriesSearchService,
    private dialog: MatDialog) { }

  ngOnInit() {
    for (let i = 0; i < localStorage.length; i++) {
      this.options.push(localStorage.key(i)); //reading favorite queries
    }
    
    this.searchControl.valueChanges //listener
      .subscribe(
        value => {
          if (value !== '') {
            this.getData(value);
          }
        }
      );
  }

  getData(value: string) {
    this.repositoriesSearchService.readRepositories(value.trim().toLowerCase())
      .subscribe(response => {
        //console.log("DATA: " + JSON.stringify(response));
        this.repositories = []; //empty the array
        response['items'].forEach(item => {
          this.repositories.push({
            name: item['name'],
            description: item['description'],
            url: item['html_url'],
            programmingLanguage: item['language']
          });
        });
        this.dataSource = new MatTableDataSource(this.repositories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      );
  }

  viewItemDetails(element: Repository) {
    const dialogRef = this.dialog.open(DetailComponent, {
      data: element
    });
  }

  onFavouriteClick() {
    if (this.searchControl.value != null && this.searchControl.value !== '') {
      if (localStorage.length == 0) {
        this.options.push(this.searchControl.value);
        localStorage.setItem(this.searchControl.value, this.searchControl.value);
      } else {
        var counter = 0;
        for (let i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i) === this.searchControl.value) {
            counter++;
          }
        }
        if (counter === 0) {
          this.options.push(this.searchControl.value);
          localStorage.setItem(this.searchControl.value, this.searchControl.value);
        }
      }
    }
  }

}
