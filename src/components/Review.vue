<template>
    <section class="container review-box">
      <div class="review" v-for="review in reviews" :key="review.id">
        <div>
          <div class="details">
            <p>{{ review.name}}</p>
            <Ratings :starValue="review.rating"/>
          </div>
          <div class="comment">{{ review.comment }}</div>
        </div>
      </div>

      <form @submit.prevent="submitReview" v-if="user">
        <h2>Add a review</h2>
        <label id="range">Your Rating 
          <RatingsInput @setRating="setRating"/>
        </label>
        <label >Your Review</label>
        <textarea rows="6" v-model="comment" required></textarea>
        <Button :isLoading="isLoading" theme="blue">submit review</Button>
      </form>
    </section>
</template>

<script>
import { computed, reactive, toRefs } from 'vue';
import Ratings from './Ratings.vue'
import RatingsInput from './RatingsInput';
import Button from './Button';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {
  props: {
    reviews: Array
  },
  setup(){
    const data = reactive({
      ratingValue: 0,
      comment: '',
      user: computed(() => store.getters.getUser),
      isLoading: false
    })
    const route = useRoute();
    const store = useStore();

    function setRating(value) {
      data.ratingValue = value;
    }

    async function submitReview() {
      try {
        if(data.ratingValue < 1 || data.comment === '' ){
          store.commit('popupAlert', {head: 'Unable to submit', body: 'Rating or comment is empty', status: 'error'})
        }
        else {
          data.isLoading = true;
          const { productId } = route.params;
          await store.dispatch('addProductReview', { 
            productId,
            rating: data.ratingValue,
            comment: data.comment
          })
          data.isLoading = false;
          store.commit('popupAlert', { head: 'Review submitted', body: '', status: 'success' })
        }
      } catch (error) {
        data.isLoading = false;
        store.commit('popupAlert', {head: 'Unable to submit', body: error.message, status: 'error'})
      }

      data.ratingValue = 0;
      data.comment = '';
      
    }

    return {
      ...toRefs(data),
      Ratings,
      Button,
      RatingsInput,
      setRating,
      submitReview
    }
  }

}
</script>

<style>
  .hoverRating .star {
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    font-size: 1.5em;
    padding: 0 0.15em;
    
  }

  .review-box {
    border: 1px solid #e6e6e6;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin: 20px auto;
  }

  .review-box form {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 30px 0 ;
  }

  .review-box form label {
    display: flex;
    align-items: center;
  }

  .review-box form label input {
    margin: 0 10px;
  }

  .review-box form label, .review-box form textarea, .review-box button{
    margin: 20px 0 0;
  }

  .review-box form textarea {
    margin-top: 10px;
    padding: 10px;
    font-family: inherit;
    box-sizing: border-box;
    width: calc(100% - 20px);
  }

  .review-box .review{
    width: 100%;
  }

  .review > div {
    width: 50%;
    margin: 15px auto;
  }


  .review-box .review .details {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 20px 0
  }

  .review-box .review .details p {
    font-weight: 700;
  }

  .review-box .review .details .rating {
    color: #fc7c7c;
  }

  @media only screen and (max-width: 650px) {
    .review > div, .review-box form {
      width: 100%;
    }
  }
</style>