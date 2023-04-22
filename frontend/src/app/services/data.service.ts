import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//overloading headers as global
const option={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})


export class DataService {

  currentUser:any
  currentacno:any
  userDetails:any

  constructor(private http:HttpClient) {
    // this.getData()
   }
  // userDetails:any={
  //   1000:{acno:1000,username:"anu",password:"abc123",balance:0,transaction:[]},
  //   1001:{acno:1001,username:"ammu",password:"abc123",balance:0,transaction:[]},
  //   1002:{acno:1002,username:"appu",password:"abc123",balance:0,transaction:[]},
  //   1003:{acno:1003,username:"anju",password:"abc123",balance:0,transaction:[]}
  // }

  saveData(){  //to store in local storage
    if(this.userDetails){
      localStorage.setItem("database",JSON.stringify(this.userDetails))
    }
    if(this.currentUser){
      localStorage.setItem("currentUser",this.currentUser)
    }
    if(this.currentacno){
      localStorage.setItem("currentacno",JSON.stringify(this.currentacno))
    }
  }
  // getData(){
  //   if(localStorage.getItem('database')){
  //     this.userDetails=JSON.parse(localStorage.getItem('database')||"")
  //   }
  //   if(localStorage.getItem('currentUser')){
  //     this.currentUser=localStorage.getItem('currentUser')
  //   }
  //   if(localStorage.getItem('currentacno')){
  //     this.currentacno=JSON.parse(localStorage.getItem('currentacno')||"")
  //   }
  // }

  getToken(){
    //access token
    const token=JSON.parse(localStorage.getItem("token")||"")

    //generate header
    let headers=new HttpHeaders()
    if(token){
     option.headers = headers.append("access_token",token)
    }
    return option
  }

register(user:any,acno:any,psw:any){
  //create body data
  const data={user,acno,psw}
  return this.http.post("http://localhost:3000/register",data)
}

login(acno:any,psw:any){
 const data={acno,psw}
 return this.http.post("http://localhost:3000/login",data)

}

deposit(acno:any,psw:any,amount:any){
  const data={acno,psw,amount}
  return this.http.post("http://localhost:3000/deposit",data,this.getToken())
}

withdraw(acno:any,psw:any,amount:any){
   const data={acno,psw,amount}
   return this.http.post("http://localhost:3000/withdraw",data,this.getToken())
  }

getTransaction(acno:any){
  const data={acno}
  return this.http.post("http://localhost:3000/transaction",data,this.getToken())
}

deleacc(acno:any){
  return this.http.delete('http://localhost:3000/delete/'+acno,this.getToken())
}
}

