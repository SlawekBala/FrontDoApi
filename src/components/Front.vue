<template>
  <v-container fluid>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Wygenerowany link to
        </v-card-title>
        <v-card-text>
          {{url_short}}
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" flat @click.stop="dialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_error" max-width="500px">
      <v-card>
        <v-card-title>
          Link już istnieje
        </v-card-title>
        <v-card-text>
          {{url_short}}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog_error=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-form @submit.prevent="save()">
    <v-text-field
            label="url_org"
            v-model="url_org"
            required
    ></v-text-field>
    <v-text-field
            label="url_short"
            v-model="url_short"
            required
    ></v-text-field>
    <v-btn
      color="info"
      type="submit"
      >
      Zapisz
    </v-btn>
    </v-form>
  </v-container>
</template>

<script>

  export default {
      name: 'Front',
      data () {
          return {
              url_org: '',
              url_short: '',
              dialog: false,
              dialog_error: false
          }
      },
      created () {
          axios('links')
              .then(result => {
                  console.log(result.data)
              })
      },
      methods: {
          save () {
              axios.post('links',  {
                  url_org: this.url_org,
              url_short: this.url_short,
              active: 1
              })
                  .then(result => {
                      //console.log(result.data)
                      this.dialog = true
                  })
                  .catch(error => {
                      this.dialog_error = true
                  })

          }
      }
  }
</script>
