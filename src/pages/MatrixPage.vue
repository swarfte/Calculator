<template>
  <MainLayout>
    <q-page class="flex flex-center">
      <p>Matrix</p>
    </q-page>
  </MainLayout>
</template>

<script>
import { defineComponent } from "vue";
import MainLayout from "../layouts/MainLayout.vue";

export default defineComponent({
  name: "MatrixPage",
  components: {
    MainLayout,
  },
  data() {
    return {};
  },
});
</script>
