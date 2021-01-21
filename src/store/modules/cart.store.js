import store from "../../store";

const state = {
  cartItems: [],
  subTotal: 0
};

const getters = {
  getCarts: (state) => state.cartItems,
  getSubTotal: (state) => state.subTotal
};

const actions = { 
};

const mutations = {
  addToCart: (state, newCart) => {
    const cartItem = state.cartItems.filter(cartItem => cartItem.product === newCart.product)

    if(cartItem[0]) {
        store.commit('popupAlert', { head: 'Unable to add', body: 'Product already in cart', status: 'error'});
    } else if ( newCart.countInStock < 1 ){
      store.commit('popupAlert', { head: 'Unable to add', body: 'Out of stock', status: 'error'});
    } 
    else {
      state.cartItems.push(newCart);
      state.subTotal += newCart.price;
    }
  },
  increaseQty: (state, { productId }) => {
    state.cartItems = state.cartItems.map(cart => {
      if(cart.product === productId){
        if(cart.qty + 1 <= cart.countInStock){
          cart.qty = cart.qty + 1;
          state.subTotal += cart.price
        }
        return cart;
      }
      return cart;
    })
  },
  decreaseQty: (state, { productId }) => {
    state.cartItems = state.cartItems.map(cart => {
      if(cart.product === productId){
        if(cart.qty - 1 >= 1){
          cart.qty = cart.qty - 1;
          state.subTotal -= cart.price
        }
        return cart;
      }
      return cart;
    })
  },
  removeFromCart: (state, { productId }) => {
    state.cartItems = state.cartItems.filter(cart => {
      if(cart.product === productId)
        state.subTotal -= cart.price * cart.qty
      return cart.product !== productId
    })
  },
  clearCart: (state) => {
    state.cartItems = [];
  }
};  

export default {
  state,
  getters,
  actions,
  mutations
}