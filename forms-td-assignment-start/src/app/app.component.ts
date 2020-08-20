import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultSubscription = 'basic';
  // @ts-ignore
  @ViewChild('memberForm') memberForm: NgForm;
  member = {
    email: '',
    subscription: '',
    password: ''
  };

  submitted = false;

  onSubmit() {
    console.log(this.memberForm);
    this.submitted = true;

    this.member.email = this.memberForm.value.email;
    this.member.subscription = this.memberForm.value.subscription;
    this.member.password = this.memberForm.value.password;

    this.memberForm.reset();

    // restore the default value if subscription
    this.memberForm.control.patchValue({
      subscription: this.defaultSubscription
    });
  }
}
