<template>
  <div class="controls">
    <button @click="$router.go(-1)" class="backButton">Back</button>
    <div class="searchfilter">
      <label for="select">Areas: </label>
      <select id="select" v-model="selectedArea" multiple>
        <option v-for="area in areas" :key="area.id" :value="area.id">
          {{ area.name }}
        </option>
      </select>
    </div>
  </div>
  <h1 v-if="!leagues.length && !loading">
    Nothing to show, try another filter.
  </h1>
  <table class="table" v-if="leagues.length">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Area</th>
        <th>Type</th>
        <th>Current Season</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="league in leagues"
        :key="league.id"
        @click="goToSelectedLeague(league.id)"
        class="hovered"
      >
        <td>{{ league.id }}</td>
        <td>{{ league.name }}</td>
        <td>{{ league.area.name }}</td>
        <td>{{ league.type }}</td>
        <td>
          {{ league.currentSeason.startDate }} -:-
          {{ league.currentSeason.endDate }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";

import { Area, Competition } from "../models/types";

export default defineComponent({
  setup() {
    const competitions = ref<Competition[]>([]);
    const areas = ref<Area[]>([]);
    const loading = ref(false);
    const selectedArea = ref<number[]>([0]);
    const router = useRouter();

    function goToSelectedLeague(id: number) {
      router.push(`league/${id}`);
    }

    axios.defaults.baseURL = process.env.VUE_APP_PROXY_URL;

    async function getLeagues(areasIds: number[]) {
      loading.value = true;
      competitions.value = (
        await axios.get(`/v4/competitions/`, {
          headers: {
            "x-auth-token": "13fffbefd9064d119b0f6f7f78176bfc",
            "Access-Control-Allow-Origin": "*",
            "Referrer-Policy": "no-referrer",
            "Sec-Fetch-Mode": "no-cors",
          },
          params: {
            ...(areasIds.length && {
              areas: areasIds.toString(),
            }),
          },
        })
      ).data.competitions;
      loading.value = false;
    }

    async function getAreas() {
      areas.value = (
        await axios.get("/v4/areas/", {
          headers: {
            "x-auth-token": "13fffbefd9064d119b0f6f7f78176bfc",
            "Access-Control-Allow-Origin": "*",
          },
        })
      ).data.areas;
    }

    onBeforeMount(async () => {
      getLeagues([]);
      getAreas();
    });

    watch(selectedArea, (newValue) => {
      if (newValue.length) getLeagues(newValue);
    });

    return {
      leagues: competitions,
      areas,
      goToSelectedLeague,
      selectedArea,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.hovered {
  &:hover {
    background-color: lightgreen;
    cursor: pointer;
  }
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 12px;
}

.backButton {
  max-height: 20px;
}
</style>
