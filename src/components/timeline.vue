<template>
    <div class="mx-5">
        <v-timeline reverse>
            <v-timeline-item v-for="(item,index) in items" :key="index">
                 <span slot="opposite">{{item.datum}}</span>
                <v-card class="title" color="primary">                    
                    <v-card-text class="white">
                        <v-list dense>
                            <v-list-item v-for="(d,index) in item.daten" :key="index">
                                <v-list-item-icon class="text-left" >
                                    <v-icon color="orange">mdi-clock</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title class="subtitle-1">
                                    {{d.beginn}} -   {{d.ende}}Uhr
                                </v-list-item-title>
                                
                                <v-list-item-subtitle class="text-right">
                                {{ d.kommentar}}
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>

            </v-timeline-item>
        </v-timeline>
        
    </div>
</template>
<script>
export default {
    created(){
        this.$store.dispatch('QUERY_ITEMS')
    },
    computed:{
        items(){
            return this.$store.getters.get_items
        }
    }
    
}
</script>