<template>
  <div class="search">
    <input
      class="searcher"
      type="text"
      placeholder="Nova tarefa?"
      @keyup.enter="add"
      v-model="todo"
    />
    <div class="enter" @click="add">+</div>
  </div>
</template>

<script>
import bus from "../bus";

export default {
  data() {
    return {
      todo: "",
    };
  },
  methods: {
    add() {
      bus.submitTodo(this.todo);
      this.todo = "";
    },
  },
};
</script>

<style>
.search {
  margin-top: 30px;
  display: flex;
}

.searcher {
  background-color: #00000000;
  border: 1px solid white;
  border-radius: 5px 0 0 5px;
  color: white;
  font-size: 1.1em;
  padding: 10px;
  outline: none;
  width: 275px;
}

.enter {
  align-items: center;
  background-color: #4a94ed;
  border: 1px solid white;
  border-left: 0px;
  border-radius: 0 5px 5px 0;
  display: flex;
  font-size: 1.5em;
  font-weight: 300;
  justify-content: center;
  width: 40px;
}
</style>