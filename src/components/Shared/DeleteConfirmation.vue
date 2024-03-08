<template>
    <div>
        <v-dialog
        v-model="taskData.show"
        persistent
        max-width="290"
        >
        <v-card>
            <v-card-title class="text-h5">
            Delete "{{taskData.title}}"?
            </v-card-title>
            <v-card-text>Make sure you know what you are doing.</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red darken-1"
                btn
                @click="deleteTask"
            >
            Delete
            </v-btn>
            <v-btn
                btn
                @click="cancelDelete"
            >
            Cancel    
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: 'DeleteConfirmation',
    props: {
        taskData: {
            type: Object,
            default: () => {}
        },
    },
    methods: {
        deleteTask(){
            const taskDetails = {taskId: this.taskData.id, message: this.deleteMessage}
            this.$store.dispatch('deleteTask', taskDetails)
            this.$emit('close')
        },
        cancelDelete(){
            this.$emit('close')
        }
    },
    computed: {
      deleteMessage(){
        return `Deleted "${this.taskData.title}" successfully!`
      }
    }
};
</script>