<template>
<div>
<v-app-bar app color="primary">
  <v-toolbar-items class="mx-auto">
    <v-btn @click="newDialog()" class="mt-4" icon  ><v-icon size="50" color="white">mdi-plus-circle</v-icon></v-btn>
  </v-toolbar-items>
</v-app-bar>
    <neuer :dialog="dialog"/>
 

</div>
</template>

<script>
import neuer from '@/components/NeuerEintrag.vue'
export default {
  components:{
    neuer
  },
  data: () => ({
    
   
  }),
  mounted(){
    this.$store.dispatch('get_users')        
  },
  computed:{
    dialog(){
      return this.$store.getters.dialog_NEUER
    }
  },
  methods:{
    newDialog(){
      this.$store.commit('SET_dialog_NEUER',true)
    }
  }
};
</script>
