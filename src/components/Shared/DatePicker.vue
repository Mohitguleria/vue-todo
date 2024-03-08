<template>
    <v-dialog
        ref="dialog"
        v-model="taskData.datePicker"
        :return-value.sync="dueDate"
        persistent
        width="290px"
      >
        <v-date-picker
          v-model="dueDate"
          :min="dateFormat"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="closeDatePicker()"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="saveDueDate()"
          >
            OK
          </v-btn>
        </v-date-picker>
    </v-dialog>
</template>
<script>
export default {
    name: 'DatePicker',

    data() {
        return {
          dateFormat: new Date().toISOString(),
          dueDate: this.taskData.dueDate !== ' '?this.taskData.dueDate : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        };
    },
    props: {
      taskData:{
        type: Object,
        default: ()=>{}
      }
    },
    computed: {
      dueDateMessage(){
        return `Due Date of "${this.taskData.title}" updated successfully!`
      }
    },
    methods: {
      saveDueDate(){
            const taskDetails = {id: this.taskData.id, message: this.dueDateMessage, dueDate: this.dueDate}
            this.$store.dispatch('updateDueDate', taskDetails)
            this.$emit('close')
        },
        closeDatePicker(){
            this.$emit('close')
        }
    },
};
</script>