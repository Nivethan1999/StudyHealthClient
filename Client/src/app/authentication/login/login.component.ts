import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  LoginForm!: FormGroup;

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      'Username': new FormControl(null, [Validators.required]),
      'Password': new FormControl(null, [Validators.required])
    });
  }

  Login() { 
    this.authService.login(this.LoginForm.value).subscribe((token: string) => {
      console.log('Received token:', token);
      localStorage.setItem('authToken', token);
      if (localStorage.getItem('authToken') === token) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
