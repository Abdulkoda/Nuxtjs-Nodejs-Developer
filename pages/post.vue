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
   <div class="mt-5">
       <b-table striped hover  :items="myProvider" :fields="fields"   disable-pagination :hide-default-footer="true"> 
        <template #cell(Actions) >
         <b-button  size="sm" v-b-modal.modal-1 variant="warning" v-model="id" @click="edit(id)">เเก้ไข</b-button>

        <b-button size="sm" v-model="id" @click="deleteTutorial(id)" variant="danger" class="mr-2">
           ลบ
        </b-button>
  
      </template>
    </b-table>
     <b-modal id="modal-1" title="เเก้ไข">
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

    </b-modal>
  </div>
  </b-container>
</template>

<script>
import {http} from "@/http-axios.js";
import ApiDataService from "../services/ApiDataService.js";
  export default {
    data() {
      return {
       myProvider: [],
       fields: [
          { key: 'id', label: 'ID' },
          { key: 'Title', label: 'Title' },
          { key: 'Description', label: 'Description' },
          { key: 'imageurl', label: 'imageurl' },
          { key: 'Actions', label: 'actions' }
        ],
        form: {
          Title: '',
          Description: '',
          ImageUrl:'',
        },
        show: true
      }
    },
    methods: {
     async onSubmit(){
          // event.preventDefault()
          let obj={
            "title":this.form.Title,
            "description":this.form.Description,
            "imageurl":this.form.ImageUrl
          }
           const result =  await http.post(`/v1/api/post`,obj)
           console.log(result)
           this.$swal(result.request.response);
        },
    
       retrieveTutorials() {
      ApiDataService.getAll()
        .then((response) => {
          this.myProvider = response.data.map(this.getDisplayTutorial);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveTutorials();
    },
    getDisplayTutorial(myProvider) {
      this.id =  myProvider._id
      return {
        id: myProvider._id,
        Title: myProvider.title.length > 30 ? myProvider.title.substr(0, 30) + "..." : myProvider.title,
        Description: myProvider.description.length > 30 ? myProvider.description.substr(0, 30) + "..." : myProvider.description,
        imageurl: myProvider.imageurl.length > 30 ? myProvider.imageurl.substr(0, 30) + "..." : myProvider.imageurl,
      };
    },
    deleteTutorial(id) {
      ApiDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    edit(id) {
        ApiDataService.get(id)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
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
    },
    mounted() {
    this.retrieveTutorials();
  },
  }
</script>