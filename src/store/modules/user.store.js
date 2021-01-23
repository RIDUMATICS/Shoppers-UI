import axios from "../../service/axiosInstance";


const state = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  authenticated: localStorage.getItem('token') ? true : false
};

const getters = {
  isAuthenticated: (state) => {
    return state.authenticated
  },
  getUser: (state) => state.user,
};

const actions = {
  registerUser({ commit }, newUser){
    return new Promise((resolve, reject) => {
      axios.post('/auth/signup', newUser)
      .then(response => {
        const { token, user } = response.data.result;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        commit('setUser', user);
        resolve();
      })
      .catch( err => {
        reject(err);
      });
    })
  },

  loginUser({ commit }, { email, password }){
    return new Promise((resolve, reject) => {
      axios.post('/auth/login', {
        email,
        password
      })
      .then(response => {
        const { token, user } = response.data.result;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        commit('setUser', user);
        resolve();
      })
      .catch(error => {
        reject(error);
      });
    })
  },

  logoutUser({ commit }){
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        commit('removeUser');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
};

const mutations = {
  setUser: ( state, user) =>   {
    state.authenticated = true;
    state.user = user;
  },

  removeUser: ( state) =>   {
    state.authenticated = false;
    state.user = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}