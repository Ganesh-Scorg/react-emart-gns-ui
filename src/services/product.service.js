import http_seller from "./http-seller";
import http_buyer from "./http_buyer"

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

  selectProduct(id, quantity)
  {
    return http_buyer.post(`/cart/select/${id}/${quantity}`);
  }

  buyProduct(id, quantity)
  {
    return http_buyer.post(`/buy/${id}/${quantity}`);
  }

  buyAllProductsFromCart()
  {
    return http_buyer.post(`/buy`);
  }

  buyAllProductsFromCart()
  {
    return http_buyer.get(`/buy/history`);
  }
}

export default new ProductDataService();