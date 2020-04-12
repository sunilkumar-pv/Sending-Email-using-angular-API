import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { EmailService } from '../email.service';
import { Email } from '../email';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.scss']
})
export class EmailShowComponent implements OnInit {
  email: Email; 
  constructor(  private route: ActivatedRoute) {
    this.email = this.route.snapshot.data.email;
    this.route.data.subscribe(({ email }) => {
      this.email = email;
});
               }

  ngOnInit(): void {
    //console.log(this.route);
    // this.route.params.pipe(
    //   switchMap(({ id }) => {
    //    return this.emailService.getEmail(id);
    //   })
    // ).subscribe((email) => {
    //    this.email = email;
    // });

   }


}
