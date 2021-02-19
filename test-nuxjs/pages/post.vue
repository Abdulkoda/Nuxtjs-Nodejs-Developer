<template>
<b-container>
  <div class="mt-5">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Title:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.Title"
          type="text"
          placeholder="Enter Title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.Description"
          placeholder="Enter Description"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Image Url:" label-for="input-2">
        <b-form-input
          id="input-3"
          v-model="form.ImageUrl"
          placeholder="Enter Image Url"
          required
        ></b-form-input>
      </b-form-group>
      
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
  </b-container>
</template>

<script>
import {HTTP} from "@/axios.js";
  export default {
    data() {
      return {
        form: {
          Title: '',
          Description: '',
          ImageUrl:'',
        },
        show: true
      }
    },
    methods: {
     async onSubmit(event){
          event.preventDefault()
          let obj={
            "title":this.form.Title,
            "description":this.form.Description,
            "imageurl":this.form.ImageUrl
          }
           const result =  await HTTP.post(`/v1/api/post`,obj)
           console.log(result)
           this.$swal(result.request.response);
          //  alert('status'+result.status+ result.data)
        },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.Title = ''
        this.form.Description = ''
        this.form.ImageUrl = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>