<script setup>

// import useRouter from vue-router
import { useRouter } from 'vue-router'

// initialize router
const router = useRouter()

// import Cookies from js-cookie
import Cookies from 'js-cookie'

// import ref from vue
import { ref } from 'vue'

// method to handle logout
const logout = async () => {
    // Tampilkan dialog konfirmasi
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
        // Hapus token dan data pengguna dari cookies
        Cookies.remove('token');
        Cookies.remove('user');

        // Alihkan pengguna ke halaman login
        await router.push({ name: 'login' });
        alert('Logout berhasil!');
    }
}

// method to go back
const goBack = () => {
    router.go(-1) // Navigasi kembali ke halaman sebelumnya
}

</script>

<template>
    <div class="card border-0 rounded shadow-sm">
        <div class="card-header">
            MAIN MENU
        </div>
        <div class="card-body">
            <div class="list-group">
                <router-link :to="{ name: 'dashboard' }" class="list-group-item list-group-item-action">Dashboard</router-link>
                <router-link :to="{ name: 'admin.users.index' }" class="list-group-item list-group-item-action">Users</router-link>
                <button @click="logout" class="list-group-item list-group-item-action" :disabled="isLoading">
                    Logout
                </button>
                <!-- Tombol Back -->
                <button @click="goBack" class="list-group-item list-group-item-action">
                    Back
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list-group-item-action {
    width: 100%; /* Membuat tombol memenuhi lebar kontainer */
    text-align: center; /* Menengahkan teks di tombol */
    margin-top: 10px; /* Memberikan sedikit ruang di atas tombol */
}

@media (max-width: 768px) {
    .list-group-item-action {
        font-size: 14px; /* Mengurangi ukuran font pada perangkat kecil */
    }
}
</style>