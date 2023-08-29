<template>
    <div class="row justify-content-center my-2">
        <div class="col-md-12">
            <div class="card border-0">
                <div class="card-header bg-transparent">
                    <h5 class="float-start">Categories</h5>
                    <router-link v-if="can('day-create')" :to="{ name: 'day.create' }"></router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import useDayes from "../../../composables/day"
import { useAbility } from '@casl/vue'

const search_id = ref('')
const search_title = ref('')
const search_global = ref('')
const orderColumn = ref('created_at')
const orderDirection = ref('desc')
const { dayes, getDayes } = useDayes
const { can } = useAbility()
onMounted(() => {
    getDayes()
})
</script>