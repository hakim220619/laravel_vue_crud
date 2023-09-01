import axios from 'axios'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

export default function useDayes() {
    const dayes = ref([])
    const dayList = ref([])
    const day = ref({
        hari: ''
    })

    const router = useRouter()
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
        axios.post('/api/get-day/' + id).then(response => {
            day.value = response.data.data
            console.log(response.data.data);
        })
    }

    const storeDay = async (day) => {
        if (isLoading.value) return
        isLoading.value = true
        validationErrors.value = {}
        
        let serializedDay = new FormData()
        for (let item in day) {
            if (day.hasOwnProperty(item)) {
                serializedDay.append(item, day[item])
            }
            // console.log(serializedDay);
        }

        axios.post('/api/dayes', serializedDay).then(response => {
            router.push({ name: 'day.index' })
            swal({
                icon: 'success',
                title: "Day saved Successfully"
            })
        }).catch(error => {
            if (error.response?.data) {
                validationErrors.value = error.response.data.error
            }
        }).finally(() => isLoading.value = false)


    }

    const updateDay = async (day) => {
        console.log(day);
        if (isLoading.value) return;
        isLoading.value = true
        validationErrors.value = {}
        // console.log(day);
        let serializedDay = new FormData()
        for (let item in day) {
            if (day.hasOwnProperty(item)) {
                serializedDay.append(item, day[item])
            }
            // console.log(serializedDay);
        }

        axios.post('/api/update-day/' + day.id, serializedDay)
            .then(response => {
                router.push({ name: 'day.index' })
                swal({
                    icon: 'success',
                    title: 'Day updated successfully'
                })
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }
    const deleteDay = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete('/api/day-delete/' + id)
                        .then(response => {
                            getDayes()
                            router.push({ name: 'day.index' })
                            swal({
                                icon: 'success',
                                title: 'Day deleted successfully'
                            })
                        })
                        .catch(error => {
                            swal({
                                icon: 'error',
                                title: 'Something went wrong'
                            })
                        })
                }
            })
    }


    const getDayList = async () => {
        axios.get('/api/day-list').then(response => {
            dayList.value = response.data.data
            // console.log(response.data.data);
        })
    }
    return {
        dayList,
        dayes,
        day,
        getDayes,
        deleteDay,

        storeDay,
        updateDay,
        getDayList,
        getDay,
        validationErrors,
        isLoading
    }
}