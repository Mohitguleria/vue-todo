<template>
    <v-text-field
        v-model="searchString"
        @focus="handleFocus"
        @blur="handleBlur"
        @click:clear="handleClear"
        @input="$store.commit('setSearch', $event)"
        placeholder="Search"
        dense
        prepend-inner-icon="mdi-magnify"
        filled
        ref="target"
        class="expanding-search mt-1"
        :class="{'closed': confirmSearchClosed && emptySearchString}"
        clearable
    ></v-text-field>
</template>
<script>
export default {
    name: 'SearchTool',
    data() {
        return {
            searchString: '',
            searchClosed: true,
        };
    },
    computed:{
        confirmSearchClosed(){
            return this.searchClosed
        },
        emptySearchString(){
            return !this.searchString
        }
    },
    methods:{
        removeDynamicClass() {
            const inputElement = this.$refs.target.$el;
            inputElement.classList.remove('v-input--is-focused');
        },
        handleFocus(){
            this.searchClosed = false;
            // My shitty solution for removing the underline of the search field
            // setTimeout(()=>{
            //     this.$refs.target.$el.classList.remove('v-input--is-focused')
            // }, 0)

            
            const targetNode = this.$refs.target.$el;
            const config = { attributes: true, childList: true, subtree: true };

            const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (targetNode.classList.contains('v-input--is-focused')) {
                        this.removeDynamicClass(observer);
                    }
                }
            }
            };

            const observer = new MutationObserver(callback);
            observer.observe(targetNode, config);


            this.modifySpacer(this.searchClosed)
        },
        handleBlur(){
            if(this.emptySearchString){
                this.searchClosed = true;
                this.modifySpacer(this.searchClosed)
            }
        },
        handleClear(){
            this.searchString = ''
            this.$nextTick(() => {
                this.handleBlur()
            })
        },
        modifySpacer(searchClosed){
            this.$emit('modify-spacer', searchClosed)
        }
    }
};
</script>
<style lang="sass">
.expanding-search
    transition: max-width 1s
    .v-input__slot
        .v-input__prepend-inner
            margin-top: 6px !important
        &:before, &:after
            border-color: transparent !important
    &.closed
        max-width: 45px
        .v-input__slot
            cursor: pointer !important
            background: transparent !important
</style>