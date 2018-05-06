<template>
    <v-form @submit.prevent="login()">
        <v-text-field
                label="Email"
                v-model="email"
                required
        ></v-text-field>
        <v-text-field
                label="Password"
                v-model="password"
                type="password"
                required
        ></v-text-field>
        <v-btn type="submit" color="info">Login</v-btn>
    </v-form>
</template>

<script>

    export default {

        data () {
            return {
                    email: '',
                    password: ''
            }
        },

        methods: {
            login() {
                axios.post(`login`, {
                    email: this.email,
                    password: this.password
                })
                    .then(result => {
                    localStorage.setItem('token', result.data.access_token)
                    this.$router.push({
                        path: '/links'
                    });
                    })
            }


        }
    }

</script>