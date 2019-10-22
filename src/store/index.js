import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/db/firebaseinit'

Vue.use(Vuex)
const docRef = db.collection("TKN")

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
      if(payload.length>0){

      var dates = payload.map(m=>m.datum).filter((value, index, self)=>{return self.indexOf(value) === index;})
          
      for(var x = 0;x<dates.length;x++){
        console.log(dates[x])
        var cache = []
        cache = payload.filter(f => f.datum === dates[x])
        var daten = []        
        cache.forEach(c=>daten.push(c.daten))               
        var result = {datum:cache[0].datum,unix:cache[0].unix,UID:cache[0].uid,daten}        
        state.items.push(result)
    }
  }else{
      state.items= []
  }}
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
  /*      docRef.where("unix","==","1570744800").get().then(doc=>{
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
          console.log('ex nicht')
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
      })  */
        context.commit('SET_LOADING',true)
      docRef.add(payload)
      .then(response=>{
        console.log(response)        
       context.commit('SET_dialog_NEUER',false)
       context.commit('SET_LOADING',false)
       context.commit('SET_SNACK',{snackColor:'success',status:true,snackText:'Erfolg'})
      })
      .catch(err=>{
        context.commit('SET_SNACK',{snackColor:'error',status:true,snackText:err})
        console.log(err)}) 
    }, 
    QUERY_ITEMS:(context)=>{      
      docRef.where('UID','==','u66WmdRu57bAdn4nTWg9bvCPdcZ2').orderBy("unix","desc").onSnapshot(snap=>{
        var daten = []
        context.commit('SET_ITEMS',daten) 
        snap.forEach(doc=>{
           daten.push(doc.data())
        })
        context.commit('SET_ITEMS',daten)})
    }
  },
  modules: {
  }
})
