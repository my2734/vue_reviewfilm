<template>
     <!-- BEGIN | Header -->
     <header class="ht-header">
        <div class="container">
            <nav class="navbar navbar-default navbar-custom">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header logo">
                    <div class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <div id="nav-icon1">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <!-- <a href="index-2.html"><img class="logo" src="@/assets/@/assets/images/logo1.png" alt="" width="119" height="58"></a> -->
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse flex-parent" style="padding-left: 200px" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav flex-child-menu menu-left">
                        <li class="hidden">
                            <a href="#page-top"></a>
                        </li>
                        <li class="dropdown first">
                            <a @click="handlerClickHome($event)" class="btn btn-default dropdown-toggle lv1" data-toggle="dropdown">
                            Home 
                            </a>
                           
                        </li>
                        <!-- <li class="dropdown first">
                            <a class="btn btn-default dropdown-toggle lv1" data-toggle="dropdown" data-hover="dropdown">
                            movies
                            </a>
                        </li> -->
                        <li class="dropdown first">
                            <a @click="handlerClickCommingSoon($event)" class="btn btn-default dropdown-toggle lv1" data-toggle="dropdown" data-hover="dropdown">
                            comming soon
                            </a>
                           
                        </li>
                        
                    </ul>
                    <ul class="nav navbar-nav flex-child-menu menu-right">
                       
                        <li v-if="isAuthentication"><a @click="handlerPostMovie()" >Post Movie</a></li>
                        <li v-else class="loginLink"><a @click="handlertClickLogin()">LOG In</a></li>
                        <li v-if="!isAuthentication" class="btn signupLink"><a @click="handlerClickRegister()">sign up</a></li>
                        <li v-else class="btn signupLink"><a @click="handlerClickLogout()">Logout</a></li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </nav>
        </div>
    </header>
</template>

<script>
import { mapActions } from 'vuex';
import store from '@/store'
export default {
    name: "HeaderApp",
    methods: {
        ...mapActions(['get_list_movie']),
        getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        delete_cookie(name) {
            document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
        handlerClickLogout(){
            this.delete_cookie('token')
            store.commit('UPDATE_AUTH',false)
        },
        handlerClickHome(){
            this.$router.push({name: 'home'})
        },  
        handlerClickRegister(){
            this.$router.push({name:'register'})
        },
        handlertClickLogin(){
            this.$router.push({name: 'login'})
        },
        handlerPostMovie(){
            this.$router.push({name: 'postmovie'})
        },
        handlerClickCommingSoon(e){
            e.preventDefault()
            this.$router.push({name: 'commingsoon'})
        }
    },
    computed: {
        isAuthentication(){
            return store.state.isAuthentication
        }
    },
    created(){
        this.get_list_movie()
        const token = this.getCookie('token')
        if(token){
            store.commit('UPDATE_AUTH',true)
        }   
    }
}
</script>

<style>

</style>