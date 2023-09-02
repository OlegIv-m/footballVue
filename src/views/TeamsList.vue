<template>
  <div class="controls">
    <button @click="$router.go(-1)">Back</button>
    <div class="searchfilter">
      <label for="search">Team: </label>
      <input v-model="search" id="search" />
    </div>
  </div>
  <h1 v-if="!filteredTeams.length && !loading">
    Nothing to show, try another filter.
  </h1>
  <table class="table" v-if="filteredTeams.length">
    <thead>
      <tr>
        <th>Id</th>
        <th>Address</th>
        <th>Name</th>
        <th>Website</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="team in filteredTeams"
        :key="team.id"
        @click="$router.push(`./teams/${team.id}`)"
        class="hovered"
      >
        <td>{{ team.id }}</td>
        <td>{{ team.address }}</td>
        <td class="crest">
          <img height="16" width="20" :src="team.crest" />{{ team.name }}
        </td>
        <td>{{ team.website }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, computed } from "vue";
import { isAxiosError } from "axios";

import { Command } from "../models/types";
import axios from "../config/axios";

export default defineComponent({
  setup() {
    const data = ref<Command[]>([]);
    const search = ref("");
    const loading = ref(false);
    const teams = computed(() =>
      data.value.filter((team) =>
        team.name.toLowerCase().includes(search.value.toLowerCase())
      )
    );

    async function getTeams() {
      loading.value = true;
      try {
        data.value = (await axios.get("v4/teams")).data.teams;
      } catch (error) {
        console.log("catch: ", error);
        if (isAxiosError(error)) {
          alert(`${error.response?.data.message}`);
        }
      }
      loading.value = false;
    }

    onBeforeMount(async () => getTeams());

    return {
      teams: data,
      search,
      filteredTeams: teams,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  margin-bottom: 12px;
}

.team {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.teams {
  background-color: lightgray;

  th,
  td {
    text-align: left;
  }
  th {
    background-color: black;
    color: white;
  }
}

.hovered {
  &:hover {
    background-color: lightgreen;
    cursor: pointer;
  }
}

.crest {
  display: flex;
  justify-content: flex-start;
  gap: 12px;
}
</style>
