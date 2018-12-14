import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';

import { PersonService } from '../shared/person.service'
import { Person } from '../shared/person.model'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers : [PersonService]
})

export class FormComponent implements OnInit {
  data:any;

  constructor(private personService : PersonService) { 
    
   }
  ngOnInit() {
    this.refreshPersonList();
  }
  onSubmit(form : NgForm){
       this.personService.postPerson(form.value).subscribe((res) => {
        //  this.data.toast({ html:'Saved Successfully', classes : 'rounded' });
         this.refreshPersonList();
       })
  }
  refreshPersonList(){
    this.personService.getPersonList().subscribe((res) => {
      this.personService.persons = res as Person[];
    })
  }
  // clear(form?: NgForm){
  //   if(form) form.reset();
  //   this.personService.selectedPerson = {
  //     _id : "",
  //     name : "",
  //     main : "",
  //     class : ""
  //   }
  // }
  
  onDelete(_id:string, form :NgForm){
     this.personService.deletePerson(_id).subscribe((res) => {
       this.refreshPersonList();
      //  this.data.toast({html:'Deleted Successfully',classes : 'rounded' });
     })
  }
}
