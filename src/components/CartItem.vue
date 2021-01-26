<template>
  <tr class="table_row">
    <td class="column-0">
      <font-awesome-icon :icon="faTimes" @click="removeFromCart" />
    </td>
    <td class="column-1">
      <div class="how-itemcart1">
        <img :src="productImage" alt="IMG" />
      </div>
    </td>
    <td class="column-2">{{ productName }}</td>
    <td class="column-3">{{ format(productPrice) }}</td>
    <td class="column-4">
      <div class="wrap-num-product">
        <div class="btn-num-product-down" @click="decreaseQty">
          <font-awesome-icon :icon="faMinus" />
        </div>

        <input
          class="num-product"
          type="number"
          name="num-product1"
          :value="productQty"
        />

        <div class="btn-num-product-up" @click="increaseQty">
          <font-awesome-icon :icon="faPlus" />
        </div>
      </div>
    </td>
    <td class="column-5">{{ format(productQty * productPrice) }}</td>
  </tr>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import currencyFormater from '../currencyFormat';

export default {
  props: {
    productName: String,
    productPrice: Number,
    productImage: String,
    productId: Number,
    productQty: Number,
  },
  setup(props) {
    const store = useStore();
    const { format } = currencyFormater();

    function increaseQty() {
      store.commit('increaseQty', { productId: props.productId });
    }

    function decreaseQty() {
      store.commit('decreaseQty', { productId: props.productId });
    }

    function removeFromCart() {
      store.commit('removeFromCart', { productId: props.productId });
    }

    return {
      FontAwesomeIcon,
      faTimes,
      faPlus,
      faMinus,
      format,
      increaseQty,
      decreaseQty,
      removeFromCart,
    };
  },
};
</script>

<style></style>
