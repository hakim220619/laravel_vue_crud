<template>
    <div class="row justify-content-center my-5">
        <div class="col-md-6">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <form @submit.prevent="submitForm">
                        <!-- Title -->
                        <div class="mb-3">
                            <label for="post-name" class="form-label">
                                Hari
                            </label>
                            <input v-model="day.hari" id="post-hari" type="text" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.hari }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.hari">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="post-name" class="form-label">
                                Bulan
                            </label>
                            <input v-model="day.bulan" id="post-bulan" type="text" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.bulan }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.bulan">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="post-name" class="form-label">
                                tahun
                            </label>
                            <input v-model="day.tahun" id="post-tahun" type="text" class="form-control">
                            <div class="text-danger mt-1">
                                {{ errors.tahun }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.hari">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <!-- Buttons -->
                        <div class="mt-4">
                            <button :disabled="isLoading" class="btn btn-primary">
                                <div v-show="isLoading" class=""></div>
                                <span v-if="isLoading">Processing...</span>
                                <span v-else>Save</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive } from "vue";
import useDayes from "../../../composables/day";
import { useForm, useField, defineRule } from "vee-validate";
import { required, min } from "../../../validation/rules"
defineRule('required', required)
defineRule('min', min);

// Define a validation schema
const schema = {
    hari: 'required|min:3'
}
// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema })
// Define actual fields for validation
const { value: hari } = useField('hari', null, { initialValue: '' });
const { value: bulan } = useField('bulan', null, { initialValue: '' });
const { value: tahun } = useField('tahun', null, { initialValue: '' });
const { storeDay, validationErrors, isLoading } = useDayes()
const day = reactive({
    hari, bulan, tahun
})
function submitForm() {
    validate().then(form => { if (form.valid) storeDay(day) })
}
</script>
