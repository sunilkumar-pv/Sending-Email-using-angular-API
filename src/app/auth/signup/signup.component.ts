import { Component, OnInit } from '@angular/core';
import  { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatchPassword } from '../validators/auth/validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
     username: new FormControl('', [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(20),
       Validators.pattern(/^[a-z0-9]+$/)
     ], this.uniqueUsername.validate ),
     password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)       
     ]),
     passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),       
     ]),
  }, { validators: [this.mathcPassword.validate] });


  constructor(
    private uniqueUsername: UniqueUsername ,
    private mathcPassword: MatchPassword,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

 onSubmit() {
   if(this.authForm.invalid){
     return ;
   }
   console.log(this.authForm.value);
   this.authService.signup(this.authForm.value)
       .subscribe({
         next: response => {
            this.router.navigateByUrl('/inbox');
         },
         complete() {

         },
         error: err => {
                if(!err.status){ 
                  this.authForm.setErrors({ noConnection: true });
                } else {
                  this.authForm.setErrors({ unknownError: true });
                }
          }
       });

   }

}
