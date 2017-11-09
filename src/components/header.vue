<template>

        <div class="container">
            <ul>
                <li>
                    <router-link to='/bookmarker'>Bookmark</router-link>
                </li>
                <li>
                    <router-link to='/about' >About</router-link>
                </li>
                <li v-if="!currentUser" style="float:right">
                    <router-link to='/home' class="active" href="#about">Login</router-link>
                </li>
                                <li v-if="currentUser" style="float:right">
                    <a @click='logout' class="active" >Logout</a>
                </li>
                <li style="float:right">
                    <router-link to='/signup' class="active" >SignUp</router-link>
                </li>

            </ul>
            <br><br><br>
        </div>

   
</template>

<script>

import firebase from 'firebase';

export default {
    data() {
        return {
            currentUser: null
        }
    },
    methods: {
        logout() {

            firebase.auth().signOut().then(() => {

                this.$router.push({ name: 'home' });

            })
        }
    }, created() {
        firebase.auth().onAuthStateChanged(
            user => {
                this.currentUser = user
            }
        )

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
