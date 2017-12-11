import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from 'app/security/login/login.service';
import { NotificationService } from 'app/shared/messages/notification.services';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  navigateTo: string;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    });

    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  login() {

    this.loginService.login(this.loginForm.value.email,
      this.loginForm.value.password)
      .subscribe(user => { console.log("USER", user);
        this.notificationService.notify(`Bem vindo, ${user.name}`) },
        // Callback de Erro 
        response => this.notificationService.notify(response.error.message),
        // Callback de conclusão do observable
        () => {
          this.router.navigate([atob(this.navigateTo)]);
        }
      );
  }
}
