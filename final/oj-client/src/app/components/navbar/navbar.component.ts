import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Collaborative Online Judge System';

  // username = 'Joe';

  profile: any;

  constructor(private auth: AuthService) {
    this.auth.userProfile.subscribe(
      profile => this.profile = profile
    )
  }

  ngOnInit() {
  }

  login() {
    console.log("press login");
    this.auth.login();
  }

  logout() {
    console.log("logout");
    this.auth.logout();
  }

}
