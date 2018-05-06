<template>
    <div>
        <!--<div v-if="test">TEST</div>-->
        <!--<div v-else="test">Nie TEST</div>-->

        <!--<div>-->
            <!--<div class="text-xs-center">-->
                <!--<v-btn color="info" @click="alert = !alert">Dodaj</v-btn>-->
            <!--</div>-->
            <!--<v-alert-->
                    <!--type="success"-->
                    <!--:value="alert"-->
                    <!--transition="scale-transition"-->
            <!--&gt;-->
                <!--<input v-model="links.url_org" type="text">-->
              <!--</v-alert>-->
        <!--</div>-->
        <v-dialog v-model="dialog" max-width="500px">
            <v-btn color="info" dark slot="activator" class="mb-2">Dodaj</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Oryginal URL" v-model="link.url_org"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Short_URL" v-model="link.url_short"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Active" v-model="link.active"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="close">Exit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-data-table
                :headers="headers"
                :items="links"
                hide-actions
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.url_org }}</td>
                <td>{{ props.item.url_short }}</td>
                <td>
                   <v-btn
                        :color="activityColors[activityState[props.item.id]]"
                        @click="change(!activityState[props.item.id], props.item.id)"
                   >
                       {{ activeToText(activityState[props.item.id])}}</v-btn>
</td>
                <td>
                    <v-btn icon class="mx-0" @click="editItem(props.item.id)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                </td>
                <td>
                    <v-btn icon class="mx-0" @click="deleteLink(props.item.id)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>

    export default {

        data () {
            return {
                link: {
                    id: '',
                    url_org: '',
                    url_short: '',
                    active: ''
                },
                alert: false,
                test: 0,
                links: [],
                activityColors: {
                    0: 'error',
                    1: 'success'

                },

                editedIndex: -1,
                dialog: false,

                activityState: {},
                headers: [
                    {text: 'ID', value: 'id'},
                    {text: 'Twój URL', value: 'url_org'},
                    {text: 'url_short', value: 'url_short'},
                    {text: 'Active', value: 'active'},
                    {text: 'Edycja', value: 'edit'},
                    {text: 'Usuń', value: 'delete'},
                ]
            }
        },



        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            }
        },

        watch: {
            dialog () {
                if(this.dialog) {
                    this.clear()
                }
            }
        },


        methods: {

            clear () {
                this.link = {
                    id: '',
                        url_org: '',
                        url_short: '',
                        active: ''
                }
            },

            close () {
                this.dialog = false
            },

            save () {
//                to jest w przypadku edycji
                if (this.link.id) {
                    axios.put(`links/${this.link.id}`, this.link)
                        .then(() => {
                        this.dialog = false

                        })
                } else {
//                    to jest dla zapisu nowego
                    axios.post(`links`, this.link)
                        .then(result => {
                            this.getLinks()
                            this.dialog = false
                        })
                }
            },

            editItem (id) {
                axios(`links/${id}/edit`)
                    .then(result =>
                        this.link = result.data)
                this.dialog = true

            },

            getLinks () {
                axios('links')
                    .then(result => {
                        this.links = result.data

                        this.links.forEach(link => {
                            this.activityState[link.id] = link.active
                        })

                    })
            },

            activeToText (active) {
                return active == 1 ? 'aktywny' : 'nieaktywny'
            },

            change (active, id){
                axios.patch(`links/change-active/${id}`, {
                    active: active
                })
                    .then(() => {
                        this.activityState[id] = active ? 1 : 0
                        this.$forceUpdate()
                    })
            },

            deleteLink (id) {
                axios.delete(`links/${id}`)
                    .then(() => this.getLinks())
            }
        },

        created () {

           this.getLinks()
        },


    }
</script>
