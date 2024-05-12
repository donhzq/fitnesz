import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { User } from '../shared/model/User';
import { ServerService } from '../shared/services/server.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-join',
  standalone: true,
  imports: [CommonModule , MenuComponent],
  templateUrl: './group-join.component.html',
  styleUrl: './group-join.component.css'
})

export class GroupJoinComponent implements OnInit {
  groups: any[] = [];
  Suser?: User;
  msg: string ='';
  
 

  joinGroup(id: string){
    if (this.Suser && this.Suser._id) {
    this.serverService.joinGroup(id , this.Suser?._id).subscribe({
      next: (data) => {
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    });
    }
  }



  async ngOnInit(): Promise<void> {

    if(this.Suser && this.Suser._id){
      this.msg = "A csatlakozáshoz kérem jeletkezzen be"
    }else{
      this.msg = '';

    }
    this.Suser = await this.authService.getUser();   

    this.serverService.listAllGroups().subscribe({
      next: (data)=>{
        if(data){
          this.groups = data;
          console.log(data);
        }
      }, error: (err) => {
          console.log(err);
      },
    
    })

    console.log("session user " , this.Suser);
  }

  constructor( private serverService : ServerService ,  private authService : AuthService ,  private router: Router ) {
   

  }

}
