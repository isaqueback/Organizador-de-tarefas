<template>
  <div class="cards">
    <div
      class="card"
      v-for="(todo, index) in tasks"
      :key="todo.id"
      @click="conclude(index)"
    >
      <div
        :class="{
          'todo-incomplete': !todo.complete,
          'todo-complete': todo.complete,
        }"
      >
        {{ todo.text }}
      </div>
      <div
        :class="{
          'cancel-incomplete': !todo.complete,
          'cancel-complete': todo.complete,
        }"
      >
        <span
          :class="{
            'x-incomplete': !todo.complete,
            'x-complete': todo.complete,
          }"
          @click="removeTask(index, $event)"
          >x</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../bus";

export default {
  created() {
    bus.getTodo((todo) => {
      const id = this.id + 1;
      this.id++;
      this.tasks.push({ id, complete: false, text: todo });
    });
  },
  data() {
    return {
      completeTasks: [],
      id: 0,
      tasks: [],
    };
  },
  methods: {
    conclude(index) {
      this.tasks[index].complete = !this.tasks[index].complete;
      this.completeTasks = [];

      this.tasks.forEach((todo) => {
        if (todo.complete == true) {
          this.completeTasks.push(todo.complete);
        }
      });

      bus.submitInfo({
        length: this.tasks.length,
        completeTasks: this.completeTasks.length,
      });
    },
    removeTask(index, e) {
      this.tasks.splice(index, 1)
      e.stopPropagation()
    }
  },
  watch: {
    tasks(newValue) {
      this.tasks = newValue;
      this.completeTasks = [];

      this.tasks.forEach((todo) => {
        if (todo.complete == true) {
          this.completeTasks.push(todo.complete);
        }
      });
      bus.submitInfo({
        length: this.tasks.length,
        completeTasks: this.completeTasks.length,
      });
    },
  },
};
</script>

<style>
.cards {
  margin-top: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
}

.card {
  display: flex;
  flex-flow: row nowrap;
  margin: 0 10px 10px;
}

.todo-incomplete,
.todo-complete {
  align-items: center;
  background-color: #e25242;
  border-left: 7px solid #a14740;
  border-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  display: flex;
  font-size: 1.2em;
  font-weight: 300;
  height: 100px;
  justify-content: center;
  width: 200px;
}

.todo-complete {
  background-color: #67aa5c;
  border-left: 7px solid #448830;
  text-decoration: line-through;
}

.cancel-incomplete,
.cancel-complete {
  display: flex;
  justify-content: stretch;
  background: #e25242;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.cancel-complete {
  background: #67aa5c;
}

.x-incomplete,
.x-complete {
  align-items: center;
  background-color: #a14740;
  border-radius: 13px;
  cursor: pointer;
  display: flex;
  font-size: 0.6em;
  justify-content: center;
  margin: 4px 4px 0 0;
  padding-bottom: 2px;
  width: 15px;
  height: 13px;
}

.x-complete {
  background-color: #448830;
}
</style>