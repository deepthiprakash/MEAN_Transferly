const jwt=require('jsonwebtoken')
const db=require('./db.js')
// userDetails={
//     1000:{acno:1000,username:"anu",password:"abc123",balance:0,transaction:[]},
//     1001:{acno:1001,username:"ammu",password:"abc123",balance:0,transaction:[]},
//     1002:{acno:1002,username:"appu",password:"abc123",balance:0,transaction:[]},
//     1003:{acno:1003,username:"anju",password:"abc123",balance:0,transaction:[]}
//   }
register=(uname,acno,psw)=>{
      return db.User.findOne({acno}).then(user=>{
        if (user) {
          return{
          status:false,
          message:'user already present',
          statuscode:401
          }
        } 
        else {
        //create newuser object in db
          const newuser=new db.User({
            acno,username:uname,password:psw,balance:0,transaction:[]
          })
        // to save in db
        newuser.save()

        return {
          status:true,
          message:'registered successfully',
          statuscode:200
        }
        }
      })
    }
// register=(user,acno,psw)=>{
// if (acno in userDetails) {
//       return {
//         status:false,
//         message:'user already present',
//         statuscode:401
//       }
//     } else {
//       userDetails[acno]={acno,username:user,password:psw,balance:0,transaction:[]}
//       return {
//         status:true,
//         message:'registered successfully',
//         statuscode:200
//       }
//     }
// }
login=(acno,psw)=>{
   return db.User.findOne({acno,password:psw}).then(user=>{
      if (user) {
      currentUser = user.username
      currentAcno=acno
      //generate token
      const token=jwt.sign({currentAcno},"secret123")

      return{
        status:true,
        message:'login success',
        statuscode:200,
        currentUser,
        currentAcno,
        token
      }
    }
        
      else {
        return {
          status:false,
          message:'incorrect account number or password',
          statuscode:401
        }
      }
    })
}
//login=(acno,psw)=>{
//if (acno in userDetails){
//     if(psw == userDetails[acno]["password"]){
//       currentUser = userDetails[acno]["username"]
//       currentAcno=acno
//       //generate token
//       const token=jwt.sign({currentAcno},"secret123")

//       return{
//         status:true,
//         message:'login success',
//         statuscode:200,
//         currentUser,
//         currentAcno,
//         token
//       }
//     }
//     else {
//       return {
//         status:false,
//         message:'incorrect password',
//         statuscode:401
//       }
//     }
//   }
//   else {
//     return {
//       status:false,
//         message:'not registered',
//         statuscode:401
//     }
//   }
// }

deposit=(acno,psw,amount)=>{
  var amnt=parseInt(amount)
    return db.User.findOne({acno,password:psw}).then(user=>{
      if(user){
        user.balance+=amnt
        user.transaction.push({Type:"CREDIT",amount:amnt})
        user.save()
        return{
          status:true,
          message:`${amnt} is credited to your account and the balance is ${user.balance}`,
          statuscode:200
        }
      }
      else{
        return{
          status:false,
          message:'incorrect password',
          statuscode:401
        }
      }
    })
  }
    
// deposit=(acno,psw,amount)=>{
// var amnt=parseInt(amount)
//  if(acno in userDetails){
//     if(psw==userDetails[acno]["password"]){
//       //update balance
//       userDetails[acno]["balance"]+=amnt
//       //transaction data store
//       userDetails[acno]["transaction"].push({Type:"CREDIT",amount:amnt})
//       //return current balance
//       return{
//         status:true,
//         message:`${amnt} is credited to your account and the balance is ${userDetails[acno]["balance"]}`,
//         statuscode:200
//       }
//     }
//     else{
//       return{
//         status:false,
//         message:'incorrect password',
//         statuscode:401
//       }
//     }
//   }
//   else{
//     return{
//       status:false,
//       message:'incorrect acno',
//       statuscode:401
//     }
//   }
// }

withdraw=(acno,psw,amount)=>{
  var amnt=parseInt(amount)
  return db.User.findOne({acno,password:psw}).then(user=>{
    if(user) {
      if(amnt<=user.balance){
        user.balance-=amnt
        user.transaction.push({Type:"DEBIT",amount:amnt})
        user.save()
        return{
          status:true,
          message:`${amnt} is debited to your account and the balance is ${user.balance}`,
          statuscode:200
        }
      }
      else{
        return{
        status:false,
      message:'insufficient balance',
      statuscode:401
        }
      }
    }
    else{
      return{
      status:false,
    message:'incorrect acno or password',
    statuscode:401
      }
    }
  })
}

// withdraw=(acno,psw,amount)=>{
//   var amnt=parseInt(amount)
//   if (acno in userDetails){
//     if(psw==userDetails[acno]["password"]){
//       if(amnt<=userDetails[acno]["balance"]){
//         userDetails[acno]["balance"]-=amnt
//         userDetails[acno]["transaction"].push({Type:"DEBIT",amount:amnt})
//         return{
//           status:true,
//           message:`${amnt} is debited to your account and the balance is ${userDetails[acno]["balance"]}`,
//           statuscode:200
//         }
//       }
//       else{
//         return{
//         status:false,
//       message:'insufficient balance',
//       statuscode:401
//         }
//       }
//     }
//     else{
//       return{
//       status:false,
//     message:'incorrect password',
//     statuscode:401
//       }
//     }
//   }
//   else{
//     return{
//     status:false,
//   message:'incorrect acno',
//   statuscode:401
//     }
//   }
// }

getTransaction=(acno)=>{
  return db.User.findOne({acno}).then(user=>{
    if(user){
      return {
      status:true,
          statuscode:200,
        transaction:user.transaction
    }
  }
  })
}

// getTransaction=(acno)=>{
//   return {
//     status:true,
//         statuscode:200,
//       transaction:userDetails[acno]["transaction"]
//   }
// }

deleteAcc=(acno)=>{
  return db.User.deleteOne({acno}).then(user=>{
    if(user){
      return {
        status:true,
      message:'Account deleted',
      statuscode:200
      }
    }
  })
}

module.exports={
      register,login,deposit,withdraw,getTransaction,deleteAcc
  } 
