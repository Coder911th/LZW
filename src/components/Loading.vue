<template>
  <div class="loading"/>
</template>

<script>
export default {
}
</script>

<style scoped>
@keyframes rotation {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg)
  }
}

.loading {
  width: 100px;
  height: 100px;
  animation: rotation linear 3s infinite;
  background: url(../assets/loading.svg) no-repeat top left/ 100% 100%;
}
</style>
