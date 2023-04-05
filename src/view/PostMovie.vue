<template>
  <div class="">
    <div class="hero sr-single-hero sr-single">
      <div class="container">
          <div class="row">
              <div class="col-md-12">
                  <h1>Admin</h1>
                  <ul class="breadcumb">
                      <li @click="handlerClickPostMovie()" class="active"><a href="#">Create Movie</a></li>
                      <li style="margin-left: 20px;" @click="handlerClickListMovie()" > <a style="cursor: pointer" class="ion-ios-arrow-right">List Movie</a></li>
                  </ul>
              </div>
          </div>
      </div>
    </div>

      <div class="">
        <div class="container" style="padding-top: 64px; padding-bottom: 64px;">
          <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
              <h5 v-if="!status_update">Page create movie</h5>
              <h5 v-else>Page update movie</h5>
                <form>
                  <div class="form-group">
                      <label for="exampleInputEmail1">Title movie *</label>
                      <input v-model="movie.title" type="text" class="form-control" >
                      <span v-if="statusError.title" class="text-danger">*Vui lòng nhập tên movie*</span>
                  </div>
                  <div class="form-group">
                      <label for="exampleInputEmail1">Category *</label>
                      <select v-model="movie.category">
                        <option v-for="(category) in list_category" :key="category._id" :value="category.category">{{category.category}}</option>
                      </select>
                      <span v-if="statusError.category" class="text-danger">*Vui lòng nhập thể loại movie*</span>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Link Video *</label>
                    <input v-model="movie.link_url" type="text" class="form-control" >
                    <span v-if="statusError.link_url" class="text-danger">*Vui lòng nhập link video*</span>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Image *</label>
                    <input
                    type="file"
                    @change="uploadFile"
                    ref="file"
                    class="custom-file-input"
                  />
                    <span v-if="statusError.image" class="text-danger">*Vui lòng nhập hình ảnh*</span>
                  </div>
                  <div class="form-group">
                      <label for="exampleFormControlTextarea1">Description</label>
                      <textarea  class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="movie.description"></textarea>
                  </div>
                  <button v-if="!status_update"  style="color: white;background: linear-gradient(to right, #8041F2 , #3095ED);border-radius: 8px;transition: .2s ease-in-out;border: none;padding: 5px;" @click="handlerClickSubmit($event)">Submit</button>
                  <button v-else style="color: white;background: linear-gradient(to right, #8041F2 , #3095ED);border-radius: 8px;transition: .2s ease-in-out;border: none;padding: 5px;" @click="handlerClickUpdate($event,movie._id)">Update</button>
              </form>
              </div>
              
              </div>
            </div>
          </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "PostMovie",
    data(){
      return {
        movie: {
          title: "",
          image: "",
          category: "",
          link_url: "",
          description: "",
        },
        status: true,
        statusError: {
          title: false,
          image: false,
          link_url: false,
        },
        list_category: [],
        status_update: false,
      }
    },
    methods: {
      handlerClickPostMovie(){
        this.$router.push({name: 'postmovie'})
      },
      handlerClickListMovie(){
        this.$router.push({name: "listmovie"})
      },
      uploadFile() {
        this.movie.image = this.$refs.file.files[0];
        this.statusError.image = false;
      },
      handlerClickUpdate(e,id){
        e.preventDefault()
        //validate update
        if(this.movie.title == ""){
          this.status = false
          this.statusError.title = true
        }else{
          this.statusError.title = false
        }

        if(this.movie.category == ""){
          this.status = false
          this.statusError.category = true
        }else{
          this.statusError.category = false
        }

        if(this.movie.link_url == ""){
          this.status = false
          this.statusError.link_url = true
        }else{
          this.statusError.link_url = false
        }

        if(this.movie.title != "" && this.movie.category != ""){
          this.status = true
        }

        if(this.movie.image.name == undefined){ 
          const data = {
              title: this.movie.title,
              category: this.movie.category,
              link_url: this.movie.link_url,
              description: this.movie.description
          }
          axios.put('http://localhost:3000/api/movie/'+id,data)
            .then(response=>{
              console.log(response)
              this.$router.push({name: 'listmovie'})
            })  
            .catch(()=>{
              console.log('Loi update moive')
            })
        }else{
          const data = {
              title: this.movie.title,
              image: this.movie.image.name,
              category: this.movie.category,
              link_url: this.movie.link_url,
              description: this.movie.description
          }
            axios.post('http://localhost:3000/api/upload',{file: this.movie.image},{headers: {
              "Content-Type": "multipart/form-data",
            }})
            .then(()=>{
                  axios.put('http://localhost:3000/api/movie/'+id,data)
                  .then(response=>{
                    console.log(response)
                    this.$router.push({name: 'listmovie'})
                  })  
                  .catch(()=>{
                    console.log('Loi update moive')
                  })
            })
            .catch(()=>{
              console.log('Loi update movie have upload image')
            })
    
        }
        
      },
      validation(){
        if(this.movie.title == ""){
          this.status = false
          this.statusError.title = true
        }else{
          this.statusError.title = false
        }

        if(this.movie.image.name == undefined){
          this.status = false
          this.statusError.image = true
        }else{
          this.statusError.image = false
        }

        if(this.movie.category == ""){
          this.status = false
          this.statusError.category = true
        }else{
          this.statusError.category = false
        }

        if(this.movie.link_url == ""){
          this.status = false
          this.statusError.link_url = true
        }else{
          this.statusError.link_url = false
        }

        if(this.movie.title != "" && this.movie.image.name !="" && this.movie.category != ""){
          this.status = true
        }
      },
      handlerClickSubmit(e){
        e.preventDefault()
        this.validation()
          if(this.status){
            const data = {
              title: this.movie.title,
              image: this.movie.image.name,
              category: this.movie.category,
              link_url: this.movie.link_url,
              description: this.movie.description
            }
            //upload image
            axios.post('http://localhost:3000/api/upload',{file: this.movie.image},{headers: {
              "Content-Type": "multipart/form-data",
            }})
            .then(()=>{
                axios.post('http://localhost:3000/api/movie',data)
                  .then(response=>{
                    if(response.status == 200){
                      this.$router.push({name: "listmovie"})
                    }
                  })
                  .catch(()=>{
                    console.log('Loi post movie')
                  })
            }).
            catch(()=>{
              console.log('Loi upload image')
            })
        }
        
      }
    },
    created(){
      axios.get('http://localhost:3000/api/category')
        .then(response=>{
          if(response.status == 200){
            this.list_category = response.data
          }
        })
        .catch(()=>{
          console.log('loi get category')
        })
      
      const id = this.$route.params.id
      if(id){
        this.status_update = true
        axios.get('http://localhost:3000/api/movie/'+id)
          .then(response=>{
            if(response.status == 200){
               this.movie = response.data
            }
          })
          .catch(()=>{
            console.log('Loi get detail movie')
          })
      }

    }
}
</script>

<style scoped>
  .text-danger{
    color: red;
    font-size: 13px;
  }
</style>