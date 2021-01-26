<template>
  <Button
    theme="blue-rev"
    @click="makePayment"
    :isLoading="false"
    :style="{
      width: '100%',
      'text-transform': 'capitalize',
      'margin-top': '20px',
    }"
  >
    Make Payment
  </Button>
</template>

<script>
import Button from '@/components/Button'
export default {

  props: {
    tx_ref: {
      type: [String, Number]
    },
    amount: {
      type: [String, Number],
      required: true
    },
    customer: {
      type: Object
    },
    callback: {
      type: Function
    }
  },
  setup(props){
    function makePayment() {
      window.FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-bb0eed015df620228553aa1dff2708dc-X",
        tx_ref: props.tx_ref,
        amount: props.amount,
        currency: "NGN",
        country: "NG",
        payment_options: "card,mobilemoney,ussd",
        customer: props.customer,
        callback: async function () { // specified callback function
          await props.callback();
        },
        customizations: {
          title: "Shoppers",
          description: "Payment for items in cart",
          // logo: "https://assets.piedpiper.com/logo.png",
        },
      });
    }


    return {
      makePayment,
      Button
    }
  }
}
</script>

<style>

</style>