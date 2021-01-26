import axios from '../../service/axiosInstance';

const state = {
  orders: [],
  orderDetails: {
    shipping: {},
  },
};

const getters = {
  getOrders: (state) => state.orders,
  getOrderDetails: (state) => state.orderDetails,
};

const actions = {
  submitOrder(_, newOrder) {
    return new Promise((resolve, reject) => {
      axios
        .post('/orders', newOrder, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  deleteOrder({ commit }, orderId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          commit('removeOrder', orderId);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  getOrderById({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          commit('addOrderDetails', res.data.result);
          resolve(res.data.result);
        })
        .catch((err) => reject(err));
    });
  },

  fetchOrders({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          commit('addOrders', res.data.result);
          resolve(res.data.result);
        })
        .catch((err) => reject(err));
    });
  },

  payOrder({ commit }, orderId) {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `/orders/${orderId}/pay`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => {
          commit('addOrderDetails', res.data.result);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  async deliverOrder({ commit }, orderId) {
    const res = await axios.patch(
      `/orders/${orderId}/deliver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    commit('addOrderDetails', res.data.result);
  },
};

const mutations = {
  addOrderDetails: (state, { order }) => {
    state.orderDetails = order;
  },
  addOrders: (state, { orders }) => {
    state.orders = orders;
  },
  removeOrder: (state, orderId) => {
    state.orders = state.orders.filter((order) => order.id != orderId);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
