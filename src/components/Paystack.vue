<template>
    <Button
        v-if="!embed"
        theme='blue-rev'
        :onClick="payWithPaystack"
        :isLoading="isLoading"
        :style="{
            width: '100%',
            'text-transform': 'capitalize',
            'margin-top': '20px'
        }"
    >
        Make Payment
    </Button>
  <div
    v-else
    id="paystackEmbedContainer"
  />
</template>

<script type="text/javascript">
import Button from './Button';
export default {
    props: {
        embed: {
            type: Boolean,
            default: false
        },
        paystackkey: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            default: ""
        },
        lastname: {
            type: String,
            default: ""
        },
        amount: {
            type: Number,
            required: true
        },
        reference: {
            type: String,
            required: true
        },
        channels: {
            type: Array,
            default: function() {
                return ["card", "bank"];
            }
        },
        accessCode: {
            type: String,
            default: ""
        },
        callback: {
            type: Function,
            required: true,
        },
        close: {
            type: Function,
            required: true,
        },
        metadata: {
            type: Object,
            default: function() {
                return {};
            }
        },
        currency: {
            type: String,
            default: "NGN"
        },
        plan: {
            type: String,
            default: ""
        },
        quantity: {
            type: String,
            default: ""
        },
        subaccount: {
            type: String,
            default: ""
        },
        split: {
            type: Object,
            default: function() {
                return {};
            }
        },
        splitCode: {
            type: String,
            default: ""
        },
        transactionCharge: {
            type: Number,
            default: 0
        },
        bearer: {
            type: String,
            default: ""
        }
    },
    components: {
        Button
    },
    data() {
        return {
            scriptLoaded: null,
            isLoading: false
        };
    },
    created() {
        this.scriptLoaded = new Promise(resolve => {
            this.loadScript(() => {
                resolve();
            });
        });
    },
    mounted() {
        if (this.embed) {
            this.payWithPaystack();
        }
    },
    methods: {
        loadScript(callback) {
            const script = document.createElement("script");
            script.src = "https://js.paystack.co/v1/inline.js";
            document.getElementsByTagName("head")[0].appendChild(script);
            if (script.readyState) {
                // IE
                script.onreadystatechange = () => {
                    if (
                        script.readyState === "loaded" ||
            script.readyState === "complete"
                    ) {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                // Others
                script.onload = () => {
                    callback();
                };
            }
        },

        isDynamicSplit() {
            return this.split.constructor === Object && Object.keys(this.split).length > 0;
        },

        payWithPaystack() {
            this.scriptLoaded &&
        this.scriptLoaded.then(() => {
            this.isLoading = true;
            const paystackOptions = {
                key: this.paystackkey,
                email: this.email,
                firstname: this.firstname,
                lastname: this.lastname,
                channels: this.channels,
                amount: this.amount,
                access_code: this.accessCode,
                ref: this.reference,
                callback: async response => {
                    await this.callback(response);
                    this.isLoading = false;
                },
                onClose: () => {
                    this.close();
                    this.isLoading = false;
                },
                metadata: this.metadata,
                currency: this.currency,
                plan: this.plan,
                quantity: this.quantity,
                subaccount: this.isDynamicSplit() ? "" : this.subaccount,
                split: this.isDynamicSplit() ? this.split : null,
                split_code: this.isDynamicSplit() ? "" : this.splitCode,
                transaction_charge: this.isDynamicSplit() ? 0 : this.transactionCharge,
                bearer: this.isDynamicSplit() ? "" : this.bearer
            };

            if (this.embed) {
                paystackOptions.container = "paystackEmbedContainer";
            }

            const handler = window.PaystackPop.setup(paystackOptions);
            if (!this.embed) {
                handler.openIframe();
            }
        });
        }
    }
};
</script>