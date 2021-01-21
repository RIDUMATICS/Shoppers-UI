<template>
  <div>
    <ul class="filter-top-group">
      <div>
        <li><button @click.prevent="handleForClick('all')" >All</button></li>
        <li><button @click.prevent="handleForClick('women')" >Women</button></li>
        <li><button @click.prevent="handleForClick('men')" >Men</button></li>
        <li><button @click.prevent="handleForClick('kids')" >Kids</button></li>   
      </div>
      <div>
        <li><button @click="handleCategoryClick('clothing')">Clothing</button></li>
        <li><button @click="handleCategoryClick('bags')">Bags</button></li>
        <li><button @click="handleCategoryClick('shoes')">Shoes</button></li>
        <li><button @click="handleCategoryClick('accessories')">Accessories</button></li>
      </div>
    </ul>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'Filter',
  setup(){
    const router = useRouter();
    const route = useRoute();

    function handleForClick(productFor){
      if( productFor === 'all' ) 
        router.push({ name:'shop', params: { page: 1 }});
      else if(productFor === 'women' || productFor === 'men' || productFor === 'kids' )
        router.push({ name: 'shop', params: { page: 1 }, query: Object.assign({}, route.query, { for: productFor }) });
    }

    function handleCategoryClick(category) {
      router.push({ name: 'shop', params: { page: 1}, query: { ...route.query, category}})
    }

    return {
      handleForClick,
      handleCategoryClick,
    }
  }
}
</script>

<style>
  ul.filter-top-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
  }
  ul.filter-top-group li {
    display: inline;
    margin-top: 5px;
    margin-right: 12px;
    margin-bottom: 5px;
  }

  ul.filter-top-group li button{
    font-size: 15px;
    line-height: 1.2;
    font-weight: 500;
    border: none;
    outline: none;
    cursor: pointer;
    color: rgb(102, 102, 102);
    background-color: transparent;
  }

  @media only screen and (max-width: 650px) {
    .filter-top-group {
      display: grid !important;
      grid-template-columns: 1fr;
      gap:  10px;
      text-align: center;
    }
  }
</style>