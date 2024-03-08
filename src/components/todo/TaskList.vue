<template>
    <div>
        <v-list
        flat
        >
            <draggable v-bind="{animation: 500}" handle=".handle" v-model="tasks">
                <transition-group>
                    <task
                    v-for="task in $store.getters.filteredTasks"
                    :key="task.id" 
                    :task="task"/>
                </transition-group>
            </draggable>
        </v-list>
    </div>
</template>
<script>
import draggable from "vuedraggable";
import Task from '@/components/todo/Task.vue';
export default {
    components: {
        Task,
        draggable
    },
    computed: {
        tasks: {
            get(){
                return this.$store.getters.filteredTasks
            },
            set(value){
                this.$store.dispatch('updateListOrder', value)
            }
        }
    },
    mounted(){
        this.$store.dispatch('getTasks')
    }
};
</script>
<style lang="sass" scoped>
  .sortable-ghost 
    opacity: 0
  .sortable-drag
    box-shadow: 0 0 2px rgba(0,0,0,1)
</style>