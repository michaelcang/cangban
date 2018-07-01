import Vue from 'vue'
import Vuex from 'vuex'
import './firebase.js'
import firebase from 'firebase'
import swal from 'sweetalert'

Vue.use(Vuex)

const db = firebase.database()

export default new Vuex.Store({
  state: {
    allTasks: '',
    backlog: '',
    todo: '',
    onprogress: '',
    done: ''
  },
  mutations: {
    allTasks (state, payload) {
      state.allTasks = payload
    },
    backlog (state, payload) {
      state.backlog = payload
    },
    todo (state, payload) {
      state.todo = payload
    },
    onprogress (state, payload) {
      state.onprogress = payload
    },
    done (state, payload) {
      state.done = payload
    }
  },
  actions: {
    getTasks ({ commit }, payload) {
      db.ref('tasks/').on('value', function (snapshot) {
        let allTasks = snapshot.val()
        let backlog = []
        let todo = []
        let onprogress = []
        let done = []
        for (const key in allTasks) {
          let task = allTasks[key]
          task.id = key
          if (task.status === 0) {
            backlog.push(task)
          } else if (task.status === 1) {
            todo.push(task)
          } else if (task.status === 2) {
            onprogress.push(task)
          } else {
            done.push(task)
          }
        }
        commit('allTasks', allTasks)
        commit('backlog', backlog)
        commit('todo', todo)
        commit('onprogress', onprogress)
        commit('done', done)
      })
    },
    addTask (context, payload) {
      let key = db.ref('tasks/').push(payload).key
      swal({
        title: key,
        icon: 'success'
      })
    },
    changeStatus ({ commit }, payload) {
      swal({
        text: 'Are you sure you want to move the task?',
        buttons: true
      })
        .then((confirm) => {
          if (confirm) {
            swal('Task moved!', {
              icon: 'success'
            })
            if (payload.toRight) {
              payload.task.status++
            } else {
              payload.task.status--
            }
            db.ref(`tasks/${payload.task.id}`).set(payload.task)
          } else {
            swal('Task stay!')
          }
        })
    },
    removeTask ({ commit }, payload) {
      swal({
        text: 'Are you sure you want to delete this task?',
        buttons: true,
        dangerMode: true
      })
        .then((confirm) => {
          if (confirm) {
            swal('Task deleted!', {
              icon: 'success'
            })
            db.ref(`tasks/${payload}`).remove()
          } else {
            swal('Task stay!')
          }
        })
    }
  }
})
