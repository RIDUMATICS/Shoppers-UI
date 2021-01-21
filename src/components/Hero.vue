<template>
 <div class="hero-img"> 
    <div class="hero-content">
      <h2><span class="discount">70%</span> SALE OFF</h2>
      <h1>
        <span>Summer Vibes</span>
        <span>mode on</span>
      </h1>
      <router-link to="/shop/1" class="btn">shop now</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.hero-img {
    height: 100vh !important;
    width: 100% ;
    overflow: hidden;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('../assets/images/slide-01.jpg');
    background-position: center;
    background-size: cover;
    position: relative;
  }

  .hero-content {
    position: absolute;
    top: 40%;
    transform: translate(25%, -50%);
  }

  .hero-content h2 {
    color: #b888ff;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .hero-content .discount {
    color: #fbb419;
  }

  .hero-content h1 span {
    color: #253b70;
    font-size: 6rem;
    font-weight: 700;
    display: block;
    line-height: 1;
    text-shadow: 3px 3px 0 #f1f1f1, 4px 4px 0 #f1f1f1;
  }

  .btn {
    display: inline-block;
    background-color: #fc7c7c;
    padding: 1.2rem 4rem;
    margin-top: 1.2rem;
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
  }

  @media only screen and (max-width: 991px) {
    .hero-content {
      transform: translate(10%, -40%);
    }

    .hero-content h1 {
      margin-top: 0;
    }
  }

   @media only screen and (max-width: 567px) {

    .hero-img {
      height: 100vh !important;
      background-position: 50 0;
    }

    .hero-content {
      transform: translate(2%, -50%);
    }

    .hero-content h2 {
      font-size: 2rem;
    }

    .hero-content h1 span {
      font-size: 5rem;
    }
  }
</style>