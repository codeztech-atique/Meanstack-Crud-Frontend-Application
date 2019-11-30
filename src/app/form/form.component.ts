import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { PersonService } from '../shared/person.service'
import { Person } from '../shared/person.model'
import * as $ from 'jquery';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers : [PersonService]
})

export class FormComponent implements OnInit {
  tableHeading: any;
  tableData: any;
  headline: any;
  _id: any;
  mail: any;
  class: any;
  name: any;
  disableStatus: any;
  public data = [];  
  result: any;
  public displayedColumns: Array<any> = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource();
  public stickyColumns: string[] = ['topics', 'country'];
  arrayOne(n: number): any[] {
    return Array(n);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  public fieldNames: Array<any> = [];
  constructor(private personService : PersonService) { 
    this.disableStatus = false;
    this.headline = 'Insert';  
  }
  ngOnInit() {
    this.fieldNames = [];
    this.fieldNames = ['_id','class','email', 'name'];
    this.displayedColumns.push('edit');
    this.displayedColumns.push('delete');
    this.displayedColumns = this.displayedColumns.concat(this.fieldNames);  

    this.personService.getPersonList().subscribe(async(data) => {
        this.result = await data;
        this.result.forEach(data => {
            this.data.push({
              _id: data._id,
              class: data.class,
              email:data.mail,
              name: data.name
            });
        })
        this.dataSource.data = await this.data;
        this.dataSource.paginator = await this.paginator;      
      },
      error => {
        console.log("Error", error);
        var value = (<HTMLInputElement>document.getElementById("Nodatafound"));
        value.style.display = 'block';
      }
    );
    this.refreshPersonList();
  }
  onSubmit(form : NgForm){
    var headlines = this.headline;
    if(headlines=='Insert') {
      this.personService.postPerson(form.value).subscribe((res) => {
        this.refreshPersonList();
      },
      err => {
          console.log(err);
          (<HTMLInputElement>document.getElementById("errmsg1")).innerHTML = err.error.message;
          var value = (<HTMLInputElement>document.getElementById("errmsg1"));
          value.style.display = 'block';
          value.style.color = 'red';
          // successmessage.style.display = 'none';
        }
      );
    } else {
      var userData = {
        "_id": this._id,
        "class": this.class,
        "mail": this.mail,
        "name":this.name
      };
      this.personService.updatePerson(this._id, userData).subscribe((res) => {
        console.log(res);
        this.refreshPersonList();
      });
    } 
    window.location.reload();
  }
  isSticky(column: string) {
    return this.stickyColumns.find(val => val === column) !== undefined
      ? true
      : false;
  }
  refreshPersonList(){ 
    this.personService.getPersonList().subscribe((res) => {
      this.personService.persons = res as Person[];
    })
  }

  onDelete(element){
     var result = confirm("Are you sure want to delete it ?"); 
        if (result == true) { 
          this.personService.deletePerson(element._id).subscribe((res) => {
               this.refreshPersonList();
               //this.data.toast({html:'Deleted Successfully',classes : 'rounded' });
            })
        } else { 
          alert('Item not deleted!');
      }   
    window.location.reload();
  }
  editView(element) {
    this._id = element._id;
    this.mail = element.email;
    this.class = element.class;
    this.name = element.name;
   
    // $("label[for='name']").toggleClass('active');
    // $("label[for='email']").toggleClass('active');
    $("label[for='email']").css('display', 'none');
    $("label[for='name']").css('display', 'none');
    this.headline = 'Update';  
    this.disableStatus = true;

    // this.personService.getPersonList().subscribe((res) => {
    //   this.personService.persons = res as Person[];
     
    // })
   

  }
}
