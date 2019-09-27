import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, ControlContainer } from '@angular/forms';
import { CrudService } from '../Service/crud.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  otherTextBox = false;
  formValue:FormGroup;
  // name:string;
  // dept:string;
  // designation:string;
  // email:string;
  // password:string;
  // gender:string;
   selectedGames:any;
  // other:string;
  hobbiesList: { item_id: number; item_text: string; }[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  gamesCheckBoxList: any;
  otherGames:string;
  Dept: { id: number; name: string; desi: string[]; }[];
  designation: any;

  constructor(
    private formBuilder:FormBuilder,
    private service:CrudService,
    private router:Router,
    )
  {
    this.hobbiesList = [
      { item_id: 1, item_text: 'Action' },
      { item_id: 2, item_text: 'Comedy' },
      { item_id: 3, item_text: 'Drama' },
      { item_id: 4, item_text: 'Romance' },
      { item_id: 5, item_text: 'Dance' }
    ];    
    this.gamesCheckBoxList  = [
      { item_id: 1, item_text: 'Cricket' },
      { item_id: 2, item_text: 'Puzzle' },
      { item_id: 3, item_text: 'Chess' },
    ];
    this.formValue = this.formBuilder.group({
      name : new FormControl(),
      dept : new FormControl(),
      designation : new FormControl(),
      email : new FormControl(),
      password: new FormControl(),
      gender : new FormControl(),
      hobbies : new FormControl(),
      games : this.addListControl(),
      otherGames : new FormControl(),
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


    this.Dept = [
      { id: 1, name: 'Development', desi: ['Manager', 'TeamLead', 'TeamMemeber']  },
      { id: 2, name: 'Management', desi: ['Director', 'CTO', 'HR']  },
      { id: 3, name: 'Desiging', desi: ['Sr.Designer', 'Designer', 'Jr.Designer'] },
    ];

  } 

  // initialize all value checked = false of gamesCheckBoxList
  addListControl(){
    const arr = this.gamesCheckBoxList.map(element=>{
      return this.formBuilder.control(false);
    });   
    return this.formBuilder.array(arr);
  }

  // property of gamesCheckBoxList it would be call each time on checkbox clicking 
  get checkList(){
    return <FormArray>this.formValue.get('games');
  }
  
  ngOnInit(){;
  }

  onSubmit(form :any){
    //console.log(form);
    console.log("form worked");
    
    // adding checkbox values in form Object
    let games = this.selectedGames || [];  // if selectedGames Empty enter empty array otherwise push error throw because there is no array name of game
    if(this.otherTextBox && this.otherGames){
      games.push(...this.otherGames.split(',')); 
      console.log({...this.formValue.value, games});     
    }
    else{
      delete this.formValue.value.games; // if games property empty delete it
      console.log({...this.formValue.value,games});
    }
    let post = {...this.formValue.value,games};
    this.service.post(post).subscribe((res)=>{
      this.router.navigateByUrl('/home');
    },err=>{
      console.log("error during response ",err);
    })    
  }
  

  onCheckChange(event) {
    //console.log(event);
    this.selectedGames = [];
    // adding selected values in selectedGames Array
    this.checkList.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedGames.push(this.gamesCheckBoxList[i].item_text);
      }
    });
  }    
  otherChange(e:any){
    this.otherTextBox = !this.otherTextBox;
    console.log(e);    
  }
  onItemSelect(hobbies:any){
    console.log("hobbies  ",hobbies);
  }
  onSelectAll(hobbiesAll:any){
    console.log("hobbiesAll  ", hobbiesAll);
  }
  
  deptChange(e:any){
   const value = e.target.value;
   this.designation = this.Dept.filter(x => x.name == value)[0].desi;
   console.log(this.designation)
  }

}
