<template>
  <div class="rating" @mouseover="hoverRating" @mouseleave="removeRating">
    <div class="inner-rating">
      <font-awesome-icon class="icon" :icon="faEmptyStar" data-star="1" />
      <font-awesome-icon class="icon" :icon="faEmptyStar" data-star="2" />
      <font-awesome-icon class="icon" :icon="faEmptyStar" data-star="3" />
      <font-awesome-icon class="icon" :icon="faEmptyStar" data-star="4" />
      <font-awesome-icon class="icon" :icon="faEmptyStar" data-star="5" />
    </div>
    <div class="outer-rating" ref="star" :style="{ width: rating }">
      <font-awesome-icon
        class="icon"
        :icon="faStar"
        @click="selectRating(1)"
        data-star="1"
      />
      <font-awesome-icon
        class="icon"
        :icon="faStar"
        @click="selectRating(2)"
        data-star="2"
      />
      <font-awesome-icon
        class="icon"
        :icon="faStar"
        @click="selectRating(3)"
        data-star="3"
      />
      <font-awesome-icon
        class="icon"
        :icon="faStar"
        @click="selectRating(4)"
        data-star="4"
      />
      <font-awesome-icon
        class="icon"
        :icon="faStar"
        @click="selectRating(5)"
        data-star="5"
      />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons';
import { computed, reactive, toRefs } from 'vue';

export default {
  // eslint-disable-next-line no-unused-vars
  setup(props, { emit }) {
    const data = reactive({
      starValue: 0,
      hoverValue: 0,
      star: null,
      rating: computed(() => {
        const starPercentage = ((data.hoverValue || data.starValue) / 5) * 100;
        const starPercentageRounded = `${Math.round(
          (starPercentage / 10) * 10
        )}%`;
        return starPercentageRounded;
      }),
    });

    function hoverRating(e) {
      if (e.target.getAttribute('data-star')) {
        data.hoverValue = parseInt(e.target.getAttribute('data-star'));
      }
    }

    function selectRating(rating) {
      data.starValue = rating;
      emit('setRating', rating);
    }

    function removeRating() {
      data.hoverValue = 0;
    }

    return {
      ...toRefs(data),
      FontAwesomeIcon,
      faStar,
      faEmptyStar,
      hoverRating,
      selectRating,
      removeRating,
    };
  },
};
</script>

<style scoped>
.rating {
  color: #fc7c7c;
  position: relative;
  text-align: left;
  margin-left: 15px;
  width: fit-content;
}

.outer-rating,
.inner-rating {
  display: inline-block;
}

.outer-rating {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  white-space: nowrap;
  overflow: hidden;
}

.icon {
  margin: 0 2px;
  font-size: 15px;
}
</style>
