<template>
  <div class="text-box-with-button">
    <input 
      type="text"
      class="field"
      :style="{ borderRadius: `${this.borderRadius}px 0 0 ${this.borderRadius}px` }"
      :placeholder="fieldPlaceholder"
      :disabled="fieldDisabled"
      :value="fieldText"
      @input="$emit('input', $event.target.value)"
    >
    <button
      class="button"
      :style="{ borderRadius: `0 ${this.borderRadius}px ${this.borderRadius}px 0` }"
      :disabled="buttonDisabled"
      @click="$emit('click', $event)"
    >{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'fieldText'
  },
  props: {
    buttonText: {
      type: String,
      required: true
    },
    fieldPlaceholder: {
      type: String,
      default: ''
    },
    borderRadius: {
      type: Number,
      default: 5,
      validator(value) {
        return value >= 0
      }
    },
    buttonDisabled: {
      type: Boolean,
      default: false
    },
    fieldDisabled: {
      type: Boolean,
      default: false
    },
    fieldText: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.text-box-with-button {
  display: flex;
}

.field {
  width: 100%;
  flex: 1 1;
  padding: 5px 7px;

  border: 1px solid #aaa;
  border-right: none;
  outline: none;
}

.button {
  flex: 0 1 auto;
  padding: 5px 15px;

  border: 1px solid #aaa;
  border-radius: 0 5px 5px 0;
  outline: none;

  cursor: pointer;
}

.button:hover {
  background: #ccc;
}

.button:active {
  background: #999;
  border-color: #999;
}
</style>
