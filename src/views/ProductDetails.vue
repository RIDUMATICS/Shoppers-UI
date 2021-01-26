<template>
  <main v-if="product.name">
    <section class="section product-detail">
      <div class="details container-md">
        <div class="left">
          <div class="main">
            <img :src="product.image" alt="" />
            <div class="discount" v-if="dicount > 0">
              {{ product.discount }}%
            </div>
          </div>
        </div>
        <div class="right container">
          <h1>{{ product.name }}</h1>
          <div class="price" v-show="product.discount">
            {{
              format(product.price - (product.price * product.discount) / 100)
            }}
          </div>
          <h4 class="price" :class="{ disable: product.discount }">
            {{ format(product.price) }}
          </h4>
          <br />
          <Ratings :starValue="product.rating" />
          <p class="reviews-count">
            ({{ product.reviews.length }} Costumer reviews)
          </p>
          <div class="product-desc">
            <h3>Product Description</h3>
            <p>{{ product.description }}</p>
          </div>
          <form class="form" v-if="product.countInStock > 0">
            Quantity
            <div class="product-qty">
              <div class="inc-product-qty" @click="decreaseQty">
                <font-awesome-icon :icon="faMinus" />
              </div>
              <input
                class="product-qty-input"
                type="number"
                :value="qty"
                min="1"
                max="5"
              />
              <div class="dec-product-qty" @click="increaseQty">
                <font-awesome-icon :icon="faPlus" />
              </div>
            </div>
            <button class="btn" @click.prevent="addToCartHandler">
              Add To Cart
            </button>
          </form>
          <p v-else class="sold-out">OUT OF STOCK</p>
        </div>
      </div>
    </section>
    <Review :reviews="product.reviews" />
  </main>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import Ratings from '@/components/Ratings.vue';
import currencyFormat from '../currencyFormat';
import Review from '../components/Review.vue';
export default {
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const { format } = currencyFormat();
    let data = reactive({
      product: computed(() => store.getters.getProductDetails),
      qty: 1,
    });

    function decreaseQty() {
      if (data.qty - 1 >= 1) {
        data.qty -= 1;
      }
    }

    function increaseQty() {
      if (data.qty + 1 <= data.product.countInStock) {
        data.qty += 1;
      }
    }

    function addToCartHandler() {
      store.commit('addToCart', {
        product: data.product.id,
        name: data.product.name,
        image: data.product.image,
        price:
          data.product.price -
          (data.product.price * data.product.discount) / 100,
        countInStock: data.product.countInStock,
        discount: data.product.discount,
        qty: data.qty,
      });
    }

    onMounted(async () => {
      try {
        store.commit('showLoading');
        await store.dispatch('fetchProductById', {
          productId: props.productId,
        });
      } catch (error) {
        console.log(error);
      }
      store.commit('closeLoading');
    });

    return {
      ...toRefs(data),
      Ratings,
      format,
      FontAwesomeIcon,
      faMinus,
      faPlus,
      addToCartHandler,
      Review,
      increaseQty,
      decreaseQty,
    };
  },
};
</script>

<style>
main {
  margin-top: 25px;
  margin-bottom: 150px;
}

.product-detail .details {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 7rem;
}

.product-detail .left {
  display: flex;
  flex-direction: column;
}

.product-detail .left .main {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  height: 45rem;
}

.product-detail .left .main .discount {
  display: inline-block;
  padding: 15px;
  background-color: #fc7c7c;
  color: #fff;
  position: absolute;
  right: 0;
  top: 0;
}

.product-detail .left .main img {
  object-fit: cover;
  object-position: top;
  height: 100%;
  width: 100%;
}

.product-detail .right {
  padding: 20px 0;
}

.product-detail .right span {
  display: inline-block;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.product-detail .right h1 {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 5px;
}

.product-detail .right .price {
  display: inline-block;
  font-size: 600;
  font-size: 2rem;
  color: #ff7c9c;
  margin-bottom: 5px;
  margin-right: 15px;
}

.product-detail .right .price.disable {
  color: #757575;
  font-size: 1.5rem;
  text-decoration: line-through;
}

div.product-qty {
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  height: 45px;
  width: 150px;
  display: grid !important;
  grid-template-columns: auto 1fr auto;
}

.inc-product-qty,
.dec-product-qty {
  width: 45px;
  height: 100%;
  cursor: pointer;
  margin: 0;
  padding: 0;
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.product-qty-input {
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  font-size: 17px;
  font-weight: 600;
  color: #666;
  height: 100%;
  width: 100%;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  background-color: #f7f7f7;
}

.wrap-num-product {
  display: inline-block;
  justify-content: center;
  align-items: flex-start;
  width: 200px;
  height: 45px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
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
  width: calc(90% - 90px);
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

.product-detail .right div {
  display: inline-block;
  z-index: 1;
}

.product-detail .right .reviews-count {
  display: inline-block;
  margin-left: 5px;
}

.product-detail .right .product-desc {
  margin: 40px 0;
  width: 90%;
}

.product-detail .right .sold-out {
  font-size: 3rem;
  color: #bd362f;
  border: 1px solid #bd362f;
  display: inline-block;
  padding: 10px;
}

.product-detail form {
  margin-bottom: 2rem;
}

.product-detail form span {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  font-size: 2rem;
  z-index: 0;
}

.product-detail .form {
  margin-bottom: 3rem;
}

.product-detail .form input {
  padding: 0.5rem 0;
  text-align: center;
  margin-right: 2rem;
}

.product-detail .form .addCart {
  background: #fc7c7c;
  padding: 1rem 4rem;
  color: #fff;
  border-radius: 3rem;
}

.product-detail h3 {
  text-transform: uppercase;
  margin-bottom: 2rem;
}

@media only screen and (max-width: 996px) {
  .product-detail .left {
    width: 30rem;
    height: 45rem;
  }

  .product-detail .details {
    gap: 3rem;
  }

  .product-detail .thumbnails {
    width: 30rem;
    gap: 0.5rem;
  }

  .product-detail .thumbnail {
    width: auto;
    height: 10rem;
    background-color: #f6f2f1;
    text-align: center;
    padding: 0.5rem;
  }
}

@media only screen and (max-width: 650px) {
  .review > div,
  .review .form {
    width: 100%;
  }

  .product-detail .details {
    grid-template-columns: 1fr;
  }

  .product-detail .right {
    padding: 0 15px;
  }

  .product-detail .left {
    width: 100%;
    height: 45rem;
  }

  .product-detail .details {
    gap: 3rem;
  }

  .product-detail .thumbnails {
    width: 100%;
    gap: 0.5rem;
  }
}
</style>
