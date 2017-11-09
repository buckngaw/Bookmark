<template>
    <div>

        <!-- <div class="login">
            <h3>Sign in</h3>
            <input class="form-control" type="text" v-model="user.username" placeholder="Username"><br>
            <input class="form-control" type="password" v-model="user.password" placeholder="Password"><br>
            <span @click="login" class="btn btn-primary">Login</span>
            <hr>
            <p>You don't have an account? You can

                <router-link to="/signup"> create account here</router-link>
            </p>

        </div> -->


<center><h2>Log in</h2></center>

<div >
  

  <div class="container">
    
    <input type="text" placeholder="Enter Email" v-model="user.username" required>

    
    <input type="password" placeholder="Enter Password" v-model="user.password" required>
        
    <button  @click="login" >Login</button>
    
  </div>

  <div class="container" style="background-color:#f1f1f1"> 
    <span class="psw">Not registered? <router-link to="/signup">Create an account</router-link></span>
  </div>
</div>

        <footer class="footer">
            <p>&copy; 2016 Bookmarker, Inc.</p>
        </footer>
    </div>

    <!-- /container -->
</template>

<script>

import firebase from 'firebase';

export default {
    name: 'login',
    data() {
        return {
            user: {
                username: '',
                password: ''
            }

        }
    }, methods: {
        login() {

            firebase.auth().signInWithEmailAndPassword(this.user.username, this.user.password).then(
                user => {
                    alert('User authentication successful');
                    this.$router.push({ name: 'bookmarker' });
                },
                err => {
                    if (err.code === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else if (err.code === 'auth/user-not-found') {
                        alert('User not found!');
                    } else if (err.code === 'auth/invalid-email') {
                        alert('Invalid email');
                    } else {
                        alert('Oops. ' + err.message);
                    }

                }
            ).catch(error => {
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong password')
                } else {
                    alert(error.message);
                }
            })

        }

    }
}
</script>

<style>
form {
    border: 3px solid #f1f1f1;
}

input[type=text],
input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}

button:hover {
    opacity: 0.8;
}

.cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
}


span.psw {
    float: center;
    padding-top: 16px;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover:not(.active) {
    background-color: #111;
}

.active {
    background-color: #4CAF50;
}


/* Change styles for span and cancel button on extra small screens */

@media screen and (max-width: 300px) {
    span.psw {
        display: block;
        float: none;
    }
    .cancelbtn {
        width: 100%;
    }
}
</style>
