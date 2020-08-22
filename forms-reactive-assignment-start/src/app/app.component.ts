import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenProjectNames = ['Test', 'Foo', 'Bar', 'FooBar'];
  submitted = false;
  project = {
    name: '',
    email: '',
    status: ''
  };

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      project: new FormControl(null, Validators.required, this.projectNameForbidden.bind(this)),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(null)
    });

    // set project status initially as stable
    this.projectForm.patchValue({
      status: 'stable'
    });
  }

  projectNameForbidden(control: FormControl): Promise<any> | Observable<any> {
    const input = control.value ? <string>control.value : '';

    return new Promise<any>((resolve, reject) => {
      const result = this.forbiddenProjectNames.find((forbiddenName: String) => {
        return forbiddenName.toLowerCase() === input.toLowerCase();
      });

      if (result) {
        return resolve({
          'projectNameForbidden': true
        });
      }

      resolve(null);
    });
  }

  errors(formControlName: string, errorKey: string): boolean {
    return this.projectForm.get(formControlName).errors[errorKey];
  }

  invalid(formControlName: string | null): boolean {
    return !this.projectForm.get(formControlName).valid &&
      this.projectForm.get(formControlName).touched;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.projectForm.value);
    this.project = {
      name: this.projectForm.value.project,
      email: this.projectForm.value.email,
      status: this.projectForm.value.status
    };
  }
}
