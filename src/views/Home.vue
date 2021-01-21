<template>
  <Hero />
  <main style="padding-bottom: 140px">
    <Details />
    <div class="container product-overview">
      <h3>PRODUCT OVERVIEW</h3>
      <Products :products="products"/>
      <div class="more-btn">
        <router-link to="/shop/1">load more</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import {computed, onMounted} from 'vue';
import Details from "../components/Details";
import Filter from "../components/Filter";
import Products from "../components/Products";
import Hero from "../components/Hero";
import { useStore } from 'vuex';
export default {
  name: 'Home',
  setup(){
    const store = useStore();
    const products = computed( () => store.getters.getProducts.filter((p, index) => index < 8));

    onMounted(() => {
      store.dispatch('fetchProducts', {page: 1});
    })

    return {
      Details,
      Hero,
      Filter,
      Products,
      products
    }
  }
}
</script>

<style>
  .product-overview h3 {
    font-size: 36px;
    line-height: 1.1;
    text-transform: uppercase;
    margin-bottom: 0;
    padding-bottom: 10px;
    font-weight: bold;
  }

  .more-btn {
    padding-top: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .more-btn a{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 23px;
    font-weight: 500;
    background-color: #e6e6e6;
    min-width: 179px;
    height: 46px;
    font-size: 15px;
    line-height: 1.466667;
    text-transform: uppercase;
    color: #222;
    padding: 0 15px;
    cursor: pointer;
  }
</style>
