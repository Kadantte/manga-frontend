<template>
  <div>
    <div>
      <app-header />
    </div>
    <div>
      <loading :show="this.$store.state.show" :label="loading">
      </loading>
      <form enctype="multipart/form-data">
        <input type="file" @change="onFileChange">
      </form>
    </div>
  </div>
</template>

<script>
  import AppHeader from '~/components/header'
  export default {
    name: 'ImportFollows',
    components: {
      AppHeader
    },
    methods: {
      onFileChange: function (e) {
        var files = e.target.files || e.dataTransfer.files
        console.log(files)
        if (!files.length) {
          return
        }
        this.createInput(files[0])
      },
      createInput: function (file) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.fileinput = reader.result
          var header = 'Bearer ' + this.$cookie.get('token')
          this.$store.commit('show', true)
          setTimeout(() => {
            this.$axios.$post('/follows/import', reader.result, {
              headers: {
                Authorization: header
              }
            }).then((response) => {
              this.$store.commit('show', false)
              if (response['success'] !== true) {
                this.$store.commit('alerts/add', {
                  type: 'error',
                  text: 'Error upload attempt failed'
                })
                return
              }
              this.$store.commit('alerts/add', {
                type: 'success',
                text: 'You successfully added a chapter!'
              })
            })
          }, 500)
        }
        reader.readAsText(file)
      }
    }
  }
</script>