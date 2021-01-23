<template>
  <main>
    <section class="order container">
      <div class="table-header">
        <h1>Products</h1>
        <router-link to="/admin/create-product">Create Product</router-link>
      </div>
      <div class="wrap-table-shopping-order" v-if="products.length">
        <table class="table-shopping-order">
          <tbody>
            <tr class="table_head">
              <th class="column-0">ID</th>
              <th class="column-1">NAME</th>
              <th class="column-3">CATEGORY</th>
              <th class="column-2">PRICE</th>
              <th class="column-4">DISCOUNT</th>
              <th class="column-5">ACTION</th>
          </tr>
          <tr v-for="product in products" :key="product.id" class="table_row">
            <td class="column-0">{{ product.id }}</td>
            <td class="column-1">{{ product.name }}</td>
            <td class="column-2">{{ product.category }}</td>
            <td class="column-3">{{ product.price }}</td>
            <td class="column-4">{{ product.discount }}%</td>
            <td class="column-5">
              <router-link class="btn-1" :to="{ name: 'editProduct', params: { productId: product.id }}">Edit</router-link>
              <button class="btn-2" @click="deleteProduct(product.id)">Delete</button>
            </td>
          </tr>        
        </tbody>
      </table>
    </div>
    <EmptyPage heading="Empty Product" text="unfortunately nothing could be found" v-else>
      <router-link to="/">Back Home</router-link>
    </EmptyPage>
    <Pagination v-show="pageCount > 1"/>
  </section>
  </main>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex'
import EmptyPage from '@/components/Error/EmptyPage'
import Pagination from '@/components/Pagination'
export default {
  setup(){
    const store = useStore();

    const event = reactive({
      products: computed(() => store.getters.getProducts),
      pageCount: computed(() => useStore().state.product.totalPages),
    })

    onMounted(async() => {
      store.commit('showLoading');
      await store.dispatch('fetchProducts', {})
      store.commit('closeLoading');
    })

    async function deleteProduct(productId) {
      try {
        await store.dispatch('deleteProduct', productId)
        store.commit('popupAlert', {head: 'Product Deleted', body: '', status: 'success'})
      } catch (error) {
        console.log(error)
      }
    }
    
    return {
      ...toRefs(event),
      EmptyPage,
      Pagination,
      deleteProduct
    }
  }
}
</script>

<style>
   main{
    margin-top: 25px;
    margin-bottom: 150px;
    min-height: calc(100vh - 150px);
  }

  main h1 {
    font-size: 36px;
    line-height: 1.1;
    text-transform: uppercase;
    font-weight: 600;
  }

  .wrap-table-shopping-order {
    height: fit-content;
    text-align: left;
    overflow: auto;
  }

  .table-header {
    display: flex;
    align-items: center;
    margin: 30px 0;
    justify-content: space-between;
  }

  .table-header a{
    display: inline-block;
    padding: 10px 20px;
    background-color: #fc7c7c;
    color:#fff;
    font-weight: 500;
    font-size: 1.5rem;
    border-radius: 15px;
  }

  .table-shopping-order {
    border-collapse: collapse;
    width: 100%;
    min-width: 680px;
  }

  .table-shopping-order td, .table-shopping-order th {
    box-sizing: border-box;
  }

  .table-shopping-order td {
    padding: 20px 10px;
    color: #000;
    border: 2px solid #fff;
    white-space: nowrap;
  }

  .table_row:nth-child(2n) {
    background-color: #eee;
  }

  @media only screen and (max-width: 768px) {
    .table-header {
      flex-direction: column;
    }

  }

</style>

