<template>
  <main>
    <section class="order container">
      <h1>Orders</h1>
      <div class="wrap-table-shopping-order" v-if="orders.length">
        <table class="table-shopping-order">
          <thead>
            <tr class="table_head">
              <th class="column-0">ID</th>
              <th class="column-1">USER</th>
              <th class="column-2">DATE</th>
              <th class="column-3">TOTAL</th>
              <th class="column-4">PAID</th>
              <th class="column-5">DELIVERED</th>
              <th class="column-6">ACTION</th>
            </tr>
          </thead>
          <tbody v-if="orders.length">
          <tr v-for="order in orders" :key="order.id" class="table_row">
            <td class="column-0">{{ order.id }}</td>
            <td class="column-1">{{ order.owner.firstName }} {{ order.owner.lastName }}</td>
            <td class="column-2">{{ order.createdAt }}</td>
            <td class="column-3">{{ order.totalPrice }}</td>
            <td class="column-4">{{ order.isPaid }}</td>
            <td class="column-5">{{ order.isDelivered }}</td>
            <td class="column-6">
              <router-link :to="`/orders/${order.id}`" class="btn-1">Details</router-link>
              <button class="btn-2">Delete</button>
            </td>
          </tr>          
        </tbody>
      </table>
    </div>
    <EmptyPage heading="You have placed no orders yet!" text="All your orders will be saved here for you to access their state anytime." v-else>
      <router-link to="/shop">Continue Shopping</router-link>
    </EmptyPage>
  </section>
  </main>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import EmptyPage from '@/components/Error/EmptyPage'
export default {

  setup(){
    const store = useStore();
    const data = reactive({
      orders: computed(() => store.getters.getOrders)
    })

    onMounted(() => {
      store.dispatch('fetchOrders');
    })

    return {
      ...toRefs(data),
      EmptyPage,
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

  .order h1 {
    margin: 30px 0;
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

</style>

