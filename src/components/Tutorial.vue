<template>
<div style="position: relative; width: 100%; height: 100%;">
  <div style="width: 45%; height: 80%; top: 10%; left: 5%; position: absolute;">
    <div class="besogo-editor tenuki-board" ref="board" panels="">(;FF[4]GM[1]SZ[5]AB[bc][cb][cd]AW[cc])</div>
  </div>
  <div style="left: 55%; top: 10%; height: 80%; width: 40%; position: absolute;">
    <div>
      <h2>
        {{data.title}}
      </h2>
    </div>
    <div>
      {{ currentInstruction.text }}

    </div>
    <div>
      <button
        @click="updateInstruction(-1)"
        :disabled="(instructionID == 0)">Previous</button>
      <button
        @click="updateInstruction(1)"
        :disabled="!(instructionID < data.instructions.length - 1)">Next</button>
      <button
        @click="setupBoard">Reset</button>
    </div>
  </div>
</div>
</template>

<script>
import { Game } from 'tenuki';
export default {
  props: ['data'],
  data () {
    return {
      game: null,
      instructionID: 0
    }
  },
  computed: {
    currentInstruction () {
      return this.data.instructions[this.instructionID]
    }
  },
  methods: {
    updateInstruction (delta) {
      this.instructionID += delta;
      this.setupBoard()
    },
    setupBoard() {
      this.$refs.board.innerHTML = "";
      this.game = new Game({
        element: this.$refs.board,
        boardSize: this.data.boardSize
      })

      for (let elem of this.currentInstruction.setup) {
        if (elem === "pass") {
          this.game.pass()
        } else {
          this.game.playAt.apply(this.game, elem)
        }
      }

    }
  },
  mounted () {
    // this.setupBoard()
    this.$nextTick(() => {
      besogo.autoInit()
    })
  }
}
</script>

<style lang="scss">
  .tenuki-board {
    width: 100% !important;
    height: 100% !important;
  }
</style>
