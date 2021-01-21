<template>
  <section class="section details">
    <div class="details-center container">
      <Detail :bannerImg="banner01" type="Women's"/>
      <Detail :bannerImg="banner02" type="Men's"/>
      <Detail :bannerImg="banner03" type="Kid's"/>
    </div>
  </section>
  
</template>

<script>
import Detail from "./Detail";
import banner01 from '@/assets/banner-01.jpg';
import banner02 from '@/assets/banner-02.jpg';
import banner03 from '@/assets/banner-03.jpg';

export default {
  name: 'Details',
  setup(){
    return {
      Detail,
      banner01,
      banner02,
      banner03
    }
  }
}
</script>

<style>
  .section.details {
    padding: 10rem 0 5rem 0;
  }

  .details-center {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr)) ;
    gap: 3rem;  
  }

  .detail-box {
    position: relative;
    border: 1px solid #e6e6e6;
    color: #fff;
    border-radius: 0;
    height: 20rem;
    padding: 1.6rem;
    overflow: hidden;
    z-index: 1;
    border-bottom-right-radius: 1.6rem;
  }

  .detail-box img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .detail-box .content {
    color: black;
  }

  .detail-box .content h2 {
    text-shadow: 1px 4px 0px #fc7c7c46;
    color: #243a6f;
    font-weight: 700;
    font-size: 3rem;
    line-height: 1.1;
    line-height: 1.2;
    margin-bottom: 1rem;;
  } 

  .overlay {
    background-color: rgba(37,59,112,0.6);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }

  .detail-box:hover .overlay {
    display: block;
  }

  .overlay a {
    margin: 1.6rem;
    position: absolute;
    bottom: 0;
    font-size: 15px;
    line-height: 1.466667;
    text-transform: uppercase; 
    font-weight: 700;
    color: #fff;
    border-bottom: 2px solid #fff;
  }
</style>