<template>
  <b-container>
    <div class="accordion mt-5" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="info">เพิ่มข้อมูล</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div class="mt-5">
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group id="input-group-1" label="Title:" label-for="input-1">
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
              <!--  <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="mt-5">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">title</th>
            <th scope="col">description</th>
            <th scope="col">imageurl</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(Provider, index) in myProvider" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ Provider.Title }}</td>
            <td>{{ Provider.Description }}</td>
            <td>{{ Provider.imageurl }}</td>
            <td>
              <button
                type="button"
                class="btn btn-warning btn-sm px-3"
                v-b-modal.modal-1
                @click="edit(Provider.id)"
              >
                เเก้ไข
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="deleteTutorial(Provider.id)"
              >
                ลบ
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <b-modal id="modal-1" title="เเก้ไข" hide-footer>
        <b-form @submit="EditSubmit(form.id)" v-if="show">
          <b-form-group id="input-group-0" label="id:" label-for="input-0">
            <b-form-input id="input-0" v-model="form.id" required readonly></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-1" label="Title:" label-for="input-1">
            <b-form-input id="input-1" v-model="form.EditTitle" type="text" required>{{
              edit.Title
            }}</b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Description:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.EditDescription"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Image Url:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.EditImageUrl"
              required
            ></b-form-input>
          </b-form-group>
          <footer class="modal-footer">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </footer>
        </b-form>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import { http } from "@/http-axios.js";
import ApiDataService from "../services/ApiDataService.js";
export default {
  data() {
    return {
      myProvider: [],
      //  fields: [
      //     { key: 'id', label: 'ID' },
      //     { key: 'Title', label: 'Title' },
      //     { key: 'Description', label: 'Description' },
      //     { key: 'imageurl', label: 'imageurl' },
      //     { key: 'Actions', label: 'actions' }
      //   ],
      form: {
        Title: "",
        Description: "",
        ImageUrl: "",
      },
      form: {
        EditTitle: "",
        EditDescription: "",
        EditImageUrl: "",
      },
      show: true,
    };
  },
  methods: {
    async onSubmit() {
      // event.preventDefault()
      let obj = {
        title: this.form.Title,
        description: this.form.Description,
        imageurl: this.form.ImageUrl,
      };
      const result = await http.post(`/v1/api/post`, obj);
      console.log(result);
      alert(result.request.response);
      // this.$swal(result.request.response);
    },
    async EditSubmit(id) {
      // event.preventDefault()
      let data = {
        title: this.form.EditTitle,
        description: this.form.EditDescription,
        imageurl: this.form.EditImageUrl,
      };
      ApiDataService.update(id, data)
        .then((response) => {
          console.log(response.data);
          alert("เเก้ไขเรียบร้อย");
          // this.$swal('เเก้ไขเรียบร้อย');
        })
        .catch((e) => {
          console.log(e);
        });
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
      this.id = myProvider._id;
      return {
        id: myProvider._id,
        Title:
          myProvider.title.length > 40
            ? myProvider.title.substr(0, 40) + "..."
            : myProvider.title,
        Description:
          myProvider.description.length > 40
            ? myProvider.description.substr(0, 40) + "..."
            : myProvider.description,
        imageurl:
          myProvider.imageurl.length > 40
            ? myProvider.imageurl.substr(0, 40) + "..."
            : myProvider.imageurl,
      };
    },
    deleteTutorial(id) {
      ApiDataService.delete(id)
        .then(() => {
          alert("ลบเรียบร้อย");
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
          const data = response.data;
          this.form.id = data._id;
          this.form.EditTitle = data.title;
          this.form.EditDescription = data.description;
          this.form.EditImageUrl = data.imageurl;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.Title = "";
      this.form.Description = "";
      this.form.ImageUrl = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  mounted() {
    this.retrieveTutorials();
  },
};
</script>
