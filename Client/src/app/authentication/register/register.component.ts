import { Component } from '@angular/core';
import { Account } from '../../models/account';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private fb: FormBuilder ) { }

  RegisterForm!: FormGroup;

  ngOnInit(): void{
    this.RegisterForm = this.fb.group({
      'Username': new FormControl("", [Validators.required]),
      'Email': new FormControl("",[Validators.required]),
      'Password': new FormControl("", [Validators.required]),
      'Weight': new FormControl(0,),
      'Height': new FormControl(0,)
    });
  
  }

  onRegisterData(){ 
    this.authService.register(this.RegisterForm.value).subscribe();
  }
}




