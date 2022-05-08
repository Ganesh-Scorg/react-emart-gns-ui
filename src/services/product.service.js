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

  getselectedProducts()
  {
    return http_buyer.get(`/cart`);
  }

  removeselectedProducts(id)
  {
    return http_buyer.delete(`/cart/remove/${id}`);
  }

  removeAllselectedProducts()
  {
    return http_buyer.delete(`/cart/remove`);
  }

  buyProduct(id, quantity)
  {
    return http_buyer.post(`/buy/${id}/${quantity}`);
  }

  buyAllProductsFromCart()
  {
    return http_buyer.post(`/buy`);
  }

  getPurchaseHistory()
  {
    return http_buyer.get(`/buy/history`);
  }

  getPurchaseInvoice(id)
  {
    return http_buyer.get(`/buy/history/${id}`);
  }
}

export default new ProductDataService();