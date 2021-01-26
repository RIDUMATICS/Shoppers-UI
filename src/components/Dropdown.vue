<template>
  <div class="drop-menu" @click="toggleSubMenu">
    <p>
      {{ user.firstName }} {{ user.lastName }}
      <FontAwesomeIcon :icon="faCaretDown" class="icon" />
    </p>
    <div class="sub-menu" v-if="isSubMenuOpen">
      <ul>
        <li><router-link to="/orders" data-type="menu">Orders</router-link></li>
        <li v-show="user.isAdmin">
          <router-link to="/admin/products" data-type="menu"
            >Products</router-link
          >
        </li>
        <li @click="logoutUser">LogOut</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  props: {
    user: Object,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const isSubMenuOpen = ref(false);

    async function logoutUser() {
      try {
        await store.dispatch('logoutUser');
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }

    function toggleSubMenu() {
      isSubMenuOpen.value = !isSubMenuOpen.value;
    }

    return {
      FontAwesomeIcon,
      faCaretDown,
      isSubMenuOpen,
      toggleSubMenu,
      logoutUser,
    };
  },
};
</script>

<style scoped>
.drop-menu {
  position: relative;
  margin-right: 20px;
}

.drop-menu p {
  cursor: pointer;
}

.drop-menu p .icon {
  color: #fc7c7c;
}

header.fix-nav .drop-menu .sub-menu {
  background-color: #243a6f;
}

.drop-menu .sub-menu {
  position: absolute;
  z-index: 1000;
  width: fit-content;
  background-color: #fff;
  padding: 10px;
  top: calc(100%);
  left: 50%;
  transform: translateX(-50%);
}

.sub-menu li {
  padding: 10px;
  cursor: pointer;
}

.sub-menu a li {
  border-bottom: 1px solid #fc7c7c;
}

@media only screen and (max-width: 768px) {
  .drop-menu .sub-menu {
    position: relative;
    transform: translateX(-20);
    width: 100%;
    margin: 10px 0;
  }

  header.fix-nav .drop-menu .sub-menu {
    background-color: #fff;
  }

  .drop-menu {
    padding: 1rem 0;
  }
}
</style>
