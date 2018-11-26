<template>
  <label
    class="form-item"
  >
    <div class="title">{{ text }}</div>
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.form-item {
  display: block;
}

.title {
  padding: 5px 0 5px 15px;
}
</style>
