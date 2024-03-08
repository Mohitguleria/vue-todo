<template>
    <div>
        <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
                <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="handleClick(index)"
                :disabled="setDisabled(taskData, item)"
                >
                    <v-list-item-icon>
                        <v-icon :class="{'iconDisabled':item.disabled}" v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
        <edit-task-dialog v-if="editDialog" :taskData="taskData" @closeEditModal="editDialog = false"/>
        <delete-confirmation v-if="dialog" :taskData="taskData" @close="dialog = false" />
        <DatePicker v-if="datePickerSwitch" :taskData="taskData" @close="datePickerSwitch = false"/>
    </div>
</template>
<script>
import DeleteConfirmation from "@/components/Shared/DeleteConfirmation.vue"
import EditTaskDialog from "@/components/todo/EditTaskDialog.vue"
import DatePicker from "@/components/Shared/DatePicker.vue"
export default {
    name: 'TaskMenu',
    components: {
        EditTaskDialog,
        DeleteConfirmation,
        DatePicker
    },
    props:{
        taskData: {
            type: Object,
            default: ()=>({})
        }
    },
    data() {
        return {
            dialog: false,
            editDialog: false,
            datePickerSwitch: false,
            items: [
                {
                    title: 'Edit',
                    icon: 'mdi-pencil',
                    disbled: null,
                    click(){
                        this.showEditModal(this.taskData)
                    }
                },
                {
                    title: 'Mark Incomplete',
                    icon: 'mdi-restart-alert',
                    disbled: null,
                    click(){
                        this.$store.dispatch('markTaskIncomplete', this.taskData.id)
                    }
                },
                {
                    title: 'Due Date',
                    icon: 'mdi-calendar',
                    disbled: null,
                    click(){
                        this.openDatePicker(this.taskData)
                        
                    }
                },
                {
                    title: 'Delete',
                    icon: 'mdi-delete',
                    click(){
                        this.showDeleteModal(this.taskData)
                    }
                },
            ]
        };
    },
    computed:{
        compEditDisabled(){
            return this.items[0].disabled;
        },
        compMarkInCompDisabled(){
            return this.items[1].disabled;
        },

    },
    methods: {
        handleClick(index){
            this.items[index].disabled = this.taskData.done
            this.items[index].click.call(this);
        },
        setDisabled(taskData, item){
            if(taskData.done){
                this.items[0].disabled = true
                this.items[1].disabled = false
                this.items[2].disabled = true
                return item.disabled
            }else {
                this.items[0].disabled = false
                this.items[1].disabled = true
                this.items[2].disabled = false
                return item.disabled
            }
        },
        showEditModal(task){
            task.showEditDialog = this.editDialog = true;
        },
        showDeleteModal(task){
            task.show = this.dialog = true;
        },
        openDatePicker(task){
        task.datePicker = this.datePickerSwitch = true;
        }
    },
};
</script>
<style scoped>
.iconDisabled {
    color: rgba(0, 0, 0, 0.38) !important;
}
    
</style>