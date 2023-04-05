<template>
    <div class="login-wrapper" id="login-content">
        <section class="login-block">
            <div class="container">
                <div class="row">
					
					<div class="col-md-4 login-sec">
                        <h2 class="text-center">Login Now</h2>
                        <form class="login-form">
                            <div class="form-group">
                                <label for="exampleInputEmail1" class="text-uppercase">Username</label>
                                <input v-model="user.username" type="text" class="form-control" placeholder="">
								<span v-if="statusError.username" class="text-danger">*Vui lòng nhập Username*</span>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1" class="text-uppercase">Password</label>
                                <input v-model="user.password" type="password" class="form-control" placeholder="">
								<span v-if="statusError.password" class="text-danger">*Vui lòng nhập Password*</span>

                            </div>
                            <div class="form-check" style="text-align:center">
                                
                                <button @click="handlerClickSubmitLogin($event)" class="btn btn-login float-right">Submit</button>
                            </div>
                        </form>
                        <div style="cursor:pointer" class="copy-text"><span @click="handlertClickHome()">GO HOME</span><a style="margin-left: 10px" @click="handlerClickRegister($event)">Register now!</a></div>
                    </div>
                    <div class="col-md-8 banner-sec" >
                        <div id="carouselExampleIndicators" class="carousel slide" height="100%" style="background-color: blue;" data-ride="carousel">
                            <div class="carousel-inner" role="listbox" >
                                <div class="carousel-item active">
                                    <img class="d-block img-fluid" style="" src="https://images.thedirect.com/media/article_full/star-wars-next-movie_m5u3MQu.jpg" alt="First slide">
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </section>
    </div>
</template>
<script>
// import store from '@/store'
import store from '@/store'
import axios from 'axios'
    export default {
        name: "LoginPage",
		data(){
			return {
				user: {
					username: "",
					password: ""
				},
				status: true,
				statusError: {
					username: false,
					password: false
				}
			}
		},
		methods: {
			handlerClickRegister(e){
				e.preventDefault()
				this.$router.push({name: 'register'})
			},
			validation(){
				if(this.user.username == ""){
					this.status = false
					this.statusError.username = true
				}else{
					this.statusError.username = false
				}

				if(this.user.password == ""){
					this.status = false
					this.statusError.password = true
				}else{
					this.statusError.password = false
				}

				if(this.user.username != "" && this.user.password !=""){
					this.status = true
				}
			},
			handlerClickSubmitLogin(e){
				e.preventDefault()
				this.validation()
				if(this.status){
					const data = {
						username: this.user.username,
						password: this.user.password
					}
					axios.post('http://localhost:3000/api/auth/login',data)
						.then(response=>{
							const token = response.data
							this.setCookie('token', token, '3d')
							store.commit('UPDATE_AUTH',true)
							this.user.username = ""
							this.user.password = ""
							this.$router.push({name: 'home'})
						})
						.catch(()=>{
							console.log('Loi login')
						})
				}
			},
			setCookie(cname, cvalue, exdays) {
				const d = new Date();
				d.setTime(d.getTime() + (exdays*24*60*60*1000));
				let expires = "expires="+ d.toUTCString();
				document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
			},
			handlertClickHome(){
				this.$router.push({name: 'home'})
			}
		}
    }
</script>
<style scoped>
.login-block {
	background: #020d18;
	/* fallback for old browsers */
	background: -webkit-linear-gradient(to bottom, #131920, #020d18);
	/* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to bottom, #131920, #020d18);
	/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	float: left;
	width: 100%;
	padding: 50px 0;
}

.text-danger{
	color: red;
	font-size: 12px;
}

.banner-sec {
	
	background-size: cover;
	min-height: 500px;
	border-radius: 0 10px 10px 0;
	padding: 0;
}

.container {
	background: #fff;
	border-radius: 10px;
	box-shadow: 15px 20px 0px rgba(0, 0, 0, 0.1);
}

.carousel-inner {
	border-radius: 0 10px 10px 0;
}

.carousel-caption {
	text-align: left;
	left: 5%;
}

.login-sec {
	padding: 50px 30px;
	position: relative;
}

.login-sec .copy-text {
	position: absolute;
	width: 80%;
	bottom: 20px;
	font-size: 13px;
	text-align: center;
}

.login-sec .copy-text i {
	color: #FEB58A;
}

.login-sec .copy-text a {
	color: #E36262;
}

.login-sec h2 {
	margin-bottom: 30px;
	font-weight: 800;
	font-size: 30px;
	color: #020d18;
}

.login-sec h2:after {
	content: " ";
	width: 100px;
	height: 5px;
	background: #FEB58A;
	display: block;
	margin-top: 20px;
	border-radius: 3px;
	margin-left: auto;
	margin-right: auto
}

.btn-login {
	background: #020d18;
	color: #fff;
	font-weight: 600;
}

.banner-text {
	width: 70%;
	position: absolute;
	bottom: 40px;
	padding-left: 20px;
}

.banner-text h2 {
	color: #fff;
	font-weight: 600;
}

.banner-text h2:after {
	content: " ";
	width: 100px;
	height: 5px;
	background: #FFF;
	display: block;
	margin-top: 20px;
	border-radius: 3px;
}

.banner-text p {
	color: #fff;
}



</style>