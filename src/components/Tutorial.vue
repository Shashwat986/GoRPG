<template>
<div style="position: relative; width: 100%; height: 100%;">
  <div style="width: 45%; height: 80%; top: 10%; left: 5%; position: absolute;">
    <div
      class="game-board"
      ref="board"
      panels="control">
    </div>
  </div>
  <div style="left: 55%; top: 10%; height: 80%; width: 40%; position: absolute;">
    <div>
      <h2>
        {{properties.title}}
      </h2>
    </div>
    <div v-html="currentInstruction.text"></div>
    <div>
      <button
        @click="updateInstruction(-1)"
        :disabled="(instructionID == 0)">Previous</button>
      <button
        @click="updateInstruction(1)"
        :disabled="!(instructionID < properties.instructions.length - 1)">Next</button>
      <button
        @click="setupBoard">Reset</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['properties'],
  data () {
    return {
      game: null,
      instructionID: 0
    }
  },
  computed: {
    currentInstruction () {
      return this.properties.instructions[this.instructionID]
    }
  },
  methods: {
    updateInstruction (delta) {
      this.instructionID += delta;
      this.setupBoard()
    },
    setupBoard() {
      this.$refs.board.innerHTML = this.currentInstruction.sgf;

      this.board = besogo.create(this.$refs.board, {
        panels: [],
        tool: this.currentInstruction.editor,
        path: this.currentInstruction.path,
        nowheel: true
      })
    }
  },
  mounted () {
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
</style>
