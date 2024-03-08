<template>
    <v-row justify="center">
      <v-dialog
        v-model="taskData.showEditDialog"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit Task</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="updatedData.title"
                    label="Task title *"
                    outlined
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                    :items="['high', 'medium', 'low']"
                    v-model="updatedData.priority"
                    label="Task priority"
                    outlined
                  />
                </v-col>
              </v-row>
            </v-container>
            <small>* indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="updateTask"
              :disabled="!updatedData.title"
            >
              Update
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="cancelDelete"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
  <script>
  export default {
    props:{
        taskData: {
            type: Object,
            default: ()=>({}),
        }
    },
    data(){
        return {
            updatedData: {},
        }
    },
    beforeMount(){
        this.updatedData = { ...this.taskData };
    },
    methods: {
        updateTask(){
            const taskDetails = {
                id: this.taskData.id,
                title: this.updatedData.title,
                priority: this.updatedData.priority,
                done: false,
            }
            this.$store.dispatch('editTask', taskDetails)
            this.$emit('closeEditModal')
        },
        cancelDelete(){
            this.$emit('closeEditModal')
        }
    }
  }
</script>