import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

// tslint:disable-next-line:typedef
function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @ts-ignore
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', []],
      pwGroup: this.fb.group({
        password: '',
        confirmPassword: ''
      }, {validator: comparePassword})
    });

    // update form state
    this.registerForm.patchValue({
      email: 'info@example.com'
    });
  }

  onSubmit(): void {
  }

  get email(): any {
    return this.registerForm.get('email');
  }
  get pwGroup(): any {
    return this.registerForm.get(['password', 'confirmPassword']);
  }

}
