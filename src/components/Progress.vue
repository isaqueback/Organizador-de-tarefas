<template>
  <div class="progress">
    <span class="percentage" :style="{width: calcPercentage() + '%'}">
      <span class="total">{{ calcPercentage() }}</span>
    </span>
  </div>
</template>

<script>
import bus from "../bus";

export default {
  created() {
    bus.getInfo((info) => {
      this.info = info;
    });
  },
  data() {
    return {
      info: "",
    };
  },
  methods: {
    calcPercentage() {
      const percentage = ((this.info.completeTasks / this.info.length) * 100).toFixed(0)
      if(isNaN(percentage)) {
        return 0
      } else {
        return percentage
      }
    }
  }
};
</script>

<style>
.progress {
  border: 1px solid #ffffff5f;
  border-radius: 5px;
  display: flex;
  justify-content: left;
  height: 20px;
  width: 80%;
  overflow: hidden;
}

.percentage {
  background-color: #67aa5c;
  height: 100%;
  width: 80%;
}

.total {
  position: absolute;
  left: 49%;
}
</style>