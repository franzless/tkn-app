<template>
    <div>
        <v-timeline reverse>
            <v-timeline-item v-for="(item,index) in items" :key="index">
                 <span slot="opposite">{{item.datum}}</span>
                <v-card class="title" color="accent">                    
                    <v-card-text class="white text--primary">
                        <v-list dense>
                            <v-list-item>
                                <v-list-item-icon class="text-left" >
                                    <v-icon color="accent">mdi-clock</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title class="subtitle-1">
                                    {{item.beginn}} -   {{item.ende}}Uhr
                                </v-list-item-title>
                                
                                <v-list-item-subtitle class="text-right">
                                {{ item.kommentar}}
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