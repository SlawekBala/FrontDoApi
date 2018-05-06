<template>
    <v-container>
        <v-text-field
            v-model="$store.state.userData.name"
            label="Imie i nazwisko"
            required
            ></v-text-field>
        <v-text-field
            v-model="$store.state.userData.address"
            label="Adres"
            required
            ></v-text-field>
    </v-container>
</template>

<script>

    export default {
        name: "Step1",

    }
</script>

<style scoped>

</style>