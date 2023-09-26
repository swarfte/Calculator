<template>
  <MainLayout>
    <q-page class="flex flex-center">
      <img
        alt="Quasar logo"
        src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"
      />
    </q-page>
  </MainLayout>
</template>

<script>
import { defineComponent } from "vue";
import MainLayout from "../layouts/MainLayout.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    MainLayout,
  },
});
</script>
