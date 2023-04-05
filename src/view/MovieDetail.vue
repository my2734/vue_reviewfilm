<template>
    <div class="">  
        <div class="hero sr-single-hero sr-single">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                    </div>
                </div>
            </div>
        </div>
        <div class="page-single movie-single movie_single">
            <div class="container">
                <div class="row ipad-width2">
                    <div class="col-md-4 col-sm-12 col-xs-12">
                        <div class="movie-img sticky-sb">
                            <img v-if="movie.image" :src="'http://localhost:3000/images/'+movie.image" alt="">
                            <div class="movie-btn">	
                                <div class="btn-transform  red">
                                    <div><a href="#" class="item item-1 redbtn"> <i class="ion-play"></i> Watch Trailer</a></div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-sm-12 col-xs-12">
                        <div class="movie-single-ct main-content">
                            <h1 class="bd-hd">{{ movie.title }}<span> 2007 - current</span></h1>
                            <div class="social-btn">
                                <a href="#" class="parent-btn"><i class="fa fa-heart"></i> Add to Favorite</a>
                                <div class="hover-bnt">
                                    <a href="#" class="parent-btn"><i class="fa fa-share-alt"></i>share</a>
                                    <div class="hvr-item">
                                        <a href="#" class="hvr-grow"><i class="ion-social-facebook"></i></a>
                                        <a href="#" class="hvr-grow"><i class="ion-social-twitter"></i></a>
                                        <a href="#" class="hvr-grow"><i class="ion-social-googleplus"></i></a>
                                        <a href="#" class="hvr-grow"><i class="ion-social-youtube"></i></a>
                                    </div>
                                </div>		
                            </div>
                            <div class="movie-rate">
                               
                            </div>
                            <div class="movie-tabs">
                                <h5 style="color: white">Category: {{ movie.category }}</h5>
                                <div class="tabs">
                                    <ul class="tab-links tabs-mv tabs-series">
                                        <li class="active"><a href="#overview">Overview</a></li>         
                                    </ul>
                                    <div class="tab-content">
                                        <div id="overview" class="tab active">
                                            <div class="row">
                                                <div class="col-md-8 col-sm-12 col-xs-12">
                                                    <p>{{ movie.description }}</p>
  
                                                   
                                                </div>
                                                <div class="col-md-4 col-xs-12 col-sm-12">
                                                   
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="hs-responsive-embed-youtube">
                                                    <iframe width="560" height="315" :src="'https://www.youtube.com/embed/'+movie.link_url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                                    <!-- <iframe
                                                        width="560"
                                                        height="315"
                                                        src="https://www.youtube.com/embed/iD7CCTwnsA4"
                                                        frameborder="0"
                                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                        allowfullscreen
                                                        ></iframe> -->
                                                </div>
                                            </div>
                                        </div>
                                      
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "MovieDetail",
    data(){
        return {
            movie: {
                title: "",
                image: "",
                category: "",
                link_url: "",
                description:""
            }
        }
    },
    created(){
        const id = this.$route.params.id
        if(id){
            axios.get('http://localhost:3000/api/movie/'+id)
                .then(response=>{
                    this.movie = response.data
                    console.log(this.movie)
                })
                .catch(()=>{
                    console.log('Loi Render movie detail')
                })
        }
    }
}
</script>

<style scoped>
.hs-responsive-embed-youtube {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
    padding-top: 25px;
    }
    .hs-responsive-embed-youtube iframe {
    position: absolute;
    width: 100%!important;
    height: 100%!important;
    }
</style>