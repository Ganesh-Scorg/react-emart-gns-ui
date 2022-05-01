import http_seller from "./http-seller";

class ProductDataService {
  getAll() {
    return http_seller.get();
  }

  get(id) {
    return http_seller.get(`/${id}`);
  }

  create(data) {
    return http_seller.post("/", data);
  }

  update(id, price, stock) {
    return http_seller.put(`/${id}?price=${price}&stock=${stock}`);
  }

  delete(id) {
    return http_seller.delete(`/${id}`);
  }

  deleteAll() {
    return http_seller.delete(`/`);
  }


}

export default new ProductDataService();