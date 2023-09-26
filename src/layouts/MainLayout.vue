<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{ title }}
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
