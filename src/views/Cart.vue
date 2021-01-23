<template>
 <main>
   <section class="cart container" v-if="carts.length">
     <div class="wrap-table-shopping-cart">
        <table class="table-shopping-cart">
          <tbody><tr class="table_head">
            <th class="column-0"></th>
            <th class="column-1">Product</th>
            <th class="column-2"></th>
            <th class="column-3">Price</th>
            <th class="column-4">Quantity</th>
            <th class="column-5">Total</th>
          </tr>

 
          <CartItem v-for="cart in carts" :key="cart.product" :productId="cart.product" :productName="cart.name" :productImage="cart.image" :productPrice="cart.price" :productQty='cart.qty' />
          
        </tbody>
      </table>
     </div>
     <div class="sidebar">
       <form @submit.prevent="submitOrder">
					<div>
						<h4>
							Cart Totals
						</h4>

						<div class="detail p-b-13">
							<div>
								<span>
									Subtotal:
								</span>
							</div>

							<div class="t-r">
								<span>
									{{ format(subtotal) }}
								</span>
							</div>
						</div>

            <div class="detail p-t-15 p-b-13">
							<div>
								<span>
									Shipping Fee:
								</span>
							</div>

							<div class="t-r">
								<span>
									{{ format(shippingPrice) }}
								</span>
							</div>
						</div>

						<div class="shipping-detail p-t-15 p-b-30">
							<div>
								<div style="display: grid ; grid-template-column: 1fr">
									<span class="stext-112">
										Calculate Shipping
									</span>

									<div class="input-box">
										<select name="state" v-model="state" required>
											<option disabled value="">Select a state...</option>
											<option v-for="state in states" :key="state" :value="state">{{ state }}</option>
										</select>
									</div>

                  <div class="input-box">
										<input required type="text" name="address" placeholder="Address" v-model="address">
									</div>

									<div class="input-box">
										<select name="city" v-model="city" required>
											<option disabled value="">Select a city...</option>
											<option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
										</select>
									</div>

									<div class="input-box">
										<input required type="text" name="postalcode" placeholder="Postal Code / Zip" v-model="postalCode">
									</div>										
								</div>
							</div>
						</div>

						<div class="detail p-t-15 p-b-13">
							<div>
								<span>
									Total:
								</span>
							</div>

							<div class="t-r">
								<span>
									{{ format( shippingPrice + subtotal) }}
								</span>
							</div>
						</div>
            <Button
              theme="blue-rev"
              :isLoading="isLoading"
              :style="{
                'font-size': '1.2rem',
                'margin-top': '30px',
                'border-radius': '5px',
                padding: '15px',
                width: '100%',
              }">Proceed to Checkout</Button>
					</div>
       </form>   
			</div>
   </section>
   <EmptyPage heading="Your cart is empty!" text="Browse our products and discover our best deals!" v-else>
      <router-link to="/shop/1">start shopping</router-link>
    </EmptyPage>
 </main>
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive, toRefs, watch } from 'vue';
import CartItem from '@/components/CartItem';
import EmptyPage from '@/components/Error/EmptyPage';
import currencyFormater from  '../currencyFormat';
import { getCities, states } from '../service/states'; //shows list of states in nigeria and cities in that state
import { useRouter } from 'vue-router';
import Button from '@/components/Button';

