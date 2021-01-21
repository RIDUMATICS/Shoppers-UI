<template>
  <div class="rating">
    <div class="inner-rating">
      <font-awesome-icon :icon="faEmptyStar" />
      <font-awesome-icon :icon="faEmptyStar" />
      <font-awesome-icon :icon="faEmptyStar" />
      <font-awesome-icon :icon="faEmptyStar" />
      <font-awesome-icon :icon="faEmptyStar" />
    </div>
    <div class="outer-rating" ref="star">
        <font-awesome-icon :icon="faStar" />
        <font-awesome-icon :icon="faStar" />
        <font-awesome-icon :icon="faStar" />
        <font-awesome-icon :icon="faStar" />
        <font-awesome-icon :icon="faStar" />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faEmptyStar  } from '@fortawesome/free-regular-svg-icons';
import { onMounted, ref } from 'vue';

export default {
  props: {
    maxStar: {
      type: Number,
      required: false,
      default: 5
    },
    starValue: {
      type: Number,
      required: true
    }
  },

  setup(props){
    const star = ref(null);

    function getRatings(){
      const starPercentage = ( props.starValue / props.maxStar ) * 100;
      const starPercentageRounded = `${Math.round( (starPercentage / 10 ) * 10 )}%`;
      return starPercentageRounded;
    }

    onMounted(() => {
      star.value.style.width = getRatings()
    })

    return {
      FontAwesomeIcon,
      faStar,
      star,
      faEmptyStar
    }
  }
}
</script>

<style>
  .rating {
    color: #43b3d9;
    position: relative;
    text-align: left;
    margin: auto;
    width: fit-content;
  }

  .outer-rating, .inner-rating {
    display: inline-block;
  }

  .outer-rating {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
  }

</style>