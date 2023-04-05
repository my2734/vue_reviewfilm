<template>
    <div class="">
        <div class="hero sr-single-hero sr-single">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h1>Admin</h1>
                        <ul class="breadcumb">
                          <li @click="handlerClickPostMovie()" ><a href="#">Create Movie</a></li>
                          <li class="active" style="margin-left: 20px;" @click="handlerClickListMovie()" > <a style="cursor: pointer" class="ion-ios-arrow-right">List Movie</a></li>
                      </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="" style="padding: 50px;">
            <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Control</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(movie,index) in list_movie" :key="movie._id">
                    <td>{{ (index+1) }}</td>
                    <td>{{ movie.title }}</td>
                    <td><img :src="'http://localhost:3000/images/'+movie.image"></td>
                    <td>{{ movie.category }}</td>
                    <td style="padding: 0px !important;" width="180px"><p class="text" style="color: black; font-size: 16px;">
                     {{ movie.description }}</p></td>
                    
                    <td> 
                        <button @click="handlerClickEditMovie(movie._id)" class="" style="color: white;background: linear-gradient(to right, #8041F2 , #3095ED);border-radius: 8px;transition: .2s ease-in-out;border: none;padding: 5px;" type="button"> Edit</button> 
                        <button @click="handlerClickDetele(movie._id)" class="" style="color: white;background: linear-gradient(to right, red , #12181f);border-radius: 8px;transition: .2s ease-in-out;border: none;padding: 5px;margin-left: 5px;" type="button"> Detele</button> 
                    </td>
                  </tr>
                  
                </tbody>
              
              </table>
        </div>
    </div>
   
</template>

<script>
// import store from '@/store'
import axios from 'axios'
import store from '@/store'
import { mapActions } from 'vuex'
export default {
    name: "ListMovie",
    data(){
      return {
       
      }
    },
    computed: {
      list_movie(){
        this.get_list_movie()
        return store.state.list_movie
      }
    },
    methods: {
      handlerClickEditMovie(id){
        this.$router.push({name: 'updatemovie',params: {id: id}})
      },
      handlerClickDetele(id){
          axios.delete('http://localhost:3000/api/movie/'+id)
            .then(response=>{
              console.log(response)
            })
            .catch(()=>{
              console.log('Loi delete movie')
            })
      },
      handlerClickListMovie(){
        this.$router.push({name: 'listmovie'})
      },
      handlerClickPostMovie(){
        this.$router.push({name: 'postmovie'})
      },
      ...mapActions(['get_list_movie'])
    },
    created(){
     
    }
}
</script>

<style scoped>


.text {
  overflow: hidden !important;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
          line-clamp: 4; 
  -webkit-box-orient: vertical;
}


</style>