<template>
  <div class="search-item-container fade-in">
    <h1>
      {{ launch.mission_name }}
      <small>
        <span
          v-if="launch.launch_success"
          class="success"
        >success</span>
        <span
          v-else
          class="failed"
        >failed</span>
      </small>
    </h1>
    <div class="launch-content">
      <div
        v-if="!hide"
      >
        <div class="timeline">
          <span class="launch-date">{{ launch.launch_date_utc | moment("from", "now") }}</span> &nbsp;|&nbsp;
          <span v-if="launch.links.video_link"><a
            :href="launch.links.video_link"
            target="_blank"
          >Video</a></span>
          <span v-if="launch.links.article_link">&nbsp;|&nbsp;<a
            :href="launch.links.article_link"
            target="_blank"
          >Article</a></span>
        </div>
        <div class="article-container">
          <img
            v-if="launch.links.mission_patch_small"
            :src="launch.links.mission_patch_small"
            :link="launch.mission_name"
            class="fade-in"
          >
          <span v-else>No image yet.</span>
          <p
            v-if="launch.details"
            class="fade-in"
          >
            {{ launch.details }}
          </p>
          <span v-else>No details yet.</span>
        </div>
      </div>
    </div>
    <button @click="viewContent">
      <span v-if="hide">VIEW</span>
      <span v-else>HIDE</span>
    </button>
  </div>
</template>

<script>

export default {
  name: 'SearchItem',
  props: {
    launch: {
      type: [Array, Object],
      default: null
    }
  },
  data () {
    return {
      hide: true
    }
  },
  methods: {
    viewContent() {
      this.hide = !this.hide
    }
  }
};
</script>

<style lang="scss">
.search-item-container {
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 1em;

}
small {
  font-size: 14px;
}
.article-container {
  display: flex;
  img {
    height: 100px;
    padding: 0.3em;
  }
}

.failed, .success {
  font-size: 14px;
  padding: 0.2em;
  position: relative;
  top: -20px;
}
.failed {
  background-color: red;
  color: #fff;
}

.success {
  background-color: green;
  color: #000;
}

button {
  padding: 0.5em;
  margin-top: 1rem;
  background-color: #0984e3;
  border-radius: 3px;
  border: none;
  color: #fff;
}

.launch-date {
  color: #636e72;
}

.fade-in {
  animation: fadeIn 500ms;
  -webkit-animation: fadeIn 500ms;
  -moz-animation: fadeIn 500ms;
  -o-animation: fadeIn 500ms;
  -ms-animation: fadeIn 500ms;
}
@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-moz-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-o-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-ms-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
</style>