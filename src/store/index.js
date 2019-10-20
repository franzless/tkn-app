import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/db/firebaseinit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialog_neuer:false,
    data:[]
  },
  mutations: {
    SET_dialog_NEUER:(state,payload)=>{
      state.dialog_neuer = payload
    },
    SET_DATA:(state,payload)=>{
      state.data = payload
      console.log(payload)
    }
  },
  getters:{
    dialog_NEUER:state=>{
      return state.dialog_neuer
    }
  },
  actions: {
    get_users:(context)=>{
      db.collection('users').doc('test').get().then(function(doc) {
        if (doc.exists) {
            context.commit('SET_DATA',doc.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    })

    },
    SET_NEUER_EINTRAG:(context,payload)=>{
      db.collection('users').doc('test').collection('tkn').add(payload)
      .then(response=>{
       context.commit('SET_dialog_NEUER',false)
        console.log(response)
      })
      .catch(err=>{console.log(err)})
    }
  },
  modules: {
  }
})
