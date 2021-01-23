<template>
  <main>
    <h1>{{ pathName == 'createProduct' ? 'Create Product' : 'Edit Product'}}</h1>
    <form>
      <div class="form-group">
        <label for="productName">Name</label>
        <input required id="productName" type="text" v-model="name"/>
      </div>
      <div class="form-group">
        <label for="brand">Brand</label>
        <input required id="brand" type="text" v-model="brand"/>
      </div>
      <div class="form-group" v-show="pathName == 'createProduct'">
        <label for="image">Image</label>
        <input required id="image" type="file" @change="imageUpload" accept="image/*" enctype="multipart/form-data"/>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" min="1" id="price" v-model="price"/>
      </div>
      <div class="form-group">
        <label for="countInStock">Count In Stock</label>
        <input id="countInStock" type="number" min="1" v-model="countInStock"/>
      </div>
      <div class="form-group">
        <label for="discount">Discount</label>
        <input id="discount" type="number" min="0" max="100" v-model="discount"/>
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="category">
          <option value="" disabled>Select a category</option>
          <option value="clothing">Clothing</option>
          <option value="bags">Bags</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>
       <div class="check-box-group">
        <p>For</p>
        <div>
          <div class="check-group"> <input type="checkbox" id="men" value="Men" name="productFor" v-model="checkedProductFors" /> <label for="men">Men</label> </div>
          <div class="check-group"> <input type="checkbox" id="women" value="Women" name="productFor" v-model="checkedProductFors" /> <label for="women">Women</label> </div>
          <div class="check-group"> <input type="checkbox" id="kids" value="Kids" name="productFor" v-model="checkedProductFors" /> <label for="kids">Kids</label> </div>
        </div>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="description" rows="6" v-model="description"></textarea>
      </div>

      <Button
        theme="blue-rev"
        v-if="pathName == 'createProduct'"
        :isLoading="isCreatingProduct"
        @click="createProduct"
        :style="{
          'width': '100%',
          'font-size': '15px',
          'border-radius': '5px',
          'padding': '10px auto',
          'font-weight': '700'
        }"
      >Create Product</Button>
      <Button
        theme="blue-rev"
        @click="updateProduct"
        v-if="pathName == 'editProduct'"
        :isLoading="isUpdatingProduct"
        :style="{
          'width': '100%',
          'font-size': '15px',
          'border-radius': '5px',
          'padding': '10px auto',
          'font-weight': '700'
        }"  
      >
        Update Product
      </Button>
    </form>
  </main>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
import Button from '@/components/Button';
export default {

  setup(){
    const store = useStore();
    const route = useRoute();

    const data = reactive({
      name: '',
      brand: '',
      checkedProductFors: [],
      category: '',
      description: '',
      price: '',
      discount: 0,
      countInStock: '',
      productImage: null,
      pathName: computed(() => route.name),
      isCreatingProduct: false,
      isUpdatingProduct: false
    })

    function imageUpload(e){
      const productImage = e.target.files || e.dataTransfer.files;
      if(!productImage){
        data.productImage = null;
      } else {
        data.productImage = productImage[0];
      }
    }

    async function createProduct(){
      try {
        if(!(data.name && data.brand && data.category && data.description && data.price && 
        data.discount > -1 && data.countInStock && data.productImage && data.checkedProductFors.length) ){
          store.commit('popupAlert', {head: 'Unable to create', body: 'Please fill all product details', status: 'error'})
        } else {
          data.isCreatingProduct = true;
          const bodyFormData = new FormData();
          bodyFormData.append('name', data.name);
          bodyFormData.append('brand', data.brand);
          bodyFormData.append('category', data.category);
          bodyFormData.append('description', data.description);
          bodyFormData.append('price', data.price);
          bodyFormData.append('discount', data.discount);
          bodyFormData.append('countInStock', data.countInStock);
          bodyFormData.append('productFor', data.checkedProductFors.toString());
          bodyFormData.append('productImage', data.productImage);
  
          await store.dispatch('createProduct', bodyFormData);
          data.isCreatingProduct = false;
          store.commit('popupAlert', {head: 'Product Created', body: '', status: 'success'})
        }
      } catch (err) { 
        data.isCreatingProduct = false;
        console.log(err) 
      }
    }

    async function updateProduct() {
      try {
        if(!(data.name && data.brand && data.category && data.description && data.price && 
        data.discount >= 0 && data.countInStock && data.checkedProductFors.length) ){
          store.commit('popupAlert', {head: 'Unable to create', body: 'Please fill all product details', status: 'error'})
        } else {
          data.isUpdatingProduct = true
          const { productId } = route.params;
          data.productFor = data.checkedProductFors ;
          await store.dispatch('updateProduct', { productId, data });
          store.commit('popupAlert', {head: 'Product Updated', body: '', status: 'success'})
          data.isUpdatingProduct = false;
        }
      } catch (error) {
        data.isUpdatingProduct = false;
        console.log(error);
      }
    }

    onMounted(async () => {
      try {
        if(route.name == 'editProduct'){
          store.commit('showLoading');
          const { productId } = route.params
          const { product } = await store.dispatch('fetchProductById', { productId });
          data.name = product.name;
          data.brand = product.brand;
          data.price = product.price;
          data.countInStock = product.countInStock;
          data.discount = product.discount;
          data.category = product.category;
          data.checkedProductFors = product.productFor || [];
          data.description = product.description;
        }
      } catch (error) {
        console.log(error)
      }
      store.commit('closeLoading');
    })

    return {
      ...toRefs(data),
      imageUpload,
      Button,
      createProduct,
      updateProduct
    }
  }
}
</script>

<style scoped>
  main{
    min-height: calc(100vh - 200px);
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  main h1 {
    font-size: 36px;
    line-height: 1.1;
    text-transform: uppercase;
    font-weight: 600;
  }

  form {
    width: 90%;
    max-width: 450px;
    margin: 10px 5% 70px;
    padding: 40px 30px;
    border: 2px solid #eee;
    box-sizing: border-box;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 15px; 
  }
  .form-group label, .check-box-group p{
    text-align: left;
    font-weight: 500;
    padding-bottom: 5px;
  }

  .check-box-group {
    margin-bottom: 15px ;
  }

  .check-box-group p{
    margin: 0;
  }

  .check-box-group > div{
    display: grid;
    border: 1px solid #243a6f;
    padding: 10px;
    grid-template-columns: repeat(4, 1fr);
  }

  .check-group {
    display: flex;
    align-items: flex-start;
    padding: 5px 0;
  }

  .form-group input, .description {
    padding: 10px;
    border: 1px solid #243a6f;
    outline: none;
  }

  .form-group select {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    border: 1px solid #243a6f;
    border-radius: 2px;
    background-color: #fff;
  }

  .form-group select:focus   {
    outline: none;
  }

  .form-group input:focus {
    border: 2px solid #fc7c7c;
    outline: none;
  }

  .description {
    width: 100%;
    box-sizing: border-box;
  }
  
</style>