import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;

  constructor(private formBuilder:FormBuilder) {
    this.criarForm();
   }
   criarForm(){
    this.form = this.formBuilder.group({
      email: [''],
      senha: ['']
    })
  }  
  emailDB: string = "email@teste.com";
  senhaDB: string = "12345678";
  mensagem: string;

  login(){
    if (this.form.get('email').value == this.emailDB && this.form.get('senha').value == this.senhaDB){
      this.mensagem = "Login feito com sucesso!";
    } else{
      this.mensagem = "E-mail ou a senha estar errado!";
    }
  }
  ngOnInit(): void {
    
  }
}
