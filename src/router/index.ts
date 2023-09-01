import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LeagueList from "../views/LeagueList.vue";
import LeagueDetail from "../views/LeagueDetail.vue";
import TeamsList from "../views/TeamsList.vue";
import TeamDetail from "../views/TeamDetail.vue";
import TeamMatches from "../views/TeamMatches.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/league",
    name: "league",
    component: LeagueList,
  },
  {
    path: "/league/:id",
    name: "leagueDetail",
    component: LeagueDetail,
    props: true,
  },
  {
    path: "/teams",
    name: "teams",
    component: TeamsList,
  },
  {
    path: "/teams/:id",
    name: "teamDetail",
    component: TeamDetail,
    props: true,
  },
  {
    path: "/teams/:id/matches",
    name: "teamMatches",
    component: TeamMatches,
    props: true,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
