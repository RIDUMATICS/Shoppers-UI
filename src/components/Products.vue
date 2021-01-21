<template>
  <div class="product-center">
    <Product v-for="product in products" :productId="product.id" :productCount="product.countInStock" :key="product.id" :productImg="product.image" :productPrice="product.price" :productDiscount="product.discount" :productName="product.name" :productRating="product.rating"/>
  </div>
  <slot></slot>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import Product from "../components/Product";
export default {
  setup(){
    const store = useStore();
    const products = computed( () => store.getters.getProducts);
    
    return {
      Product,
      products ,
    }
  }
}
</script>

<style>
  .product-center {
    display: grid;
    margin-top: 15px;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 7rem 3rem;
  }

  
</style>