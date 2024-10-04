<script setup>
import logoImage from '@/assets/images/PUSSIMPUR_KODIKLATAD.png';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.container-custom {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f8ff; /* Warna latar yang lebih cerah */
}

.box-custom {
    padding: 3rem;
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1); /* Bayangan yang lebih halus */
    text-align: center;
    font-family: 'Roboto', sans-serif;
}

.btn-custom {
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    font-size: 1.2rem;
    transition: transform 0.3s, background-color 0.3s;
    font-family: 'Roboto', sans-serif;
}

.btn-custom:hover {
    background-color: #007bff;
    transform: scale(1.05);
}

@media (max-width: 768px) {
    .container-custom {
        flex-direction: column;
        padding: 20px;
    }
    .box-custom {
        width: 100%;
        padding: 1rem;
    }
    .btn-custom {
        width: 100%;
        margin-top: 1rem;
    }
}
</style>

<template>
    <div class="container-custom">
        <div class="box-custom">
            <img :src="logoImage" alt="Logo" class="mb-4" style="width: 180px; height: 180px;"> <!-- Ukuran gambar yang lebih besar -->
            <h1 class="display-4 fw-bold">PUSSIMPUR</h1> <!-- Font judul yang lebih besar dan tebal -->
            <router-link :to="{ name: 'register' }" class="btn btn-primary btn-custom">REGISTER</router-link>
            <router-link :to="{ name: 'login' }" class="btn btn-secondary btn-custom">LOGIN</router-link>
        </div>
    </div>
</template>