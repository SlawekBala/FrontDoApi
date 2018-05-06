<template>
    <v-container grid-list-md text-xs-center>

        <v-layout row wrap>
            <v-flex xs3 v-for="(product, key) in products" :key="key">
                <v-card>
                    <v-card-media src="/static/img/pustynia.jpg" height="200px">
                    </v-card-media>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{product.name}}</h3>
                            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn @click="addToBasket(product)" flat color="orange">Add</v-btn>

                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'List',
        data () {
            return {
                added: [],

                products: []
            }
        },
        computed: {
            ...mapGetters({
                refresh: 'refresh'
            })
        },
        watch: {
          refresh () {
              this.$store.dispatch('getBasket')
          }
        },
        methods: {
            addToBasket (product) {
                this.$store.dispatch('addToBasket', product)
//                //this.added.push(product)
//                this.$store.state.added.push(product)

//                axios.post(`orders`, {
//                    product_id: product.id
//                })
//                    .then(result => {
//                        //console.log(result.data)
//                        this.getBasket()
//                    })
            },
//            getBasket () {
//                axios(`orders`)
//                    .then(result => {
//                        this.$store.state.added = result.data
//                    })
//            }
        },
        created () {
            axios(`products`)
                .then(result => {
                    this.products = result.data

                })
        }


    }
</script>
