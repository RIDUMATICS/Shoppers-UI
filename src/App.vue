<template>
  <Loading />
  <Alert />
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';

export default {
  setup() {
    return {
      Header,
      Footer,
      Alert,
      Loading,
    };
  },
};
</script>

<style></style>
