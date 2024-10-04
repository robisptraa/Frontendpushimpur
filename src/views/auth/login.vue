<script setup>
//import reactive and ref from vue
import { reactive, ref } from 'vue'

//import useRouter from vue router
import { useRouter } from 'vue-router'

//inisialisasi vue router on Composition API
const router = useRouter()

//import services api
import api from '../../services/api'

//import js-cookie
import Cookies from 'js-cookie'

//state user
const user = reactive({
    email: '',
    password: '',
})

//state validation
const validation = ref([])
const loginFailed = ref([])

//method login
const login = async () => {

    //call api login
    await api.post('/api/login', {
        email: user.email,
        password: user.password
    })
    .then(response => {

        //set token and user on cookies
        Cookies.set('token', response.data.data.token)
        Cookies.set('user', JSON.stringify(response.data.data.user))

        // Verify the token is set before redirecting
        if (Cookies.get('token')) {
            //redirect to dashboard
            router.push({ name: 'dashboard' })
        } 
        
    })
    .catch(error => {
        //assign validation value with error
        validation.value = error.response.data

        //assign loginFailed value with error
        loginFailed.value = error.response.data
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
                <h4>LOGIN</h4>
                <hr>
                <div v-if="validation.errors" class="mt-2 alert alert-danger">
                    <ul class="mt-0 mb-0">
                        <li v-for="(error, index) in validation.errors" :key="index">
                            {{ `${error.path} : ${error.msg}` }}
                        </li>
                    </ul>
                </div>
                <div v-if="loginFailed.message" class="mt-2 alert alert-danger">
                    {{ loginFailed.message }}
                </div>
                <form @submit.prevent="login">
                    <div class="form-group mb-3">
                        <label class="mb-1 fw-bold">Email address</label>
                        <input type="email" v-model="user.email" class="form-control input-custom" placeholder="Email Address" />
                    </div>

                    <div class="form-group mb-3">
                        <label class="mb-1 fw-bold">Password</label>
                        <input type="password" v-model="user.password" class="form-control input-custom"
                            placeholder="Password" />
                    </div>
                    <button type="submit" class="btn btn-primary button-custom">LOGIN</button>
                </form>
            </div>
        </div>
    </div>
</template>