<template>
  <button
    type="submit"
    :disabled="isLoading"
    class="loading_button"
    :class="{ blue: !isLoading && theme === 'blue', 'blue-rev': !isLoading && theme === 'blue-rev' }"
    :style="style"
    >
      
      <slot></slot> 
      <div class="lds-dual-ring" v-if="isLoading"></div>
  
  </button>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    theme: {
      type: String,
      required: true
    },
    style: Object
  }
}
</script>

<style>
  .lds-dual-ring {
    display: inline-block;
    width: fit-content;
    height: fit-content;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 20px;
    height: 20px;
    margin: 0 8px;
    border-radius: 50%;
    border: 2px solid #fff;
    border-color: #243a6f transparent #243a6f transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading_button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    font-size: 18px;
    padding: 10px 15px;
    cursor: pointer;
    text-transform: uppercase;
  }

  .blue {
    border: 1px solid #243a6f;
    background-color: #fff;
    color: #243a6f;
  }

  .blue-rev {
    border: 1px solid #243a6f;
    background-color: #243a6f;
    color: #fff;
  }

  .blue-rev:hover {
    background-color: #fff;
    color: #243a6f;
  }

  .blue:hover {
    background-color: #243a6f;
    color: #fff;
  }

  button:disabled {
    cursor: wait;
  }

</style>