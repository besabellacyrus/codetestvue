<template>
  <div class="search-container">
    <input
      v-model="search"
      type="text"
      class="search-input"
      placeholder="Search..."
    >
    <SearchItem
      v-for="launch in launchesFiltered"
      :key="launch.id"
      :launch="launch"
    />
    <div
      v-if="launches.length && !isSearching"
      v-observe-visibility="bottomTrigger"
    />
    <div
      v-if="getIsLoading && !getIsFinish && !isSearching"
      class="spinner-container"
    >
      <Spinner />
    </div>
    <div
      v-if="getIsFinish"
      class="footer"
    >
      End of list.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchItem from './SearchItem.vue'
import Spinner from './Spinner.vue'

const INCREMENT = 5

export default {
  name: 'Search',
  components: {
    SearchItem,
    Spinner
  },
  data () {
    return {
      search: '',
      launches: [],
      launchesFiltered: [],
      offSet: 0,
      isSearching: false
    }
  },
  computed: {
    ...mapGetters([
      'getLaunches',
      'getIsLoading',
      'getIsFinish'
    ])
  },
  watch: {
    search (newVal) {
      this.isSearching = true
      this.fetchFiltered(newVal)
      if (newVal === '') {
        this.launchesFiltered = []
        this.offSet = 0;
        this.isSearching = false
        this.launches = []
        this.fetchLaunches()
      }
    }
  },
  mounted () {
    this.fetchLaunches()
  },
  methods: {
    fetchFiltered(search) {
      let s = this.launches.filter((m) => {
        let name = m.mission_name.toLowerCase();
        return name == search.toLowerCase()
      })

      this.launchesFiltered = []
      this.launchesFiltered.push(...s)
    },
    async fetchLaunches() {
      await this.$store.dispatch('fetchLaunches', this.offSet)
      if (!this.getIsFinish) {
        this.launches.push(...this.getLaunches)
        this.launchesFiltered.push(...this.getLaunches)
      }
    },
    bottomTrigger (isVisible) {
      if (!isVisible) {
        return
      }
      this.offSet = this.offSet + INCREMENT;
      this.fetchLaunches();
    },
  }
};
</script>

<style lang="scss">
.spinner-container {
  width: 200px;
}
.search-input {
  width: 100%;
  margin-bottom: 1em;;
}
.footer {
  text-align: center;
}
</style>