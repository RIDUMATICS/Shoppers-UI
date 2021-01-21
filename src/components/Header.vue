<template>
  <!-- Header -->
  <header id="home" class="header" :class="{'fix-nav' : stickyNavbar}">
    <!-- Navigation -->
    <nav class="nav" :class="{'show': showMenu}" >
      <div class="navigation container">
        <div class="logo">
          <router-link to="/"><h1>Shoppers <span style="display:inline-block; background-color: #fc7c7c; width: 7px; height: 7px; border-radius: 50%; margin-left: -3px; margin-bottom: 0;"></span></h1></router-link>
        </div>
        <div class="menu" :class="{'show': showMenu }">
          <div class="top-nav">
            <div class="logo">
              <h1>Shoppers</h1>
            </div>
            <div class="close" @click="handleShowMenu(false)">
              <font-awesome-icon :icon="faTimes" />
            </div>
          </div>
          <ul class="nav-list" @click.passive="handleClick">
            <li class="nav-item">
              <router-link to="/" class="nav-link" data-type="menu">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/shop/1" class="nav-link" data-type="menu">Shop</router-link>
            </li>
            <li class="nav-item">
              <a href="#home" class="nav-link" data-type="menu">About</a>
            </li>
            <li class="nav-item">
              <a href="#home" class="nav-link" data-type="menu">Contact</a>
            </li>
            <li class="nav-item" v-show="!isAuthenticated">
              <router-link to="/login" class="nav-link" data-type="menu">Login/Register</router-link>
            </li>

            <li class="nav-item" v-if="isAuthenticated">
              <Dropdown :user="user"/>
            </li>

            <li class="nav-item cart">
              <router-link to="/cart" class="nav-link"><font-awesome-icon :icon="faShoppingBag" /> <span class="cart-num">{{ carts.length }}</span> </router-link>
            </li>
          </ul>
        </div>

        <router-link to="/cart" class="cart-icon">
          <font-awesome-icon :icon="faShoppingBag" /> <span class="cart-num-mobile">{{ carts.length }}</span>
        </router-link>

        <div class="hamburger" @click="handleShowMenu(true)">
          <font-awesome-icon :icon="faBars" />
        </div>
      </div>
    </nav>

    <!-- Hero Img -->
    
  </header>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faShoppingBag, faTimes, faBars  } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import Dropdown from './Dropdown';

export default {
  setup(){
    const store = useStore()
    const event = reactive({
      isAuthenticated: computed(() => store.getters.isAuthenticated),
      user: computed(() => store.getters.getUser),
      menu: null,
      showMenu: false,
      stickyNavbar: false,
      carts: computed(() => store.getters.getCarts),
    });

    function handleNavScroll() {
      window.addEventListener('scroll', () => {
        const scrollHeight = window.pageYOffset;
        if( scrollHeight > 70) {
          event.stickyNavbar = true;
        } else {
          event.stickyNavbar = false;
        }
      })
    }

    function handleShowMenu(isShow) {
      if (isShow)
        document.body.classList.add('show')
      else
        document.body.classList.remove('show')
      event.showMenu = isShow;
    }

    function handleClick (e) {
      if(e.target.getAttribute('data-type') === 'menu'){
        handleShowMenu(false);
      }
    }

    onMounted(() => {
      handleNavScroll();
    })

    return {
      ...toRefs(event),
      FontAwesomeIcon,
      faShoppingBag,
      faBars,
      faTimes,
      Dropdown,
      handleShowMenu,
      handleClick
    }

  }
}
</script>

<style>
  .header {
    background-color: #d1e2e9;
    transition: 10ms;
  }

  header.fix-nav {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    
  }

  .nav {
    background-color: #fff;
  }

  .fix-nav .nav {
    background-color: #243a6f;
    color: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  }

  .nav.fix-nav .nav-link,
  .nav.fix-nav .logo {
    color: #fff;
  }

  .navigation {
    padding: 1.5rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo h1 {
    font-size: 2.5rem ;
    font-weight: 600;
  }

  .top-nav {
    display: none;
  }

  .nav-list {
    display: flex;
    align-items: center;
  }

  .nav-item:not(:last-child){
    margin-right: .5rem;
    text-transform: capitalize;
  }

  .nav-link:link,
  .nav-link:visited {
    padding: 0.8rem 1rem;
    transition: all 300ms ease-in-out;
  }

  .nav-link.icon {
    font-size: 3rem;
  }

  .hamburger {
    display: none;

  }

  .cart-icon {
    display: none;
    position: relative;
  }

  .cart-icon .cart-num-mobile {
    box-sizing: border-box;
    font-size: 15px;
    color: #fff;
    line-height: 15px;
    text-align: center;
    display: inline-block;
    padding: 3px;
    background-color: #fc7c7c;
    position: absolute;
    top: -6px;
    right: 1;
  }

  .cart {
    position: relative;
  }

  .cart-num {
    box-sizing: border-box;
    font-size: 12px;
    color: #fff;
    line-height: 15px;
    text-align: center;
    min-width: 15px;
    height: 15px;
    display: inline-block;
    padding: 0 3px;
    background-color: #fc7c7c;
    position: absolute;
    top: -6px;
    right: 1;
  }
  

  @media only screen and (max-width: 768px) {
    .menu {
      position: fixed;
      top: 0;
      left: -100%;
      width: 80%;
      max-width: 40rem;
      height: 100%;
      background-color: #fff;
      color: #243a6f;
      transition: all 500ms ease-in-out;
      z-index: 100;
    }

    .menu.show {
      left: 0;
    }

    .top-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #243a6f;
      padding: 1rem 1.6rem;
    }

    .top-nav .logo {
      color: #fff; 
    }

    .top-nav .close {
      color: #fff;
      font-size: 3rem;
      padding: 1rem;
      cursor: pointer;
    }

    .cart-icon{
      display: block;
      font-size: 3rem;
    }

    .hamburger {
      display: block;
      font-size: 3rem;
      padding: .5rem;
      cursor: pointer;
    }

    .nav-list {
      flex-direction: column;
      align-items: start;
      padding: 1rem 1.6rem;

    }

    .nav-link:link,
    .nav-link:visited {
      display: block;
      font-size: 1.7rem;
      padding: 1rem 0;
    }

    .nav.fix-nav .nav-link{
      color: #243a6f;
    }

    .nav-link.icon {
      display: none;
    }

    body.show::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 4;
    }

    .nav-show{
      background-color: rgba(0, 0, 0, 0.8);
    }

    .cart {
      margin-top: 20px;
    }

    .cart-icon > .cart-num {
      font-size: 12px;
      top: -6px;
      right: -12px;
  }
  }
 
</style>