<template>
  <div>
    <v-list-item
      @click.stop="markTaskDone(task.id)"
      :class="taskStatusStyles(task)"
      :ripple="false"
      class="white"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox
            :input-value="task.done"
            :disabled="task.done"
          ></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title
            :class="{
              'text-decoration-line-through text--disabled': task.done,
            }"
            >{{ task.title }}</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action v-if="task.dueDate && task.dueDate !== ' '">
          <v-list-item-action-text>
            <v-icon color="grey lighten-1" small>
              mdi-calendar
            </v-icon>
          {{task.dueDate | shortDate}}
          </v-list-item-action-text>
        </v-list-item-action>
        <v-list-item-action>
          <TaskMenu :taskData="task" class="handle" />
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>
<script>
import { format } from 'date-fns'
import TaskMenu from "@/components/todo/TaskMenu.vue";
export default {
  props: {
    task: {
      type: Object,
      default: function () {
        return { message: "No data available!" };
      },
    },
  },
  filters:{
    shortDate(value){
      return format(new Date(value), 'MMM d')
    }
  },
  components: {
    TaskMenu,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    markTaskDone(taskId) {
      this.$store.dispatch("markTaskDone", taskId);
    },
    taskStatusStyles(task) {
      return {
        'blue lighten-5': task.done,
        'red lighten-1': !task.done && task.priority == 'high',
        'orange lighten-1': !task.done && task.priority == 'medium',
        'yellow lighten-1': !task.done && task.priority == 'low',
      }
    }
  },
};
</script>