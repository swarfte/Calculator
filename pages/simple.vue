<template>
  <v-container class="h-screen pt-10  w-md-25 border border-2 " fluid>
    <v-row class="my-13">
    </v-row>
    <v-spacer></v-spacer>
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field v-model="userInput" class="inputField" variant="underlined" dense readonly></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="output" class="outputField" variant="underlined" dense readonly></v-text-field>
      </v-col>
    </v-row>
    <v-row v-for="row in keyboard" no-gutters>
      <v-col v-for="key in row" cols="3" class="pa-1">
        <v-btn rounded="pill" reverse="true" size="x-large" :key="key" @click="handleUserInput(key)"
          :color="key === '=' ? 'success' : 'primary'" :class="key === 'AC' ? 'bg-red' : ''" block :text="key">
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useSimpleKeyboard, useHandleClick } from '~/composables/keyboard';
import { setCurrentTitle } from '~/composables/title';
const userInput = ref('')
const output = ref('')
const keyboard = useSimpleKeyboard()
setCurrentTitle('Simple')

const handleUserInput = (key: string) => {
  const result = useHandleClick(userInput, output, key)
}

</script>


<style scoped>
.v-text-field>>>input {
  font-size: 2em;
  font-weight: 100;
  text-align: right;
}

.outputField {
  color: blue;
}
</style>