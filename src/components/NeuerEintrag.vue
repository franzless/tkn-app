<template>
    <div>
    <v-dialog v-model="dialog" persistent width="50%">
        <v-toolbar color="primary">
            <v-icon class="mr-2">mdi-border-color</v-icon>
            <v-toolbar-title>Neuer Eintrag</v-toolbar-title></v-toolbar>       
        <v-card outlined :loading="loading">           
       <v-form>
           <v-container>
               <v-row wrap>
                   <v-col cols="12">
                       <v-dialog
                            ref="dialog3"
                            v-model="modal3"
                            :return-value.sync="datum"
                            persistent
                            width="290px"
                        >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="DateFormatted"
                                label="Datum"
                                prepend-icon="mdi-calendar"                                
                                v-on="on"
                                readonly
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            first-day-of-week="1"
                            locale="de"
                            v-if="modal3"
                            v-model="datum"
                            full-width
                            >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal3 = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog3.save(datum)">OK</v-btn>
                            </v-date-picker>
                </v-dialog>

                   </v-col>                  
                   <v-col cols="6">
                       <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="beginn"
                            persistent
                            width="290px"
                        >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="beginn"
                                label="Beginn"
                                prepend-icon="mdi-clock"
                                readonly
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-time-picker
                            v-if="modal"
                            v-model="beginn"
                            full-width
                            >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(beginn)">OK</v-btn>
                            </v-time-picker>
                </v-dialog>

                   </v-col>
                    <v-col cols="6">
                       <v-dialog
                            ref="dialog2"
                            v-model="modal2"
                            :return-value.sync="ende"
                            persistent
                            width="290px"
                        >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="ende"
                                label="Ende"
                                prepend-icon="mdi-clock"
                                readonly
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-time-picker
                            v-if="modal2"
                            v-model="ende"
                            full-width
                            >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog2.save(ende)">OK</v-btn>
                            </v-time-picker>
                </v-dialog>
                   </v-col>
                    <v-col cols="12">
                       <v-textarea rows="3" autocomplete prepend-icon="mdi-comment" label="Kommentar" v-model="comment" auto-grow></v-textarea>
                   </v-col>
                   <v-col cols="12">
                       <v-btn class="mx-2" color="error" @click="close()">Close</v-btn>
                       <v-btn color="success" @click="submit()">Submit</v-btn>
                   </v-col>
               </v-row>
            </v-container>
        </v-form>
        </v-card>         
    </v-dialog>
     <v-snackbar v-model="snack.status" :timeout="3000" :color="snack.snackColor">
      {{ snack.snackText }}
      <v-btn @click="snack.status = false">Close</v-btn>
    </v-snackbar>         
    </div>
</template>
<script>
var moment = require('moment');
export default {
    props:['dialog'],
    data(){
        return{
            comment:'',
            beginn:'',
            modal:false,
            modal2:false,
            ende:'',
            datum:'',
            modal3:false,
                        
        }
    },
    computed:{
        DateFormatted(){
            return this.datum ? moment(this.datum).format('DD.MM.YYYY') : ''
        },
        loading(){
            return this.$store.getters.get_loading
        },
        snack(){
        return this.$store.getters.get_snack    
        }
    },    
    methods:{
        close(){
             this.$store.commit('SET_dialog_NEUER',false)
        },
        submit(){
            var unix = moment(this.datum, "YYYY-MM-DD").unix()
            this.$store.dispatch('SET_NEUER_EINTRAG',{datum:this.DateFormatted,unix:unix,daten:[{kommentar:this.comment,beginn:this.beginn,ende:this.ende}]})        
        
    }
    
}}
</script>