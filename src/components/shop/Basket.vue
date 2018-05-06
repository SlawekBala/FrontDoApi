<template>
    <v-container>
        <v-data-table
                :headers="headers"
                :items="added"
                hide-actions
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.quantity }}</td>
                <td>
                    <v-btn @click="addQuantity(props.item)" fab dark small color="success">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </td>
                <td>
                    <v-btn @click="removeQuantity(props.item)" fab dark small color="primary">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
        <v-btn to="/shop" color="warning">Powrót do sklepu</v-btn>
        <v-btn color="info" to="/basket-proceed">Realizuj</v-btn>

    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "Basket",
        data () {
            return {
                headers: [
                    { text: 'Id', value: 'id' },
                    { text: 'Name', value: 'name' },
                    { text: 'Ilosc', value: 'quantity' },
                    { text: 'Zwieksz', value: '' },
                    { text: 'Zmniejsz', value: '' }
                ]


            }
        },
        computed: {
            ...mapGetters({
                added: 'added'
            })
        },
        methods: {

            addQuantity(item) {
//                axios.put(`orders/quantity/${item.id}/1`)
//                    .then(() => {
//                        item.quantity++
//                    })
                this.$store.dispatch('addQuantity', item)

            },
            removeQuantity(item) {
                this.$store.dispatch('removeQuantity', item)
//                axios.put(`orders/quantity/${item.id}/0`)
//                    .then(() => {
//                        if (item.quantity === 1) {
//                            this.$store.state.added = this
//                                                            .$store
//                                                            .state
//                                                            .added
//                                                            .filter(element => element.id !== item.id)
//                        } else {
//                            item.quantity--
//                        }
//                    })

            },
//to już nie będzie potrzebne
//            getBasket (item, add) {
//                this.$store.state.added = this.$store.state.added.filter(element => {
//                    if(element.id === item.id) {
//                        if(add) {
//                            element.quantity = element.quantity + 1
//                        } else {
//                            if(element.quantity === 1) {
//                                return false
//                            } else {
//                                element.quantity = element.quantity - 1
//                            }
//                        }
//                        return true
//                    }
//
//                    return element
//                })
//
//                // axios('orders')
//                //   .then(result => {
//                //     this.$store.state.added = result.data
//                //   })
//            }
        }

    }
</script>

<style scoped>

</style>