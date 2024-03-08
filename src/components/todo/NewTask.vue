<template>
    <div class="d-flex">
        <v-text-field
            v-model="newTaskTitle"
            outlined
            label="Add task"
            append-icon="mdi-plus"
            clearable
            hide-details="auto"
            @click:append="addTask"
            @keyup.enter="addTask"
        ></v-text-field>
        <!-- <v-slider
            v-model="priority"
            vertical
            max-width="100"
            step="33"
            min="0"
            max="100"
            :thumb-label="someComputed"
            ticks
        ></v-slider> -->
    </div>
</template>
<script>

export default {
    data(){
        return {
            newTaskTitle: '',
            priority:'',
        }
    },
    methods: {
        addTask(){
        if(this.newTaskTitle){
            const payload = { 
                title: this.newTaskTitle, 
                message: this.addMessage
            }
            this.$store.dispatch('addTask', payload);
            this.newTaskTitle = ''
        }
      },
    },
    computed: {
        addMessage(){
            return 'Added "'+this.newTaskTitle+'" successfully!'
        },
        someComputed(){
            if(this.priority == 33){
                return 'P3'
            }
            if(this.priority == 66){
                return 'P2'
            }
            if(this.priority == 99){
                return 'P1'
            }
        }
    }
}
</script>