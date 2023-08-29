import axios from 'axios'
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router'

export default function useDay() {
    const dayes = ref([])
    const dayList = ref([])
    const day = ref({
        hari: ''
    })

    const router = useRoute()
    const validationErrors = ref({})
    const isLoading = ref(false)
    const swal = inject('$swal')

    const getDayes = async (
        page = 1,
        search_id = '',
        search_title = '',
        search_global = '',
        search_column = 'created_at',
        search_direction = 'desc',
    ) => {
        axios.get('/api/dayes?page=' + page +
            '&search_id=' + search_id +
            '&search_title=' + search_title +
            '&search_global=' + search_global +
            '&search_column=' + search_column +
            '&search_direction=' + search_direction
        ).then(response => {
            dayes.value = response.data
        })
    }

    const getDay = async (id) => {
        axios.get('/api/dayes' + id).then(response => {
            day.value = response.data.data
        })
    }

    const getDayList = async () => {
        axios.get('/api/day-list').then(response => {
            dayList.value = response.data.data
        })
    }
    return {
        dayList,
        dayes,
        day,
        getDayes,
        getDayList,
        getDay,
        validationErrors,
        isLoading
    }
}