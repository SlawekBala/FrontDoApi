<template>
    <v-container>
        <div>Dane: {{$store.state.userData.name}}</div>
        <div>Adres: {{$store.state.userData.address}}</div>
        <div>Typ płatności: {{$store.state.paymentMethods[$store.state.userData.payment]}}</div>



    </v-container>
</template>

<script>

    export default {
        name: "Step3",

    }
</script>

<style scoped>

</style>