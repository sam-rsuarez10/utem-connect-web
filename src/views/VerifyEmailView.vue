<script setup>
import { useRouter } from 'vue-router';
import Footer from '../components/Footer.vue'
import { useAuthStore } from '../stores/auth';
import { reactive } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const otpState = reactive({
    otp: null,
    invalid: false,
    errorMsg: ''
});

const resendState = reactive({
    msg: '',
    success: true,
});

const verify = async () => {
    if (!otpState.otp) {
        otpState.invalid = true;
        otpState.errorMsg = 'ingresa un código de verificación válido';
        return;
    }

    const verifySuccess = await authStore.verifyUser(otpState.otp);

    if (verifySuccess) {
        router.push('/login');
    } else {
        otpState.invalid = true;
        otpState.errorMsg = 'código de verificación incorrecto';
        return;
    }
};

const resendOtp = async () => {
    const resendSuccess = await authStore.resendOtp();
    if (resendSuccess) {
        resendState.msg = 'código reenviado :)';
    } else {
        resendState.msg = false;
        resendState.msg = 'no se puso reenviar código :(';
    }
};

</script>

<template>
    <header>
        <h1 id="header-title">UtemConnect</h1>
    </header>

    <main>
        <div class="container">
            <span>Se envió un código de verificación a tu correo utem para validarlo (vigencia del código es de 10
                min)</span>
            <form class="row g-3">
                <div class="input-group mb-3">
                    <input id="otp" type="text" class="form-control" placeholder="323067" aria-label="Recipient's username"
                        aria-describedby="button-addon2" v-model="otpState.otp">
                    <button class="btn verify-button" type="button" id="button-addon2" @click="verify">Confirmar</button>
                </div>
            </form>
            <span class="text-danger" v-if="otpState.invalid">{{ otpState.errorMsg }}</span>
            <button id="resend-button" @click="resendOtp">reenviar código</button>
            <span v-if="resendState.msg"
                v-bind:class="{ 'text-success': resendState.success, 'text-danger': !resendState.success }"
                id="resend-msg">{{ resendState.msg }}</span>
        </div>
    </main>

    <Footer />
</template>

<style scoped>
header {
    display: flex;
    background-color: #0F7D70;
    height: 5rem;
    width: 100%;
    align-items: center;
    color: white;
}

#header-title {
    padding-left: 2rem;
}

main {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background-color: #88C5E8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    width: 30rem;
    height: 20rem;
    border-radius: 5%;
}

.verify-button {
    background-color: #26D76D;
}

.verify-button:hover {
    background-color: #0F7D70;
    color: white;
}

#resend-button {
    background-color: #0F7D70;
    color: white;
    border: #0F7D70;
    height: 2.5rem;
    font-size: 0.95rem;
    border-radius: 10%;
    align-self: flex-start;
}

#resend-button:hover {
    font-size: 1.1rem;
    transition: 500ms;
}

#resend-msg {
    align-self: flex-start;
}
</style>