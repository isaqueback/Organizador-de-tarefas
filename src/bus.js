import Vue from 'vue'
export default new Vue({
    methods: {
        submitTodo(todo) {
            this.$emit('submitTodo', todo)
        },
        getTodo(callback) {
            this.$on('submitTodo', callback)
        },
        submitInfo(info) {
            this.$emit('submitInfo', info)
        },
        getInfo(callback) {
            this.$on('submitInfo', callback)
        }
    }
})