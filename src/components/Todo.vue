<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pa-2">
        <new-task />
        <div class="d-flex my-2">
          <h4>You have {{ tasksLeft }} tasks for today</h4>
          <v-spacer></v-spacer>
          <span>Success: {{ successRate }}</span>
        </div>
        <task-list class="overflow-y-auto mt-2 mb-1" :style="{ height: dynamicHeight }" />
        <no-task v-if="!$store.state.tasks.length" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewTask from '@/components/todo/NewTask.vue';
import TaskList from '@/components/todo/TaskList.vue';
import NoTask from '@/components/todo/NoTask.vue';
  export default {
    name: 'Todo',
    data(){
      return{
        dynamicHeight: ''
      }
    },
    created(){

    },
    components: {
      NewTask,
      TaskList,
      NoTask,
    },
    mounted() {
      this.setDynamicHeight();
      this.$vuetify.breakpoint.name; // Trigger reactive updates on breakpoint changes
      this.$vuetify.breakpoint.$on('change', this.setDynamicHeight);
    },
    destroyed() {
      this.$vuetify.breakpoint.$off('change', this.setDynamicHeight);
    },
    methods: {
      setDynamicHeight() {
        if (this.$vuetify.breakpoint.smAndDown) {
          this.dynamicHeight = '70vh'; // apply dynamism based on window.innerHeight etc.
        } else {
          this.dynamicHeight = '55vh';
        }
      }
    },
    computed: {
      successRate(){
        return this.tasksDone && this.$store.state.tasks?Math.floor(this.tasksDone/this.$store.state.tasks.length*100) +'%': '0%'
      },
      tasksDone(){
        return this.$store.state.tasks.reduce(function (td, task){
          return td += task.done?1:0
        }, 0)
      },
      tasksLeft(){
        return this.$store.state.tasks.reduce(function (tl, task){
          return tl += !task.done?1:0
        }, 0)
      }
    },
  }
</script>