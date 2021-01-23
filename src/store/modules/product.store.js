import axios from "../../service/axiosInstance";

const state = {
  totalPages: 0,
  products: [],
  productDetails: {}
};

const getters = {
  getProducts: (state) => state.products,
  getProductDetails: (state) => state.productDetails, 
  getTotalPages: (state) => state.totalPages,
  
};

const actions = {
  async createProduct(__, formData) {
    return new Promise((resolve, reject) => {
      axios.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then( res => resolve(res))
      .catch(err => reject(err));
    })
  },

  async fetchProducts({ commit }, { page, productFor = '', category =''}) {
    try {
      productFor = productFor === 'all' ? '' : productFor;
      const response = await axios.get(`/products?page=${page}&productFor=${productFor}&category=${category}`);
      commit('setProducts', response.data.result);
    } catch (error) {
      console.log(error);
    }
  },

  fetchProductById({ commit }, { productId }) {
    return new Promise((resolve, reject) => {
      axios.get(`/products/${productId}`)
      .then( response => {
        commit('setProductDetails', response.data.result);
        resolve(response.data.result)
      }).catch(err => reject(err));
    })
  },

  updateProduct(_, { productId, data}) {
    return new Promise((resolve, reject) => {
      console.log(data);
      axios.patch(`/products/${productId}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(res => resolve(res))
      .catch(err => reject(err))
    })
  },

  deleteProduct({ commit }, productId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/products/${productId}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then(() => {
        commit('removeProduct', productId);
        resolve()
      })
      .catch(err => reject(err))
    })
  },

  addProductReview({ commit }, { productId, rating, comment}) {
    return new Promise((resolve, reject) => {
      axios.post(`/products/${productId}/reviews`, { rating, comment },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then( res => {
        commit('setProductDetails', res.data.result);
        resolve(res);
      }).catch( err => reject(err));
    })
  }
};

const mutations = {
  setProducts: (state, { products, totalPages}) => {
    state.products = products;
    state.totalPages = totalPages;
  },
  setProductDetails: (state, { product }) => {
    state.productDetails = product;
  },
  removeProduct: (state, productId) => {
    state.products = state.products.filter(product => product.id != productId);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}