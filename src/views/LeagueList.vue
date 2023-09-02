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
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { isAxiosError } from "axios";

import { Area, Competition } from "../models/types";
import axios from "../config/axios";

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

    async function getLeagues(areasIds: number[]) {
      loading.value = true;
      try {
        competitions.value = (
          await axios.get(`/v4/competitions/`, {
            params: {
              ...(areasIds.length && {
                areas: areasIds.toString(),
              }),
            },
          })
        ).data.competitions;
      } catch (error) {
        console.log("catch: ", error);
        if (isAxiosError(error)) {
          alert(
            `${error.response?.data.message}\n You will be redirected back`
          );
          setTimeout(() => router.go(-1), 2000);
        }
      }
      loading.value = false;
    }

    async function getAreas() {
      try {
        areas.value = (await axios.get("/v4/areas/")).data.areas;
      } catch (error) {
        console.log("catch: ", error);
        if (isAxiosError(error)) {
          alert(
            `${error.response?.data.message}\n You will be redirected back`
          );
          setTimeout(() => router.go(-1), 2000);
        }
      }
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
