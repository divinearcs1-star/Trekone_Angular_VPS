import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  showPassword: boolean = false;
  submitted = false;
  eventName = ""
  response = ""

  email = ""
  password = '';
  phone = ""
  city = ""

  strength = 'Weak';
  strengthClass = 'weak';

  hasLength = false;
  hasUppercase = false;
  hasLowercase = false;
  hasNumber = false;
  hasSpecialChar = false;


  // Inject FormBuilder service
  constructor(private FB: FormBuilder, private authservice: AuthService, private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    //  this.route.paramMap.subscribe(params => {

    // this.eventName = String (params.get('name'));
    // console.log(this.eventName);
    // });
  }

  onSubmit() {
    this.submitted = true;
  }

  MForm = this.FB.group
    (
      { // Add Multiple validations
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,}$')]],
        password: ['', [Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'), Validators.minLength(8)]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9-]+$'), Validators.minLength(10), Validators.maxLength(10)]],
        city: ['', [Validators.required, Validators.pattern('^[a-zA-Z-]+$'), Validators.minLength(3)]],
      }
    );

  checkPasswordStrength(passwords: string) {

    this.hasLength = passwords.length >= 8;
    this.hasUppercase = /[A-Z]/.test(passwords);
    this.hasLowercase = /[a-z]/.test(passwords);
    this.hasNumber = /[0-9]/.test(passwords);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwords);

    let score = 0;

    if (this.hasLength) score++;
    if (this.hasUppercase) score++;
    if (this.hasLowercase) score++;
    if (this.hasNumber) score++;
    if (this.hasSpecialChar) score++;

    if (score <= 2) {
      this.strength = 'Weak';
      this.strengthClass = 'weak';
    } else if (score <= 4) {
      this.strength = 'Medium';
      this.strengthClass = 'medium';
    } else {
      this.strength = 'Strong';
      this.strengthClass = 'strong';
    }
  }

  submitdata() {
    this.authservice.registerUser(this.MForm.value).subscribe(
      res => {
        this.response = res.status
        console.log("server response: " + res);

        // this.toastr.success('Registration Successful', 'Success');
        if (res.status === 'warning') {
          this.toastr.warning(res.message);
        }
        else {
          this.toastr.success(res.message);
        }
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
        if (err.status == '409') {
          this.toastr.warning(err.error.message);
        }
        else {
          this.toastr.error(err.error.message);
        }
      }
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
