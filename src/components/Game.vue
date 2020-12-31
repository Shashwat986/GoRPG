<template>
<div style="position: relative; width: 100%; height: 100%;">
  <div style="width: 65%; height: 80%; top: 10%; left: 5%; position: absolute;">
    <div
      :class="['game-board', 'board-background-' + data.boardSettings.background]"
      ref="board"
      panels="control">
    </div>
  </div>
  <div style="left: 75%; top: 10%; height: 80%; width: 25%; position: absolute;">
    <div>
      <h2>
        {{data.title}}
      </h2>
    </div>
    <div v-html="data.text"></div>
    <div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    setupBoard() {
      this.$refs.board.innerHTML = this.data.boardSettings.sgf;

      this.board = besogo.create(this.$refs.board, {
        panels: [],
        tool: 'playWithoutUndo',
        nowheel: true,
        nokeys: true,
        customstones: this.data.boardSettings.customstones
      })

      this.board.editor.addListener((data) => {
        console.log(this, data);
      });
    }
  },
  mounted () {
    window.vm = this;
    console.log(JSON.stringify(this.data));
    this.$nextTick(() => {
      this.setupBoard()
    })
  }
}
</script>

<style lang="scss">
  .game-board {
    width: 100% !important;
    height: 100% !important;
  }

  .game-board.besogo-container {
    background: inherit;
  }

  .board-background-water {
    .besogo-svg-board {
      fill: #6688cd;
    }
  }
</style>
