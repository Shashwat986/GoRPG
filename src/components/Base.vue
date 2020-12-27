<template>
<div style="position: relative; background: url(assets/bg.png); background-size: 100% 100%; width: 100%; height: 100%;">
  <component :is="data.type" :data="data"></component>
</div>
</template>

<script>
import Tutorial from './Tutorial.vue';

export default {
  props: ['data'],
  components: {
    Tutorial
  }
}
</script>
