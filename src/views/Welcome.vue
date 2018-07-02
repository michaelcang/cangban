<template>
  <div class="welcome">
    <nav class="navbar d-flex justify-content-between">
      <div class="navbar-brand" href="#">Cangban</div>
    </nav>
    <div class="welcome-card">
      <div class="card welcome">
        <div class="card-header">
          <strong>Enter Secret Word</strong>
        </div>
        <div class="card-body">
          <input v-model="secret" type="text" class="form-control" placeholder="Enter secret word">
          <button @click="checkSecret" type="submit" class="btn btn-outline-primary">Enter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'Welcome',
  data () {
    return {
      secret: 'puppies'
    }
  },
  methods: {
    checkSecret () {
      if (this.secret === 'puppies') {
        this.$router.push('/home')
      } else {
        swal({
          text: 'Wrong secret word',
          icon: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.welcome-card {
  margin: 150px auto;
  width: 15%;
}
.welcome-card input {
  margin-bottom: 20px;
}
</style>
