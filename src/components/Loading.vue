<template>
  <div id="loading" v-if="isLoading">
    <div>
      <h1>{{ loadingMessage }}</h1>
      <div class="lds-hourglass"></div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue';
import { useStore } from 'vuex'
export default {
  setup(){
    const store = useStore();
    const data = reactive({
      isLoading: computed(() => store.getters.getIsLoading),
      loadingMessage: computed(() => store.getters.getLoadingMessage)
    })

    return {
      ...toRefs(data)
    }
  }
}
</script>

<style>
#loading {
  z-index: 100000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(36,58,111, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

#loading > div {
  text-align: center;
}

#loading > div > h1 {
  color: #fff;
  margin: 20px 0;
}

.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #fc7c7c;
  border-color: #fc7c7c transparent #fff transparent;
  animation: lds-hourglass 5s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>