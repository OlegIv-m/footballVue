<template>
  <div class="controls">
    <button @click="$router.go(-1)">Back</button>
    <div class="searchfilter">
      <label for="search">Team: </label>
      <input v-model="search" id="search" />
    </div>
  </div>
  <h1 v-if="!filteredTeams.length">Nothing to show, try another filter.</h1>
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
import axios from "axios";
import { defineComponent, onBeforeMount, ref, computed } from "vue";

import { Command } from "../models/types";

export default defineComponent({
  setup() {
    const data = ref<Command[]>([]);
    const search = ref("");
    const teams = computed(() =>
      data.value.filter((team) =>
        team.name.toLowerCase().includes(search.value.toLowerCase())
      )
    );

    async function getTeams() {
      data.value = (
        await axios.get("v4/teams", {
          headers: {
            "x-auth-token": "13fffbefd9064d119b0f6f7f78176bfc",
            "Access-Control-Allow-Origin": "*",
          },
        })
      ).data.teams;
      console.log("teams: ", data.value);
    }

    onBeforeMount(async () => getTeams());

    return {
      teams: data,
      search,
      filteredTeams: teams,
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
