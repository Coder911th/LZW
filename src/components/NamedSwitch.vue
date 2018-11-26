<template>
  <div class="named-switch">
    <div 
      class="button left"
      :class="{ active: active === 'left' }"
      @click="switchToLeft"
    >{{ leftText }}</div>
    <div 
      class="button right"
      :class="{ active: active === 'right' }"
      @click="switchToRight"
    >{{ rightText }}</div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    leftText: {
      type: String,
      required: true
    },
    rightText: {
      type: String,
      required: true
    },
    active: {
      type: String,
      default: 'left',
      validator(value) {
        return value === 'left' || value === 'right'
      }
    }
  },
  methods: {
    switchToLeft() {
      if (this.active != 'left')
        this.$emit('change', 'left')
    },
    switchToRight() {
      if (this.active != 'right')
        this.$emit('change', 'right')
    }
  }
}
</script>

<style scoped>
.named-switch {
  display: inline-flex;
  
  border-radius: 10px;
  background: #eee;
}

.button {
  width: 150px;
  padding: 10px;
  border: 1px solid #777;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.button:hover {
  background: #ccc;
}

.button.active {
  background: #999;
  color: #f0f0f0;
  cursor: default;
}

.left {
  padding-right: 15px;
  border-radius: 5px 0 0 5px;
}

.right {
  padding-left: 15px;
  border-left: none;
  border-radius: 0 5px 5px 0;
}
</style>
