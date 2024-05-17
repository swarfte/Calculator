<template>
  <v-layout>
    <v-app-bar app :elevation="3" rounded color="blue">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ title }}</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer floating v-model="drawer" temporary>
      <v-list>
        <v-list-item link v-for="option in options" :key="option.title">
          <v-row>
            <v-col cols="auto">
              <v-icon>{{ option.icon }}</v-icon>
            </v-col>
            <v-col>
              <v-list-item-title @click="navigateTo(`/${option.title}`)">{{ option.title }}</v-list-item-title>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <slot />
  </v-layout>
</template>

<script lang="ts" setup>
import { useOption, useCurrentTitle } from '../composables/title';
const drawer = ref(false)
const options = useOption()
const title = useCurrentTitle()
</script>

<style></style>