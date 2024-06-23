<template>
  <navigation-bar></navigation-bar>
  <div class="container">
    <div class="containner__content">
      <h3>DashBroad</h3>
      <div class="grid-stack" id="grid-stack">
        <div
          class="grid-stack-item"
          v-for="video in videos"
          :key="video.id"
          :data-gs-x="video.x"
          :data-gs-y="video.y"
          :data-gs-width="video.width"
          :data-gs-height="video.height"
        >
          <div class="grid-stack-item-content">
            <video :src="video.src" controls></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavigationBar from '../components/ui/NavigationBar.vue'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.css'; // Import CSS

export default {
  name: 'HomeView',
  components: {
    NavigationBar
  },
  data() {
    return {
      videos: [
        { id: 1, src: 'path/to/video1.mp4', x: 0, y: 0, width: 4, height: 3 },
        { id: 2, src: 'path/to/video2.mp4', x: 4, y: 0, width: 4, height: 3 },
        { id: 3, src: 'path/to/video3.mp4', x: 0, y: 3, width: 4, height: 3 },
        { id: 4, src: 'path/to/video4.mp4', x: 4, y: 3, width: 4, height: 3 }
      ]
    }
  },
  mounted() {
    // Initialize GridStack after the component is mounted
    this.grid = GridStack.init({
      float: true, // Allow dragging and resizing
      cellHeight: 180, // Adjust cell height as needed (หน่วยเป็นพิกเซล)
      margin: 10 // Add margin between items
    })
  },
  methods: {}
}
</script>
<style scoped>
.container {
  top: 0;
  right: 0;
  height: 100vh;
  background: var(--grey-050);
}
.containner__content {
  margin: 0 1rem;
  padding-top: 4.5rem;
}
.grid-stack {
  border:1px solid red;
  width: 100%;
}
.grid-stack-item-content{
  border:1px solid blue;

}
.grid-stack-item-content video{
  border:1px solid green;
}
</style>
