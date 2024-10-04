<script setup>
//import reactive dan ref dari vue
import { reactive, ref } from 'vue'

//import useRouter dari vue router
import { useRouter } from 'vue-router'

//inisialisasi vue router pada Composition API
const router = useRouter()

//import services api
import api from '../../services/api'

//state user
const user = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

//state validation
const validation = ref([])

//method register
const register = async () => {

    //panggil api register
    await api.post('/api/register', {
        name: user.name,
        email: user.email,
        password: user.password,
    })
        .then(() => {
            //redirect ke halaman login
            router.push({
                name: 'login'
            })
        })
        .catch(error => {
            //assign validation value dengan error
            validation.value = error.response.data
        })

}

</script>

<style scoped>
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f8ff;
}

.form-box {
    padding: 2rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    width: 350px;
}

.input-custom {
    margin-bottom: 1.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.button-custom {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.button-custom:hover {
    background-color: #0056b3;
}
</style>

<template>
    <div class="form-container">
        <div class="form-box">
            <div class="card-body">
                <h4>REGISTER</h4>
                <hr>
                <div v-if="validation.errors" class="mt-2 alert alert-danger">
                    <ul class="mt-0 mb-0">
                        <li v-for="(error, index) in validation.errors" :key="index">
                            {{ `${error.path} : ${error.msg}` }}
                        </li>
                    </ul>
                </div>
                <form @submit.prevent="register">
                    <div class="form-group mb-3">
                        <label class="mb-1 fw-bold">Full Name</label>
                        <input type="text" v-model="user.name" class="form-control input-custom"
                            placeholder="Full Name" />
                    </div>

                    <div class="form-group mb-3">
                        <label class="mb-1 fw-bold">Email address</label>
                        <input type="email" v-model="user.email" class="form-control input-custom"
                            placeholder="Email Address" />
                    </div>

                    <div class="form-group mb-3">
                        <label class="mb-1 fw-bold">Password</label>
                        <input type="password" v-model="user.password" class="form-control input-custom"
                            placeholder="Password" />
                    </div>
                    <button type="submit" class="btn btn-primary button-custom">REGISTER</button>
                </form>
            </div>
        </div>
    </div>
</template>