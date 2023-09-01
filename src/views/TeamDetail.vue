<template>
  <div class="controls">
    <button @click="$router.go(-1)">Back</button>
    <button @click="$router.push(`/teams/${id}/matches`)">Matches</button>
  </div>
  <div v-if="team.coach">
    <h3>Couch</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>LastName</th>
          <th>Nationality</th>
          <th>dateOfBirth</th>
          <th>Contract</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ team.coach.id }}</td>
          <td>{{ team.coach.name }}</td>
          <td>{{ team.coach.lastName }}</td>
          <td>{{ team.coach.nationality }}</td>
          <td>{{ team.coach.dateOfBirth }}</td>
          <td>
            {{ team.coach.contract.start }} -:- {{ team.coach.contract.until }}
          </td>
        </tr>
      </tbody>
    </table>
    <router-view></router-view>
  </div>

  <div v-if="team.staff?.length">
    <h3>Staff</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>LastName</th>
          <th>Nationality</th>
          <th>dateOfBirth</th>
          <th>Contract</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="staff in team.staff" :key="staff.id">
          <td>{{ staff.id }}</td>
          <td>{{ staff.name }}</td>
          <td>{{ staff.lastName }}</td>
          <td>{{ staff.nationality }}</td>
          <td>{{ staff.dateOfBirth }}</td>
          <td>{{ staff.contract.start }} -:- {{ staff.contract.until }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="team.squad.length">
    <h3>Players</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Position</th>
          <th>Nationality</th>
          <th>dateOfBirth</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in team.squad" :key="player.id">
          <td>{{ player.id }}</td>
          <td>{{ player.name }}</td>
          <td>{{ player.position }}</td>
          <td>{{ player.nationality }}</td>
          <td>{{ player.dateOfBirth }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { onBeforeMount, ref, defineComponent } from "vue";

import { Team } from "../models/types";

export default defineComponent({
  props: {
    id: Number,
  },
  setup(props) {
    const data = ref<Team>(Object());
    const search = ref("");
    const loading = ref(false);

    axios.defaults.baseURL = process.env.VUE_APP_PROXY_URL;

    async function getTeamById(id: number) {
      loading.value = true;
      data.value = (
        await axios.get(`/v4/teams/${id}`, {
          headers: {
            "x-auth-token": "13fffbefd9064d119b0f6f7f78176bfc",
            "Access-Control-Allow-Origin": "*",
          },
        })
      ).data;
      loading.value = false;
    }

    onBeforeMount(async () => getTeamById(props.id ?? 0));
    return {
      team: data,
      search,
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
</style>
