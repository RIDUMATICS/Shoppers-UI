<template>
  <div class="product">
    <div class="product-header">
      <img :src="productImg" />
      <ul class="icons">
        <span @click="addToCartHandler" v-show="productCount > 0"
          ><font-awesome-icon :icon="faShoppingBag"
        /></span>
        <router-link :to="{ name: 'details', params: { productId } }"
          ><span><font-awesome-icon :icon="faExpand"/></span
        ></router-link>
      </ul>
      <span class="discount" v-show="productDiscount"
        >{{ productDiscount }}%</span
      >
      <div class="soldOut" v-show="productCount < 1">SOLD OUT</div>
    </div>
    <div class="product-footer">
      <a href="#">
        <p>{{ productName }}</p>
      </a>
      <Ratings :starValue="productRating" />
      <h4 class="price" v-show="productDiscount">
        {{ format(productPrice - (productPrice * productDiscount) / 100) }}
      </h4>
      <h4 class="price" :class="{ disable: productDiscount }">
        {{ format(productPrice) }}
      </h4>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHeart,
  faShoppingBag,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import currencyFormater from '../currencyFormat';
import Ratings from '../components/Ratings';

export default {
  props: {
    productId: Number,
    productImg: String,
    productName: String,
    productPrice: Number,
    productRating: Number,
    productDiscount: Number,
    productCount: Number,
  },
  setup(props) {
    const store = useStore();
    const { format } = currencyFormater();
    function addToCartHandler() {
      store.commit('addToCart', {
        product: props.productId,
        name: props.productName,
        image: props.productImg,
        price: props.productPrice,
        countInStock: props.productCount,
        discount: props.productDiscount,
        qty: 1,
      });
    }
    return {
      addToCartHandler,
      FontAwesomeIcon,
      faHeart,
      faShoppingBag,
      faExpand,
      Ratings,
      format,
    };
  },
};
</script>

<style>
.product {
  background-color: #fff;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  text-align: center;
  transition: all 300ms ease-in-out;
  overflow: hidden;
}

.product:hover {
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.25);
}

.product-header {
  position: relative;
  background-color: #f6f2f1;
  height: 35rem;
  transition: all 300ms ease-in-out;
  z-index: 0;
}

.product-header img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: top;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
}

.product-header .discount {
  display: inline-block;
  padding: 15px;
  background-color: #fc7c7c;
  color: #fff;
  position: absolute;
  right: 0;
  top: 0;
}

.product-footer {
  padding: 2rem 1.6rem 1.6rem 1.6rem;
}

.product-header .soldOut {
  background-color: rgba(189, 54, 47, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 4rem;
  font-weight: 600;
  padding: 20px;
}

.product-footer h3 {
  font-size: 2.2rem;
}

.product-footer p {
  margin: 0;
  font-size: 1.9rem;
}

.product-footer .price {
  color: #ff7c9c;
  font-size: 2rem;
  margin: 0;
}

.product-footer .price.disable {
  color: #eee;
  font-size: 2rem;
  text-decoration: line-through;
  margin: 0;
}

.product:hover .product-header::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 1rem 1rem 0 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  transition: all 500ms ease-in-out;
}

.product-header .icons {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translate(0, -50%) scale(0);
  z-index: 2;
  opacity: 0;
  transition: all 500ms ease-in-out;
}

.product-header .icons span {
  background-color: #fff;
  font-size: 2.5rem;
  display: block;
  border-radius: 50%;
  padding: 1.5rem 1.6rem;
  line-height: 2rem;
  cursor: pointer;
  transition: all 300ms ease-in-out;
}
.product-header .icons span i {
  transition: all 500ms ease-in-out;
}

.product-header .icons span:not(:last-child) {
  margin-bottom: 1rem;
}

.product-header .icons span:hover {
  background: #ff7c9c;
  color: #fff;
}

.product:hover .icons {
  opacity: 1;
  transform: translate(0, -50%) scale(1);
}
</style>
