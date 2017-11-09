<template>
  
    <div class="container">
  	<label><b>Name</b></label>
    <input type="text" placeholder="Firstname Lastname" v-model="user.name"  required>
    
    <label><b>Email</b></label>
    <input type="text" placeholder="example@hotmail.com"  v-model="user.email" required>

    <label><b>Password</b></label>
    <input type="password" placeholder="Enter Password" v-model="user.password1" required>

    <label><b>Repeat Password</b></label>
    <input type="password" placeholder="Repeat Password" v-model="user.password2" required>
    
 
    <br><br><br><br><br><br>
    <div class="clearfix">
     
      <button lass="signupbtn" @click="validateBeforeSubmit">Sign Up</button>
    </div>
    <p>or go back to login <router-link to="/index">login</router-link>.</p>
  </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../firebaseConfig'

var md5 = require('md5');
let usersRef = db.ref('users');

export default {
  name: 'signUp',
  data() {
      return {
          user: {
              name: '',
              email: '',
              password1: '',
              password2: '',
          }
      }
  },
  methods: {
      validateBeforeSubmit() {
          if (this.user.email && (this.user.password1 === this.user.password2)) {
              this.signup();
          } else {
              if(!this.user.name) {
                  alert('Name cannot be empty');
                  this.$refs.name.focus();
                  return;
              }
              if(!this.user.email) {
                  alert('Email cannot be empty');
                  this.$refs.email.focus();
                  return;
              }
              if(this.user.password1 != this.user.password2) {
                  alert('Password mismatch');
                  this.$refs.password2.focus();
                  return;
              }
          }
      },
      signup() {
            firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password1).then( 
                user => {
                    alert('Your accound has been created!');

                    /* add user info to database */
                    // var newUser = this.addUserInfo();
                    this.addUserInfo();

                    this.$router.push({ name: 'home'});
                }, 
                error => {
                    var errorCode = error.code;
                    var errorMsg = error.message;
                    if (errorCode == 'auth/weak-password') {
                        alert('The password is too week');
                    } else {
                        alert('Oops.' + errorMsg);
                    }
                }
            );
      },
      addUserInfo() {
          var newUser = {
              name: this.user.name,
              email: this.user.email
          }

            // md5  ---> npm install md5 -s
          var uid = md5(this.user.email);
          console.log(uid);
          db.ref('users/'+ uid).set(newUser);

      }
    }
}
</script>

<style scoped>
 /* Full-width input fields */
input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

/* Set a style for all buttons */
button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}

/* Extra styles for the cancel button */
.cancelbtn {
    padding: 14px 20px;
    background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn,.signupbtn {
    float: left;
    width: 50%;
}


/* Clear floats */
.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
    .cancelbtn, .signupbtn {
       width: 100%;
    }
}
</style>

