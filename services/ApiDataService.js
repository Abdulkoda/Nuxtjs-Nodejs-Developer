import {http} from "../http-axios";

class ApiDataService {
  getAll() {
    return http.get("/v1/api/data");
  }

  get(id) {
    return http.get(`/v1/api/get/${id}`);
  }

  create(data) {
    return http.post("/v1/api/post", data);
  }

  update(id, data) {
    return http.put(`/v1/api/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/v1/api/delete/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new ApiDataService();