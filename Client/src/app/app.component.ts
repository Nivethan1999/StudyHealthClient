import { Component } from '@angular/core';
import { Account } from './models/account';
import { AuthService } from './services/auth.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StudyHealthClient';

}
