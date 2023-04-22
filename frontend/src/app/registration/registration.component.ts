import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {



constructor(private ds:DataService,private router:Router,private fb:FormBuilder){}
 //create reactive form of register form
 registerForm=this.fb.group({
  acno:['',[Validators.required]],
  uname:['',[Validators.required]],
  psw:['',[Validators.required]]
 })
 //,Validators.pattern('[0-9]')
 //,Validators.pattern('[a-zA-Z]+')]
 //,Validators.pattern('[0-9A-Za-z]+')
register(){
  // alert("register works")
  // let userdetails=this.ds.userDetails
  var user=this.registerForm.value.uname
  var acno=this.registerForm.value.acno
  var psw=this.registerForm.value.psw
  if(this.registerForm.valid){
  this.ds.register(user,acno,psw).subscribe((result:any)=>{
    alert(result.message)
    this.router.navigateByUrl("")
  },
  result=>{
    alert(result.error.message)
    this.router.navigateByUrl("")
  
  }
  )
  
} else{
  alert('invalid form')
}
}
}
