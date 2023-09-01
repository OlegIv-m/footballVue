<template>
  <div class="controls">
    <button @click="$router.go(-1)">Back</button>
    <div class="searchfilter">
      <label for="search">Winner: </label>
      <input v-model="search" id="search" />
    </div>
  </div>
  <h1 v-if="!leagues.length && !loading">
    Nothing to show, try another filter.
  </h1>
  <table class="table" v-if="leagues.length">
    <thead>
      <tr>
        <th>Id</th>
        <th>Season</th>
        <th>Winner</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="season in leagues" :key="season.id">
        <td>{{ season.id }}</td>
        <td>
          {{ season.startDate }} -
          {{ season.endDate }}
        </td>
        <td>{{ season?.winner?.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, onBeforeMount, ref, toRefs } from "vue";

import { Season } from "../models/types";
const seasons = ref<Season[]>([]);
const search = ref("");
const loading = ref(false);

const props = defineProps({
  id: Number,
});

const { id } = toRefs(props);

axios.defaults.baseURL = process.env.VUE_APP_PROXY_URL;

async function getSeasons(id: number) {
  loading.value = true;
  seasons.value = (
    await axios.get(`/v4/competitions/${id}`, {
      headers: {
        "x-auth-token": "13fffbefd9064d119b0f6f7f78176bfc",
        "Access-Control-Allow-Origin": "*",
      },
    })
  ).data.seasons;
  loading.value = false;
}

const leagues = computed(() =>
  seasons.value.filter((season) =>
    season.winner?.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

onBeforeMount(() => getSeasons(id?.value ?? 0));
</script>

<style lang="scss" scoped>
.league {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.controls {
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  margin-bottom: 12px;
}
.searchfilter {
  > input {
    height: 24px;
    width: 200px;

    font-size: 16px;
  }
}
</style>
