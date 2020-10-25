<template>
  <div>
    <div size="120" class="user">
      <v-img :src="image_name" class="profile-img"></v-img>
      <v-icon class="icon grey white--text" @click="$refs.FileInput.click()">
        mdi-upload
      </v-icon>
      <input
        ref="FileInput"
        type="file"
        style="display: none;"
        @change="onFileSelect"
      />
    </div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text>
          <VueCropper
            v-show="selectedFile"
            ref="cropper"
            :src="selectedFile"
            alt="Source Image"
          ></VueCropper>
        </v-card-text>
        <v-card-actions>
          <v-btn class="primary" @click="saveImage">
            Crop
          </v-btn>
          <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  components: { VueCropper },
  props: ["image_name"],
  data() {
    return {
      mime_type: "",
      cropedImage: "",
      autoCrop: false,
      selectedFile: "",
      image: "",
      dialog: false,
      files: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    saveImage() {
      // const userId = this.$route.params.user.id;
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
        const formData = new FormData();
        formData.append("profile_photo", blob, this.selectedFile);
        axios
          .post("/api/users/setlogo", formData, {
            headers: {
              "content-type": "multipart/form-data"
            }
          })
          .then(response => console.log(response))
          .catch(function(error) {
            console.log(error);
          });
      }, this.mime_type);
      this.dialog = false;
    },
    onFileSelect(e) {
      const file = e.target.files[0];
      this.mime_type = file.type;
      if (typeof FileReader === "function") {
        this.dialog = true;
        const reader = new FileReader();
        reader.onload = event => {
          this.selectedFile = event.target.result;
          this.$refs.cropper.replace(this.selectedFile);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  width: 140px;
  height: 140px;
  border-radius: 100%;
  border: 1px solid #333333;
  position: relative;
  .profile-img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  .icon {
    position: absolute;
    top: 10px;
    right: 0;
    background: #e2e2e2;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