export default {
  
  setup(){
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      carts: computed( () => store.getters.getCarts ),
      subtotal: computed( () => store.getters.getSubTotal ),
      state: '',
      address: '',
      city: '',
      cities: computed(() => getCities(data.state)),
      postalCode: '',
      shippingPrice: 0,
      isLoading: false
    })

    watch(() => data.city, (value) => {
      if(value === '') {
        data.shippingPrice = 0
      } else { 
        // maximum shipping price is 10000
        // minimum shipping price is 2000
        // radom gen btw 2000 - 10000
        data.shippingPrice = 2000 + Math.floor(Math.random() * 8000);
      }
    });

    watch(() => data.state, () => {
      //reset selected city
      data.city = '';
    })

    const { format } = currencyFormater();

    async function submitOrder () {
      try {
        // if cart is empty
        if(data.carts.length < 1)
          store.commit('popupAlert', { head: 'Unable to submit order', body: 'cart is empty', status: 'error'})
        else if( !(data.state && data.city && data.address && data.postalCode) ) {
          store.commit('popupAlert', { head: 'Unable to submit order', body: 'Please fill shipping address', status: 'error'})
        }
        else {
          data.isLoading = true
          const newOrder = {
            shipping: {
              address: data.address,
              city: data.city,
              postalCode: data.postalCode,
              state: data.state
            },
            orderItems: data.carts,
            itemsPrice: data.subtotal,
            shippingPrice: data.shippingPrice,
            totalPrice: data.shippingPrice + data.subtotal
          }
          const { data: { order }} = await store.dispatch('submitOrder', newOrder);
      
          store.commit('popupAlert', { head: 'Thank you', body: 'Your order has been received.', status: 'success'});
          store.commit('clearCart');
          data.isLoading = false;
          router.push(`/orders/${order.id}`);
        }
      } catch (error) {
        data.isLoading = false;
        console.log(error);
      }
    }

    return {
      ...toRefs(data),
      CartItem,
      format,
      states: states(), //list of states in nigeria
      submitOrder,
      Button,
      EmptyPage
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

  .cart {
    display: grid;
    grid-template-columns: 8fr 5fr;
  }

  .wrap-table-shopping-cart {
    height: fit-content;
    text-align: center;
    overflow: auto;
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
  }

  .table-shopping-cart {
    border-collapse: collapse;
    width: 100%;
    min-width: 680px;
  }

  .table-shopping-cart tr {
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }

.table-shopping-cart .column-1 {
  width: 133px;
  padding-left: 50px;
}

.table-shopping-cart img {
  width: 70%;
  height: 70%;
}

.table-shopping-cart .column-2 {
  width: 220px;
  font-size: 15px;
}

.table-shopping-cart .column-3 {
  width: 120px;
  font-size: 16px;
}

.table-shopping-cart .column-4 {
  width: 145px;
  text-align: right;
}

.table-shopping-cart .column-5 {
  width: 172px;
  padding-right: 50px;
  text-align: right;
  font-size: 16px;
}

.table-shopping-cart .column-0 {
  display: flex;
  padding-left: 20px;
  padding-top: 30px;
  text-align: right;
  font-size: 16px;
  color: #555;
  cursor: pointer;
}

.table-shopping-cart .column-0:hover {
  color: #fc7c7c;
}
.table-shopping-cart .table_row {
  height: 185px;
}

.table-shopping-cart .table_row td {
  padding-bottom: 20px;
}

.table-shopping-cart .table_row td.column-1 {
  padding-bottom: 30px;
}

.table-shopping-cart .table_head th {
  font-size: 13px;
  color: #555;
  text-transform: uppercase;
  line-height: 1.6;
  padding-top: 15px;
  padding-bottom: 15px;
}

.table-shopping-cart td {
  color: #555;
  line-height: 1.6;
}




.wrap-num-product {
  display: flex;
  width: 140px;
  height: 45px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  overflow: hidden;
}

.btn-num-product-up,
.btn-num-product-down {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 100%;
  cursor: pointer;
}

.num-product {
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  font-size: 17px;
  font-weight: 600;
  color: #666;
  width: calc(100% - 90px);
  height: 100%;
  text-align: center;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  background-color: #f7f7f7;
}

input.num-product {
  -moz-appearance: textfield;
  appearance: none;
  -webkit-appearance: none;
}

.sidebar {
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  margin-left: 63px;
  padding: 30px 40px 40px;
  height: fit-content;
}

.sidebar h4 {
  font-weight: 700;
  font-size: 20px;
  line-height: 1.3;
  text-transform: uppercase;
  color: #333;
  padding-bottom: 30px;
  margin: 0;
}

.shipping-detail, .detail {
  border-bottom: 1px dashed #d9d9d9;
}
.sidebar .detail {
  display: grid;
  grid-template-columns: auto 1fr ;
  gap: 10px;
}

.sidebar .detail:last-of-type {
  border-bottom: none;
}

.p-b-13 {
  padding-bottom: 13px !important;
}

.p-b-30 {
  padding-bottom: 30px !important;
}

.p-t-15 {
  padding-top: 15px !important;
}

.t-r {
  text-align: right;
}

.stext-112 {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.6923;
  text-transform: uppercase;
  padding-bottom: 10px;
}

.sidebar .detail div {
  box-sizing: border-box;
}

.sidebar .detail p {
  margin: 0;
  padding: 0;
  padding-top: 2;
  font-size: 13px;
  line-height: 1.6923;
  color: #888;
}

.input-box {
  width: 100%;
  border-radius: 2px;
  background-color: #fff;
  margin: 0;
  padding: 0;
  margin-bottom: 12px;
}


.input-box select {
  width: 100%;
  height: 40px;
  padding: 0 15px;
  border: 1px solid rgb(118, 118, 118);
  border-radius: 2px;
  background-color: #fff;
  
}

.input-box input {
  width: 100%;
  height: 40px;
  padding: 0 15px;
  box-sizing: border-box;
}



@media only screen and (max-width: 1200px ) {
  .cart {
    grid-template-columns: 1fr;
  }

  .sidebar {
    margin: 0;
    margin-top: 50px;
  }
}

</style>