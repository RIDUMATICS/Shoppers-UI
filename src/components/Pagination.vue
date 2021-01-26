<template>
  <section class="pagination">
    <div class="container">
      <span
        id="prevBtn"
        :class="{ disabled: this.currentPage === 1 }"
        @click="onClickPreviousPage"
        ><font-awesome-icon :icon="faArrowLeft" class="icon"
      /></span>
      <span
        v-for="page in pages"
        :key="page.name"
        :class="{ currentPage: page.isCurrentPage }"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </span>
      <span
        id="nextBtn"
        :class="{ disabled: this.currentPage === this.totalPages }"
        @click="onClickNextPage"
        ><font-awesome-icon :icon="faArrowRight" class="icon"
      /></span>
    </div>
  </section>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { computed, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    // const { fetchProducts } = useActions([ 'fetchProducts' ]);

    const event = reactive({
      totalPages: computed(() => useStore().state.product.totalPages),
      currentPage: computed(() => parseInt(route.params.page)),
      startPage: computed(() =>
        event.currentPage === 1 ? 1 : event.currentPage - 1
      ),
      isFirstPage: computed(() => event.currentPage === 1),
      isLastPage: computed(() => event.currentPage === event.totalPages),
      pages: computed(() => {
        const range = [];
        for (
          let i = event.startPage;
          i <=
          Math.min(
            event.startPage + props.maxVisibleButtons - 1,
            event.totalPages
          );
          i += 1
        ) {
          range.push({
            name: i,
            isCurrentPage: i === event.currentPage,
          });
        }

        return range;
      }),
    });

    function onClickPreviousPage() {
      router.push({
        name: 'shop',
        params: { page: event.currentPage - 1 },
        query: route.query,
      });
    }

    function onClickPage(page) {
      router.push({
        name: 'shop',
        params: { page: parseInt(page) },
        query: route.query,
      });
    }

    function onClickNextPage() {
      router.push({
        name: 'shop',
        params: { page: event.currentPage + 1 },
        query: route.query,
      });
    }

    return {
      ...toRefs(event),
      onClickNextPage,
      onClickPreviousPage,
      onClickPage,
      FontAwesomeIcon,
      faArrowRight,
      faArrowLeft,
    };
  },
};
</script>

<style>
.pagination {
  padding-top: 6rem;
}

.pagination span {
  display: inline-block;
  padding: 1rem 1.5rem;
  border: 1px solid #243a6f;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  margin-right: 5px;
}

.pagination span:hover,
.pagination span:hover .icon {
  border: 1px solid #243a6f;
  background-color: #243a6f;
  color: #fff;
}

.pagination .icon {
  font-size: 1.8rem;
  color: #243a6f;
  font-weight: 400;
}

.currentPage {
  border: 1px solid #fc7c7c;
  background-color: #fc7c7c;
  color: #fff;
}

#prevBtn.disabled,
#nextBtn.disabled {
  display: none;
}
</style>
