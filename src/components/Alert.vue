<template>
  <div
    id="alert"
    :class="{
      error: message.status == 'error',
      success: message.status == 'success',
      show: toggleAlert,
    }"
  >
    <div>
      <p>{{ message.head }}</p>
      <span>{{ message.body }}</span>
    </div>
    <font-awesome-icon :icon="faTimesCircle" class="icon" @click="closeAlert" />
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { computed, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const data = reactive({
      toggleAlert: computed(() => store.getters.isAlertOpen),
      message: computed(() => store.getters.getMessage),
    });

    function closeAlert() {
      store.commit("closeAlert");
    }

    watch(
      () => data.toggleAlert,
      (value) => {
        let timeout;
        if (value) {
          timeout = setTimeout(() => {
            store.commit("closeAlert");
          }, 4000);
        } else {
          clearTimeout(timeout);
        }
      }
    );

    return {
      ...toRefs(data),
      closeAlert,
      FontAwesomeIcon,
      faTimesCircle,
    };
  },
};
</script>

<style>
.error {
  background-color: #bd362f;
}

.success {
  background-color: #3bb75e;
}

#alert.show {
  transform: translateX(0px);
}
#alert {
  display: flex;
  position: fixed;
  top: 80px;
  right: 15px;
  max-width: calc(100vw - 20px);
  transform: translateX(500px);
  z-index: 1000;
  border-radius: 7px;
  padding: 15px 15px 15px 50px;
  transition: 300ms cubic-bezier(0.25, 0.25, 0.75, 0.75) all;
}
#alert .icon {
  color: #fff;
  cursor: pointer;
  font-size: 2rem;
}
#alert > div {
  text-align: left;
  margin: 0 20px 0 0;
  color: #fff;
}

#alert > div > p {
  margin-bottom: 5px;
}

#alert > div > span {
  font-weight: 300;
}
</style>
