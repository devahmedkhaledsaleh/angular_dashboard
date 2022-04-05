import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  show:boolean = false;

  constructor(private authenticationService:AuthenticationService) { 
    
  }

  ngOnInit(): void {
    const token = this.authenticationService.getToken();
    if(token) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

}
