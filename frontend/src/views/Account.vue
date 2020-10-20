<template>
  <div class="account">
    <h1>This is an account page</h1>
    <v-container class="my-6">
      <v-row>
        <v-col class="col-12 col-md-9">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            eum error animi, accusamus modi rem aliquid eaque quidem placeat, ut
            adipisci dicta. Sequi, quos qui deserunt magnam earum dolor eveniet?
          </p>
        </v-col>
        <v-col outline class="col-12 col-md-3">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            quis nostrum nesciunt quas inventore cumque, minima debitis
            temporibus eos eligendi incidunt ipsa at corporis voluptatum quod
            soluta, ab nisi enim?
          </p>
          <input 
            type="file"
            @change="onFileSelect"
            ref="inputLogo">
          <button @click="onUpload">Загрузить</button>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
//import axios from "axios";

export default {
  name: "Account",
  data () { 
    return {
      selectedFile: null
    }
  },
  methods: {
      onFileSelect(event) {
        this.selectedFile = event.target.files[0];
      },
      onUpload () {
        if (this.selectedFile === null) return;
        
        let formData = new FormData();

        formData.set('file', this.selectedFile);

        axios.post('/api/users/setlogo', formData, {
          headers: {
          'content-type': 'multipart/form-data'
          }}).then(response => console.log(response));
      }
    }
};
</script>
