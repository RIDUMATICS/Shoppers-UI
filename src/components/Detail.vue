<template>
  <div class="detail-box">
    <div class="content">
      <h2>
        {{ type }} <br />
        Fashion
      </h2>
      <h4>World Best Brands</h4>
    </div>
    <img :src="bannerImg" />
    <div class="overlay">
      <router-link :to="link">SHOP NOW</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    type: String,
    bannerImg: String,
    link: String,
  },
};
</script>

<style></style>
