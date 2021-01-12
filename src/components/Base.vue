<template>
<div style="position: relative; background: url(assets/bg.png); background-size: 100% 100%; width: 100%; height: 100%;">
  <component :is="sceneConfig.data.type" :properties="sceneConfig.getProperties()" :sceneConfig="sceneConfig"></component>
</div>
</template>

<script>
import Tutorial from './Tutorial.vue';
import Game from './Game.vue';

export default {
  props: ['sceneConfig'],
  components: {
    Tutorial,
    Game
  }
}
</script>
