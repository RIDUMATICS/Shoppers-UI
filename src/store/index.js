import { createStore } from 'vuex';
import product from './modules/product.store';
import cart from './modules/cart.store';
import order from './modules/order.store';
import user from './modules/user.store';

export default createStore({
  state: {
    message: {
      head: '',
      body: '',
      status: '', // success or error alert
    }, //  message
    alertOpen: false,
    isLoading: false,
  },
  getters: {
    isAlertOpen: (state) => state.alertOpen,
    getMessage: ({ message }) => message,
    getIsLoading: ({ isLoading }) => isLoading,
    getLoadingMessage: ({ loadingMessage }) => loadingMessage,
  },
  mutations: {
    popupAlert: (state, message) => {
      state.message.head = message.head;
      state.message.body = message.body;
      state.message.status = message.status;
      state.alertOpen = true;
    },
    closeAlert: (state) => {
      state.message = { head: '', body: '' };
      state.status = '';
      state.alertOpen = false;
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    closeLoading: (state) => {
      state.isLoading = false;
      state.loadingMessage = '';
    },
  },
  actions: {},
  modules: {
    product,
    cart,
    order,
    user,
  },
});
