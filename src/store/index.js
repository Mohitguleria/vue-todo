import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db');

db.config.debug = false // comment this to see the logs from localbase IndexedDB

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: process.env.VUE_APP_TITLE,
    searchString: '',
    tasks: [
      // {
      //   id: 1,
      //   title: 'Read Book',
      //   done: false,
      //   dueDate: ' ', //(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      //   priority: 'high',
      // },
      // {
      //   id: 2,
      //   title: 'Practice Coding',
      //   done: false,
      //   dueDate: ' ',//(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      //   priority: 'medium',
      // },
      // {
      //   id: 3,
      //   title: 'Perform daily exercise',
      //   done: false,
      //   dueDate: ' ',//(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      //   priority: 'low',
      // },
    ],
    snackbar: {
      show: false,
      message: "",
    }
  },
  getters: {
    filteredTasks(state){
      if(!state.searchString){
        return state.tasks
      }
      return state.tasks.filter(task=>task.title.toLowerCase().includes(state.searchString.toLowerCase()))
    }
  },
  mutations: {
    setSearch(state, searchString){
      state.searchString = searchString
    },
    addTask(state,newTask){
      state.tasks.push(newTask)
    },
    markTaskDone(state, taskId){
      let task = state.tasks.filter(task =>taskId === task.id)[0]
      task.done = true
    },
    markTaskIncomplete(state, taskId){
      let task = state.tasks.filter(task =>taskId === task.id)[0]
      task.done = false
    },
    deleteTask(state,taskId){
      state.tasks.forEach((task,i) =>{
        if(taskId === task.id){
          state.tasks.splice(i, 1)
        }
      })
    },
    editTask(state, taskDetails){
      let task = state.tasks.filter(task =>taskDetails.id === task.id)[0]
      task.title = taskDetails.title;
      task.priority = taskDetails.priority;
      task.done = false;
    },
    updateDueDate(state, taskDetails){
      let task = state.tasks.filter(task =>taskDetails.id === task.id)[0]
      task.dueDate = taskDetails.dueDate
    },
    updateListOrder(state, tasks){
      state.tasks = tasks
    },
    showSnackbar(state, message){
      let timeOut = 0;
      if(state.snackbar.show){
        state.snackbar.show = false
        timeOut = 300;
      }
      setTimeout(()=>{
        state.snackbar.show = true
        state.snackbar.message = message
      },timeOut)
    }
  },
  actions: {
    addTask({ commit }, taskDetails){
      let newTask = {
        id: Date.now(),
        title: taskDetails.title,
        done: false,
        dueDate: null,
        priority: 'medium',
      }

      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', taskDetails.message)
      })
    },
    getTasks({ commit }){
      db.collection('tasks').get().then(tasks => {
        commit('updateListOrder', tasks)
      })
    },
    markTaskDone({ state, commit }, taskId){
      let task = state.tasks.filter(task =>taskId === task.id)[0]
      db.collection('tasks').doc({ id: taskId }).update({
        done: !task.done
      }).then(() => {
        commit('markTaskDone', taskId)
      })
    },
    markTaskIncomplete({ commit }, taskId){
      db.collection('tasks').doc({ id: taskId }).update({
        done: false
      }).then(() => {
        commit('markTaskIncomplete', taskId)
      })
    },
    deleteTask({ commit }, taskDetails){
      db.collection('tasks').doc({id: taskDetails.taskId}).delete().then(() => {
        commit('deleteTask', taskDetails.taskId)
        commit('showSnackbar', taskDetails.message)
      })
    },
    editTask({ commit }, taskDetails){
      db.collection('tasks').doc({id: taskDetails.id}).update({
        title: taskDetails.title,
        priority: taskDetails.priority
      }).then(() => {
        commit('editTask', taskDetails)
        commit('showSnackbar', `Updated "${taskDetails.title}" successfully!`)
      })
    },
    updateDueDate({commit}, taskDetails){
      db.collection('tasks').doc({id: taskDetails.id}).update({
        dueDate: taskDetails.dueDate
      }).then(() => {
        commit('updateDueDate', taskDetails)
        commit('showSnackbar', taskDetails.message)
      })
    },
    updateListOrder({ commit }, tasks){
      // state.tasks = tasks
      db.collection('tasks').set(tasks).then(() => {
        commit('updateListOrder', tasks)
      })
    },
  },
  modules: {
  }
})
