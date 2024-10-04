<script setup>

//import sidebar component
import SidebarMenu from '../../../components/SidebarMenu.vue';

//import reactive and ref from vue
import { reactive, ref } from 'vue';

//import useRouter from vue router
import { useRouter } from 'vue-router'

//inisialisasi vue router on Composition API
const router = useRouter()

//import js cookie
import Cookies from 'js-cookie';

//import api
import api from '../../../services/api';

//get token from cookies
const token = Cookies.get('token');

//state user
const user = reactive({
    name: '',
    email: '',
    password: '',
});

//state validation
const validation = ref([]);

//method storeUser
const storeUser = async () => {

    //call api store user
    api.defaults.headers.common['Authorization'] = token;
    await api.post('/api/admin/users', {
        name: user.name,
        email: user.email,
        password: user.password,
    })
    .then(() => {
        //redirect ke halaman users index
        router.push({
            name: 'admin.users.index'
        })
    })
    .catch(error => {
        //assign validation value with error
        validation.value = error.response.data
    })

}

</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-3">
                <SidebarMenu />
            </div>
            <div class="col-md-9">
                <div class="card border-0 rounded shadow-sm">
                    <div class="card-header">ADD USER</div>
                    <div class="card-body">
                        <form @submit.prevent="storeUser">
                            <div class="form-group mb-3">
                                <label for="fullName" class="mb-1 fw-bold">Full Name</label>
                                <input type="text" id="fullName" v-model="user.name" class="form-control" placeholder="Full Name">
                                <div v-if="validation.errors && validation.errors.name" class="alert alert-danger mt-2">
                                    {{ validation.errors.name[0] }}
                                </div>
                            </div>
                            <!-- More fields here -->
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>