<template>
  <div id="loading" v-if="isLoading">
    <div>
      <div class="lds-ripple"><div></div><div></div></div>
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
      isLoading: computed(() => store.getters.getIsLoading)
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

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>