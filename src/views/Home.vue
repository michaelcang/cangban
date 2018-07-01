<template>
  <div class="home">
    <nav class="navbar d-flex justify-content-between">
      <div class="navbar-brand" href="#">Cangban</div>
    </nav>
    <div class="d-flex justify-content-center">

      <div class="card add">
        <div class="card-header">
          <strong>Add New Task</strong>
        </div>
        <div class="card-body">
          <input v-model="title" type="text" class="form-control" placeholder="Task Title">
          <input v-model="point" type="text" class="form-control" placeholder="Task Point: 0">
          <input v-model="person" type="text" class="form-control" placeholder="Assigned to">
          <button @click="addNewTask" :disabled="!title || !point || !person" type="submit" class="btn btn-outline-primary">Submit</button>
        </div>
      </div>

      <div class="card stats">
        <div class="card-header">
          <strong>Tasks Statistics</strong>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item list-group-item-danger">
              Backlog: {{backlog.length}}/{{Object.keys(allTasks).length}}
            </li>
            <li class="list-group-item list-group-item-warning">
              To Do: {{todo.length}}/{{Object.keys(allTasks).length}}
            </li>
            <li class="list-group-item list-group-item-primary">
              On Progress: {{onprogress.length}}/{{Object.keys(allTasks).length}}
            </li>
            <li class="list-group-item list-group-item-success">
              Done: {{done.length}}/{{Object.keys(allTasks).length}}
            </li>
          </ul>
        </div>
      </div>

    </div>
    
    <div class="kanban d-flex justify-content-between">

      <card-list :tasks="backlog" :status="'Backlog'"></card-list>
      <card-list :tasks="todo" :status="'To Do'"></card-list>
      <card-list :tasks="onprogress" :status="'On Progress'"></card-list>
      <card-list :tasks="done" :status="'Done'"></card-list>

    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import Card from '@/components/Card.vue'
import CardList from '@/components/CardList.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    Card,
    CardList
  },
  data () {
    return {
      title: '',
      point: '',
      person: ''
    }
  },
  computed: {
    ...mapState({
      allTasks: 'allTasks',
      backlog: 'backlog',
      todo: 'todo',
      onprogress: 'onprogress',
      done: 'done'
    })
  },
  methods: {
    ...mapActions([
      'getTasks',
      'addTask'
    ]),
    addNewTask () {
      if (isNaN(this.point)) {
        swal({
          text: 'Task point has to be a number',
          icon: 'warning'
        })
        return
      } else if (!this.title || !this.point || !this.person) {
        swal({
          text: 'Please fill all task info',
          icon: 'warning'
        })
        return
      }
      let payload = {
        title: this.title,
        point: this.point,
        person: this.person,
        status: 0
      }
      this.addTask(payload)
      this.title = ''
      this.point = ''
      this.person = ''
    }
  },
  created () {
    this.getTasks()
  }
}
</script>

<style lang="scss">
nav {
  background-color: lightgray;
}
.kanban {
  padding: 20px;
}
.status {
  margin: 0 10px;
  width: 600px;
}
.add {
  margin: 30px;
  width: 400px;
}
.add input {
  margin-bottom: 20px;
}
.stats {
  margin: 30px;
  width: 300px;
}
.stats .card-body {
  font-weight: bold;
  text-align: left;
}
</style>
