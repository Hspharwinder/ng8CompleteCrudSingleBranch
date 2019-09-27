import { Component, OnInit } from '@angular/core';
import { CrudService } from '../Service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:CrudService) { }

  getData:any;

  ngOnInit() {    
    this.service.get().subscribe((res : any[])=>{
      this.getData = [...res];
      console.log(this.getData);
    })
  }

  getGames(gamesObj:any){   
    let gamesArray=[];
    if(gamesObj != undefined){
      for(let [key, value] of Object.entries(gamesObj)){
        gamesArray.push(value)
      }  
    }      
    return gamesArray
  }

  getHobbies(hobbieObj:any[]){
    let hobbieArray = [];
    if(hobbieObj !== undefined){
      for(let [key,value] of Object.entries(hobbieObj)){
        hobbieArray.push(value.item_text);
      }
    }    
    return hobbieArray;
  }
  
  delete(id:string){
    this.service.delete(id).subscribe((res:any)=>{
      this.getData = [...res];
    },err=>{
      console.log(err);
    })
  }

}
