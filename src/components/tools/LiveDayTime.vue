<template>
    <div class="text-subtitle-1">
        {{ date }}
    </div>
</template>
<script>
import dayjs from 'dayjs';
export default {
    data(){
        return {
            date: ''
        }
    },
    methods: {
        dateTime(){
            this.date = dayjs().format('MMMM DD, ddd, HH:mm');
            setTimeout(this.dateTime, 60000);
        }
    },
    mounted(){
        this.dateTime()
    }
}
</script>