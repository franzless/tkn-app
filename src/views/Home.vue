<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld/>
    <neuer/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import neuer from '@/components/NeuerEintrag.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,neuer
  }
}
</script>
