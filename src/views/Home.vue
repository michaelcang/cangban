<template>
  <div class="home">
    <nav class="navbar d-flex justify-content-between">
      <div class="navbar-brand" href="#">CangBan</div>
      <div class="buttons">
        <button @click="clearInput" type="button" class="btn btn-primary"
        data-toggle="modal" data-target="#addModal">Add Task</button>
        <button type="button" class="btn btn-info"
        data-toggle="modal" data-target="#statsModal">Statistics</button>
      </div>
    </nav>

    <div class="modal fade" id="addModal" tabindex="-1"
    role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalTitle">Add New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input v-model="title" type="text" class="form-control" placeholder="Task Title">
            <textarea v-model="desc" rows="4" type="text" class="form-control" placeholder="Task Description">
            </textarea>
            <input v-model="point" type="text" class="form-control" placeholder="Task Point: 0">
            <input v-model="person" type="text" class="form-control" placeholder="Assigned to">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="addNewTask" v-if="!title || !point || !person || !desc || isNaN(point)"
            type="submit" class="btn btn-outline-success">Submit</button>
            <button @click="addNewTask" v-if="title && point && person && desc && !isNaN(point)"
            type="submit" class="btn btn-outline-success" data-dismiss="modal">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="statsModal" tabindex="-1"
    role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content stats">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalTitle">Task Statistic</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
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
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="kanban d-flex justify-content-between align-items-baseline">

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
      person: '',
      desc: ''
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
      } else if (!this.title || !this.point || !this.person || !this.desc) {
        swal({
          text: 'Please fill all task info',
          icon: 'warning'
        })
        return
      }
      let payload = {
        title: this.title,
        desc: this.desc,
        point: this.point,
        person: this.person,
        status: 0
      }
      if (this.point >= 1) {
        payload.point = parseInt(this.point, 10)
      }
      this.addTask(payload)
    },
    clearInput () {
      this.title = ''
      this.point = ''
      this.person = ''
      this.desc = ''
    }
  },
  created () {
    this.getTasks()
  }
}
</script>

<style lang="scss">
.tooltip {
    z-index: 1060;
}
.buttons {
  .btn {
    margin-left: 10px;
  }
}
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
.modal .form-control {
  margin-bottom: 20px;
}
.stats {
  width: 300px;
  margin: auto;
}
.stats .card-body {
  font-weight: bold;
  text-align: left;
}
</style>
