<template>
  <div class="card status" :class="getColor('border-')">
    <div class="card-header" :class="getColor('bg-')">
      <strong :class="{ 'text-white': status === 'Backlog' || status === 'On Progress' }">{{status}}</strong>
    </div>
    <div class="card-body">
      <card v-for="(task, index) in tasks" :key="index" :task="task"></card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'CardList',
  props: ['tasks', 'status'],
  components: {
    Card
  },
  methods: {
    getColor (prefix) {
      if (this.status === 'Backlog') {
        return prefix + 'danger'
      } else if (this.status === 'To Do') {
        return prefix + 'warning'
      } else if (this.status === 'On Progress') {
        return prefix + 'primary'
      } else {
        return prefix + 'success'
      }
    }
  }
}
</script>
