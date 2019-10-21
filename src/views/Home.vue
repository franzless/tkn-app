<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <toolbar/>
    <neuer/>
  </div>
</template>

<script>
// @ is an alias to /src

import neuer from '@/components/NeuerEintrag.vue'

export default {
  name: 'home',
  components: {
    neuer
  }
}
</script>
