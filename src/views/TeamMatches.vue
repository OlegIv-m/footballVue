<template>
  <div class="controls">
    <button @click="$router.go(-1)">Back</button>
  </div>
  <table class="table" v-if="matches">
    <thead>
      <tr>
        <th>Id</th>
        <th>Area</th>
        <th>Competition Name</th>
        <th>Season</th>
        <th>Status</th>
        <th>Referee</th>
        <th>Home Team</th>
        <th>Away Team</th>
        <th>Winner</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="match in matches" :key="match.id" class="pointerless">
        <td>{{ match.id }}</td>
        <td>{{ match.area.name }}</td>
        <td>{{ match.competition.name }}</td>
        <td>
          {{ match.season.startDate }} -
          {{ match.season.endDate }}
        </td>
        <td>{{ match.status }}</td>
        <td>{{ match.homeTeam.shortName }}</td>
        <td>{{ match.awayTeam.shortName }}</td>
        <td>
          {{ match.score.winner }} -:- {{ match.score.fullTime.home }}::{{
            match.score.fullTime.away
          }}
        </td>
        <td>
          <span v-for="referee in match.referees" :key="referee.id">{{
            referee.name
          }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, toRefs } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import { Match } from "../models/types";

const matches = ref<Match[]>([]);
const router = useRouter();

const props = defineProps({
  id: Number,
});
const { id } = toRefs(props);

async function getTeamMatches(id: number) {
  try {
    matches.value = (
      await axios.get(`/v4/teams/${id}/matches`, {
        headers: {
          "x-auth-token": "13fffbefd9064d119b0f6f7f78176bfc",
          "Access-Control-Allow-Origin": "*",
        },
      })
    ).data.matches;
  } catch (error) {
    console.log("catch: ", error);
    if (axios.isAxiosError(error)) {
      alert(`${error.response?.data.message}\n You will be redirected back`);
      setTimeout(() => router.go(-1), 2000);
    }
  }
}
onBeforeMount(() => {
  if (props.id) getTeamMatches(id?.value ?? 0);
});
</script>

<style lang="scss" scoped>
.pointerless {
  &:hover {
    cursor: default;
  }
}
.controls {
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  margin-bottom: 12px;
}
</style>
