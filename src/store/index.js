import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/db/firebaseinit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialog_neuer:false,
    data:[],
    loading:false,
    snack:{}
  },
  mutations: {
    SET_dialog_NEUER:(state,payload)=>{
      state.dialog_neuer = payload
    },
    SET_DATA:(state,payload)=>{
      state.data = payload      
    },
    SET_LOADING:(state,payload)=>{
      state.loading = payload
    },
    SET_SNACK:(state,payload)=>{
      state.snack=payload
    }
  },
  getters:{
    dialog_NEUER:state=>{
      return state.dialog_neuer
    },
    get_loading:state=>{
      return state.loading
    },
    get_snack:state=>{
      return state.snack
    }
  },
  actions: {   
    SET_NEUER_EINTRAG:(context,payload)=>{      
      context.commit('SET_LOADING',true)
      db.collection('users').doc('test').collection('tkn').add(payload)
      .then(response=>{
        console.log(response)        
       context.commit('SET_dialog_NEUER',false)
       context.commit('SET_LOADING',false)
       context.commit('SET_SNACK',{Snackcolor:'success',status:true,snackText:'Erfolg'})
      })
      .catch(err=>{
        context.commit('SET_SNACK',{Snackcolor:'error',status:true,snackText:err})
        console.log(err)})
    }
  },
  modules: {
  }
})
