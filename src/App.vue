<template>
  <div class="">
    <splash @onLogin="onLogin" v-show="router == 'splash'"></splash>
    <layout v-show="router == 'layout'" @logout="logout"></layout>
    <!-- <lab v-show="router=='lab'"></lab> -->
  </div>
</template>

<script>
import splash from "./views/splash.vue"
import layout from "./components/layout.vue"
import { userStore } from "./stores/user-store.js"
//import lab from "./views/lab.vue"

export default {
  components: { splash, layout },
  data() {
    return {
      router: "splash",
      userStore: userStore()
    }
  },
  mounted() {
    let user = localStorage.getItem(btoa("logged"))
    if (user != null) {
      user = JSON.parse(atob(user))
      //console.log("user",user);
      this.userStore.setUser(user)
      this.router = "layout"
    }
    const path = window.location.pathname
    const queryString = window.location.search;
    //console.log("path", path);
    //console.log("queryString", queryString);
    //console.log(this.$store.state.user);
    //localStorage.setItem(btoa("logged"),btoa(JSON.stringify(data)))
  },
  methods: {
    onLogin() {
      console.log("onLogin");
      this.router = "layout"
    },
    logout() {
      localStorage.removeItem(btoa("logged"))
      this.router = "splash"
    }
  }
}
</script>

<style>
</style>