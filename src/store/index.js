import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/db/firebaseinit'

Vue.use(Vuex)
const docRef = db.collection("users").doc("test").collection("tkn") 

export default new Vuex.Store({
  state: {
    dialog_neuer:false,
    data:[],
    loading:false,
    snack:{},
    items:[]
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
    },
    SET_ITEMS:(state,payload)=>{
      state.items.push(payload)    
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
    },
    get_items:state=>{
      return state.items
    }
  },
  actions: {      
    SET_NEUER_EINTRAG:(context,payload)=>{ 
       docRef.where("datum","==",payload.datum).get().then(doc=>{
        if(doc.exists){          
          var daten_merge = []
          doc.data().forEach(x=>{daten_merge.push(x.daten)})
          daten_merge.push(payload.daten)
           var merge = {
            datum:payload.datum,unix:payload.unix,daten_merge
          }
          docRef.doc(doc.id).set(merge).then(response=>{
            console.log(response)        
           context.commit('SET_dialog_NEUER',false)
           context.commit('SET_LOADING',false)
           context.commit('SET_SNACK',{snackColor:'success',status:true,snackText:'Erfolg'})
          })
          .catch(err=>{
            context.commit('SET_SNACK',{Snackcolor:'error',status:true,snackText:err})
            console.log(err)})         
      
        }else{
          docRef.add(payload).then(response=>{
            console.log(response)        
           context.commit('SET_dialog_NEUER',false)
           context.commit('SET_LOADING',false)
           context.commit('SET_SNACK',{snackColor:'success',status:true,snackText:'Erfolg'})
          })
          .catch(err=>{
            context.commit('SET_SNACK',{Snackcolor:'error',status:true,snackText:err})
            console.log(err)})
        }
      }) 
       /* context.commit('SET_LOADING',true)
      db.collection('users').doc('test').collection('tkn').add(payload)
      .then(response=>{
        console.log(response)        
       context.commit('SET_dialog_NEUER',false)
       context.commit('SET_LOADING',false)
       context.commit('SET_SNACK',{snackColor:'success',status:true,snackText:'Erfolg'})
      })
      .catch(err=>{
        context.commit('SET_SNACK',{snackColor:'error',status:true,snackText:err})
        console.log(err)}) */
    }, 
    QUERY_ITEMS:(context)=>{
      context.state.items = []
      db.collection('users').doc('test').collection('tkn').orderBy("unix","desc").get().then(snap=>{
        snap.forEach(doc=>{
          console.log(doc.data())
          context.commit('SET_ITEMS',doc.data())
        }) 
      }).catch(err=>{console.log(err)})
    }
  },
  modules: {
  }
})
