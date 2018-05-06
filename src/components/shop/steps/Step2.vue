<template>
    <v-container>
        <v-radio-group v-model="$store.state.userData.payment">
            <v-radio
                    v-for="(n,k) in $store.state.paymentMethods"
                    :key="k"
                    :label="n"
                    :value="k"
                ></v-radio>
        </v-radio-group>

    </v-container>
</template>

<script>

    export default {
        name: "Step2",
        data () {
            return{

            }
        }


    }
</script>

<style scoped>

</style>