<template>
  <div
    class="row"
    :style="computedStyles"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    jc: {
      type: String,
      default: 'flex-start'
    },
    ai: {
      type: String,
      default: 'stretch'
    }
  },
  computed: {
    computedStyles() {
      return {
        justifyContent: this.jc,
        alignItems: this.ai
      }
    }
  }
}
</script>

<style>
.row {
  display: flex;
}
</style>
