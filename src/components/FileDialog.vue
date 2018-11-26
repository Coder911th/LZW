<template>
  <div class="file-dialog">
    <input
      type="file"
      :nwsaveas="type === 'save' ? '' : undefined"
      @change="path=$event.target.value"
    >
    <text-box-with-button
        buttonText="Browse"
        fieldPlaceholder="Select a file"
        :borderRadius="borderRadius"
        :fieldDisabled="fieldDisabled"
        v-model="path"
        @click="openDialog"
      />  
  </div>
</template>

<script>
import TextBoxWithButton from './TextBoxWithButton'

export default {
  props: {
    borderRadius: {
      type: Number,
      default: 5,
      validator(value) {
        return value >= 0
      }
    },
    fieldDisabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'open',
      validator(value) {
        return value === 'open' || value === 'save'
      }
    }
  },
  data() {
    return {
      path: this.value
    }
  },
  watch: {
    path(to, from) {
      this.$emit('input', to)
    }
  },
  methods: {
    openDialog(ev) {
      ev.target.parentNode.previousElementSibling.click()
    }
  },
  components: { TextBoxWithButton }
}
</script>

<style scoped>
input[type="file"] {
  display: none;
}
</style>
