<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/githubIcon.png" alt="github icon" />
          </q-avatar>
          <a id="title" href="https://github.com/swarfte/Calculator">
            {{ title }}
          </a>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab :to="{ name: 'GeneralPage' }" label="General" />
        <q-route-tab :to="{ name: 'MatrixPage' }" label="Matrix" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      title: "Calculator",
    };
  },
});
</script>

<style>
#title {
  color: white;
  text-decoration: none;
  font-size: 1.1em;
}
</style>
