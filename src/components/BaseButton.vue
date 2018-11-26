<template>
  <button
    class="base-button"
    @click="$emit('click', $event)"
  >{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.base-button {
  padding: 10px 40px;

  border: 1px solid #999;
  border-radius: 5px;
  outline: none;
  background: #fff;

  cursor: pointer;
}

.button:hover {
  background: #000;
  color: #fff;
  cursor: pointer;
}
</style>
