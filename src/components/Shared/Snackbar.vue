<template>
    <v-snackbar
    v-model="$store.state.snackbar.show"
    >
        {{ $store.state.snackbar.message }}
        <template v-slot:action="{ attrs }">
        <v-btn
            color="primary"
            text
            v-bind="attrs"
            @click="$store.state.snackbar.show = false"
        >
            Close
        </v-btn>
        </template>
    </v-snackbar>
</template>
<script>
export default {
    name: 'Snackbar',
};
</script>