<template>
  <main class="container">
    <Filter />
    <Products :products="products"> 
      <Pagination v-show="pageCount > 1"/>
    </Products>
  </main>
</template>

<script>
import Filter from "../components/Filter";
import Products from "../components/Products";
import Pagination from '../components/Pagination'
import { useRoute } from 'vue-router';
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'Shop',

  setup(){
    const store = useStore();
    const route = useRoute();
    
    const products = computed( () => store.getters.getProducts);
    const pageCount = computed(() => useStore().state.product.totalPages);

    async function fetchProducts(input) {
      store.commit('showLoading');
      await store.dispatch('fetchProducts', input);
      store.commit('closeLoading');
    }

    watch(() => route.query.category, (value) => {
      let category = value;

      if (category) category = value.toLowerCase();
      
      fetchProducts({page: 1, productFor: route.query.for, category })
    })

    watch(() => route.query.for, (value) => {
      let productFor;
      if(value === 'all' || !value)
        productFor = '';
      else if ( value.toLowerCase() === 'men' || value.toLowerCase() === 'women' || value.toLowerCase() === 'kids' )
        productFor = value.toLowerCase();
      
      fetchProducts({page: 1, productFor, category: route.query.category })
    })

    watch(() => route.params.page, (page) => {
      const { prfor: productFor, category } = route.query;
      fetchProducts({ page, productFor, category });
    } )
    
    onMounted(async () => {
      const { for: productFor, category } = route.query;
      fetchProducts({ page: route.params.page, productFor, category });
    })

    return {
      Pagination,
      Filter,
      Products,
      products,
      pageCount
    }
  }
}
</script>

<style scoped>
  main{
    margin-top: 25px;
    margin-bottom: 150px;
    min-height: calc(100vh - 150px);
  }
</style>