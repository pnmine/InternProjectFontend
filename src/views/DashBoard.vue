<template>
  <navigation-bar></navigation-bar>
  <div class="dash-board__container">
    <div class="dash-board__content">
      <h3 class="dash-board__title">Dashboard</h3>
      <!-- <video src="http://localhost:1234" autoplay controls></video>
      <video src="http://localhost:1233" autoplay controls></video> -->
      <!-- <video ref="video" controls></video> -->
      <!-- <div id="videoWrapper" ref="videoWrapper"></div> -->

      <!-- <canvas ref="canvas" :class=" players[0] != null && players[0].nextFrame() ? 'dash-board__canvas--is_playing' : 'dash-board__canvas--is_stop' " ></canvas> -->
      <canvas ref="canvas"></canvas>
      <!-- <div class="jsmpeg"></div> -->
      <!-- <video ref="canvas" class="dash-board__canvas"></video> -->
      <button @click="startStream">Start Stream</button>
      <button @click="stopStream">Stop Stream</button>
      <div class="dash-board__addwidget--button" >
        <button-secondary @click="addWidget">Add widget</button-secondary>
      </div>
      <div ref="gridContainer" class="grid-stack">
        <div
          v-for="widget in widgets"
          :key="widget.id"
          :id="'widget-' + widget.id"
          class="grid-stack-item"
        >
          <div class="grid-stack-item-content">
            <button-secondary>Widget {{ widget.id }}</button-secondary>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '../components/ui/NavigationBar.vue'
import ButtonSecondary from '../components/ui/ButtonSecondary.vue'
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'

import axios from '../axios'
import JSMpeg from '@cycjimmy/jsmpeg-player'
export default {
  name: 'DashboardView',
  components: {
    NavigationBar,
    ButtonSecondary
  },
  data() {
    return {
      grid: null,
      widgets: [],
      players: [],
      port: [9999, 9998],
      ws9999: new WebSocket('ws://localhost:9999')
    }
  },
  created() {},
  watch: {
    players: {
      handler(newVal, oldVal) {
        console.log('players changed')
        console.log('newVal', newVal)
        console.log('oldVal', oldVal)
      },
      deep: true
    },
    ws9999(newVal, oldVal) {
      console.log('ws9999 changed', newVal)
    }
  },
  mounted() {
    if (typeof JSMpeg == 'undefined') {
      console.error('JSMpeg not loaded. Make sure jsmpeg.min.js is included.')
      return
    } else {
      console.log('JSMpeg loaded')
      this.initializePlayers(1)
    }
    this.grid = GridStack.init(
      {
        float: true,
        minRow: 1,
        column: 12, // กำหนดจำนวนคอลัมน์
        cellHeight: 'auto'
      },
      this.$refs.gridContainer
    )
    setInterval(() => {
      if (this.players[0] != null) {
        if (this.players[0].nextFrame() == false) {
          console.log('nextFrame = false')
        }else{
          console.log('nextFrame = true')
        
        }
      }
    }, 5000)
  },
  methods: {
    addWidget() {
      const widget = {
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        column: 12, // กำหนดจำนวนคอลัมน์
        id: this.widgets.length
      }
      this.widgets.push(widget)
      this.$nextTick(() => {
        this.grid.makeWidget(`#widget-${widget.id}`)
      })
    },
    initializePlayers(numPlayers) {
      const playerObject = {
        player: null,
        is_playing: false
      }
      for (let i = 0; i < numPlayers; i++) {
        this.players.push(playerObject)
      }
      console.log('initializePlayers Success ' + numPlayers + ' players')
      console.log('this.players', this.players)
      console.log('this.players.length', this.players.length)
    },
    startStream() {
      const token = axios.defaults.headers.common.Authorization
      const canvas = this.$refs.canvas
      const numberCamera = 1
      for (let i = 0; i < numberCamera; i++) {
        console.log('i', i)
        if (this.players[i].player != null) {
          console.log('Player ' + i + ' found')
          console.log('play')
          this.players[i].player.play()
        } else {
        if (canvas) {
          console.log('Canvas element found')
          this.players[i].player = new JSMpeg.Player(
            // 'ws://192.168.1.146:1301' + '?token=' + 'bearer fegdg',
            'ws://localhost:9999' + '?token=' + token,
            {
              canvas: canvas,
              onVideoDecode: () => {
                // console.log(this.players[i].player)
              }
            }
          )
          // const player = new JSMpeg.Player(
          //   // 'ws://192.168.1.146:1301' + '?token=' + 'bearer fegdg',
          //   'ws://localhost:9999' + '?token=' + token,
          //   {
          //     canvas: canvas,
          //     loop: false,
          //     autoplay: true,
          //     onVideoDecode: () => {
          //       // console.log(this.players[i].player)
          //     },
          //     onPause: () => {
          //       console.log('pause')
          //     },
          //     onPlay: () => {
          //       console.log('play')
          //     },
          //     onEnded: () => {
          //       console.log('ended')
          //     }
          //   }
          // )
          // this.players.push(player)

          // console.log(this.players[i].player)
          console.log('JSMpeg player started')
        }
        }
      }
    }
  },
  stopStream() {
    console.log('stop')
    this.player.stop()
  },
  handleVideoDecode(decoder, time) {
    // decoder: วัตถุ decoder ที่มีข้อมูลเกี่ยวกับเฟรมวิดีโอ
    // time: timestamp ของเฟรมวิดีโอ (เป็นวินาที)

    if (decoder) {
      console.log('Frame decoded at:', time)
    }
  }
}
</script>

<style>
.dash-board__container {
  top: 0;
  right: 0;
  height: 100vh;
  /* background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
  /* background: linear-gradient(90deg, rgba(255, 255, 255, 0.4),var(--grey-050)); */
  background: var(--grey-050);
  /* background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
}

.dash-board__content {
  margin: 0 1rem;
  padding-top: 4.5rem;
}

.dash-board__title {
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
}

.grid-stack-item {
  border: 1px solid red;
}

.grid-stack-item-content {
  inset: 5px !important;
  width: 100%;
  border: 1px solid blue;
}
.dash-board__addwidget--button {
  display: flex;
  justify-content: center;
  width: 220px;
  margin: auto;
}
.dash-board__canvas {
  /*width: 1280px !important;
  height: 720px !important;*/
}
</style>
