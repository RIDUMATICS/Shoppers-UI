<template>
  <div class="detail-box">
    <div class="content">
      <h2>
        {{ type }} <br/> Fashion
      </h2>
      <h4>World Best Brands</h4>
    </div>
    <img :src="bannerImg" />
    <div class="overlay">
      <a>SHOP NOW</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    type: String,
    bannerImg: String
  }
}
</script>

<style>

</style>