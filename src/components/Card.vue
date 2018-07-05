<template>
  <div class="card task">
    <div class="card-header">
      <strong>{{task.title}}</strong>
    </div>
    <div class="card-body">
      <p class="card-text desc"><strong>Description</strong>: {{ task.desc }}</p>
      <p class="card-text"><strong>Points</strong>: {{task.point}}</p>
      <p class="card-text"><strong>Assign To</strong>: {{task.person}}</p>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <button @click="removeTask(task.id)" type="submit" class="btn btn-outline-danger btn-sm">Delete</button>
      <div class="btn-group" role="group">
        <button @click="goLeft" v-if="task.status > 0" type="button" class="btn btn-outline-secondary btn-sm">
          <i class="fas fa-arrow-left"></i>
        </button>
        <button @click="goRight" v-if="task.status < 3" type="button" class="btn btn-outline-primary btn-sm">
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Card',
  props: ['task'],
  methods: {
    ...mapActions([
      'changeStatus',
      'removeTask'
    ]),
    goRight () {
      this.changeStatus({
        task: this.task,
        toRight: true
        })
    },
    goLeft () {
      this.changeStatus({
        task: this.task,
        toRight: false
        })
    }
  }
}
</script>

<style lang="scss">
.task {
  margin-bottom: 10px;
  text-align: left;
  line-height: 0.7em;
  .desc {
    white-space: pre-wrap;
    line-height: 1.3em;
  }
}
</style>

