import axios from 'axios'
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router'

export default function useDayes() {
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
        search_hari = '',
        search_global = '',
        search_column = 'created_at',
        search_direction = 'desc',
    ) => {
        axios.get('/api/dayes?page=' + page +
            '&search_id=' + search_id +
            '&search_hari=' + search_hari +
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

    const storeDay = async (day) => {
        if (isLoading.value) return
        isLoading.value = true
        validationErrors.value = {}

        axios.post('/api/dayes', day).then(response => {
            router.push({ name: 'day.index' })
            swal({
                icon: 'success',
                title: "Day saved Successfully"
            })
        }).catch(error => {
            if (error.response?.data) {
                validationErrors.value = error.response.data.error
            }
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
        storeDay,
        getDayList,
        getDay,
        validationErrors,
        isLoading
    }
}