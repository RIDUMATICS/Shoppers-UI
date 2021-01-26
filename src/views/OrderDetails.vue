<template>
  <main>
    <section class="section-padding container" v-if="order && order.owner">
      <div class="confirmation-title">
        <p>Thank you. Your order has been received.</p>
      </div>
      <div class="confirmation-part">
        <div>
          <div>
            <div class="single-confirmation-details">
              <h4>Order Info</h4>
              <ul>
                <li>
                  <p>Order No</p>
                  <span>: {{ order.orderRef }}</span>
                </li>
                <li>
                  <p>Date</p>
                  <span>: {{ order.createdAt }}</span>
                </li>
                <li>
                  <p>Delivery</p>
                  <span>: {{ order.isDelivered ? '' : 'Not' }} Delivered</span>
                </li>
                <li>
                  <p>Payment</p>
                  <span>: {{ order.isPaid ? '' : 'Not' }} Paid</span>
                </li>
              </ul>
            </div>
            <div class="single-confirmation-details">
              <h4>Shipping Address</h4>
              <ul>
                <li>
                  <p>Street</p>
                  <span>: {{ order.shipping.address }}</span>
                </li>
                <li>
                  <p>City</p>
                  <span>: {{ order.shipping.city }}</span>
                </li>
                <li>
                  <p>State</p>
                  <span>: {{ order.shipping.state }}</span>
                </li>
                <li>
                  <p>Postal code</p>
                  <span>: {{ order.shipping.postalCode }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="single-confirmation-details">
            <h4>Order Summary</h4>
            <ul>
              <li>
                <p>Items</p>
                <span>: {{ format(order.itemsPrice) }}</span>
              </li>
              <li>
                <p>Shipping</p>
                <span>: {{ format(order.shippingPrice) }}</span>
              </li>
              <li class="total-price">
                <p>Total</p>
                <span>: {{ format(order.totalPrice) }}</span>
              </li>
            </ul>
            <flutterwave-pay-button
              v-show="!user.isAdmin && !order.isPaid"
              :tx_ref="order.orderRef"
              :amount="order.totalPrice"
              :customer="{ name: `${order.owner.firstName } ${order.owner.lastName}`,
              email: `${order.owner.email}`, 
              phone_number: `${order.owner.phoneNumber}` }"
              :callback="makePaymentCallback"
            />

            <Button
              theme="blue-rev"
              :isLoading="isLoading"
              @click.prevent="deliverOrder"
              v-show="user.isAdmin && !order.isDelivered"
              :style="{
                width: '100%',
                'margin-top': '15px',
                'text-transform': 'capitalize',
              }"
            >
              Deliver Order
            </Button>
          </div>
        </div>
        <div class="order-details single-confirmation-details">
          <h4>Order Details</h4>
          <table>
            <thead>
              <tr>
                <th colspan="2">Product</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="orderItem in order.orderItems" :key="orderItem.id">
                <td colspan="2">{{ orderItem.product.name }}</td>
                <td>X{{ orderItem.qty > 9 ? '' : '0' }}{{ orderItem.qty }}</td>
                <td>{{ orderItem.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import FlutterwavePayButton from '@/components/FlutterwavePayButton';
import Button from '@/components/Button';
import currencyFormat from '../currencyFormat';
export default {
  setup() {
    const { format } = currencyFormat();
    const store = useStore();
    const route = useRoute();

    const data = reactive({
      order: computed(() => store.getters.getOrderDetails),
      amount: 20000,
      isLoading: false,
      user: computed(() => store.getters.getUser),
    });

    async function makePaymentCallback() {
      try {
        const { orderId } = route.params;
        await store.dispatch('payOrder', orderId);
      } catch (error) {
        console.log(error);
      }
    }

    async function deliverOrder() {
      data.isLoading = true;
      const { orderId } = route.params;
      await store.dispatch('deliverOrder', orderId);
      data.isLoading = false;
    }

    onMounted(async () => {
      try {
        store.commit('showLoading');
        const { orderId } = route.params;
        await store.dispatch('getOrderById', orderId);
        // console.log(data.order.owner.firstName)
      } catch (error) {
        console.log(error);
      }
      store.commit('closeLoading');
    });

    return {
      ...toRefs(data),
      FlutterwavePayButton,
      makePaymentCallback,
      deliverOrder,
      Button,
      format,
    };
  },
};
</script>

<style>
.section-padding {
  padding: 200px 0px;
}

.total-price {
  border-top: 1px solid rgb(33, 37, 41);
  border-bottom: 1px solid rgb(33, 37, 41);
  margin: 10px 0;
  padding: 12px 0;
}

.total-price > p {
  padding: 12px 0;
  font-size: 20px;
  color: #fc7c7c !important;
}

.confirmation-title p {
  text-align: center;
  margin-bottom: 35px;
  color: #fc7c7c;
}

.confirmation-part > div:first-child {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 20px;
}

.confirmation-part .single-confirmation-details {
  background-color: #f7f7f7;
  padding: 35px 40px;
  height: fit-content;
}

.confirmation-part .single-confirmation-details h4 {
  font-size: 20px;
  font-weight: 500;
  color: 'Roboto', sans-serif;
  text-transform: capitalize;
  margin-bottom: 16px;
}

.confirmation-part .single-confirmation-details ul li {
  position: relative;
  text-transform: capitalize;
  margin-bottom: 3px;
  padding-left: 55%;
}

.confirmation-part .single-confirmation-details ul li p {
  position: absolute;
  left: 0;
  top: 0;
  line-height: 21px;
  color: #777;
}

.confirmation-part .single-confirmation-details ul li span {
  color: #000;
}

.order-details {
  margin-top: 50px;
}

.order-details table {
  width: 100%;
  text-align: left;
}

.order-details table th,
.order-details table td {
  text-align: left;
  font-size: 16px;
  padding: 0.75rem;
}

.order-details table thead th {
  border-top: 1px solid rgb(33, 37, 41);
  border-bottom: 1px solid rgb(33, 37, 41);
}

@media only screen and (max-width: 650px) {
  .confirmation-part > div:first-child {
    grid-template-columns: 1fr;
  }

  .confirmation-part .single-confirmation-details ul li {
    padding-left: 0;
  }

  .confirmation-part .single-confirmation-details ul li p {
    position: relative;
    display: inline-block;
  }

  .order-details table {
    overflow: scroll;
  }
}
</style>
