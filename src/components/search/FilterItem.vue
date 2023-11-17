<script setup>
import { reactive, nextTick } from 'vue';

const props = defineProps({
    filterName: String,
});

const inputState = reactive({
    isDisabled: true,
    value: '',
});


const toggleSwitch = () => {
    inputState.isDisabled = !inputState.isDisabled

    nextTick(() => document.getElementById(props.filterName + '-filter').focus());
};
</script>

<template>
    <div class="filter">
        <div class="input-wrapper">
            <input type="text" v-model="inputState.value" :placeholder="filterName" :id="filterName + '-filter'"
                :disabled="inputState.isDisabled">
        </div>
        <div class="switch-wrapper" id="switch">
            <input type="checkbox" class="switch" :id="filterName + '-switch'" @click="toggleSwitch()" />
            <label :for="filterName + '-switch'" class="switch-label">
                <span class="switch-on">On</span>
                <span class="switch-off">Off</span>
            </label>
        </div>
    </div>
</template>

<style scoped>
.filter {
    width: 90%;
    background-color: #20356A;
    margin: 1rem;
    height: 3rem;
    display: flex;
    align-items: center;
    padding: 2rem 0.75rem 2rem 0.75rem;
    border-radius: 3%;
}

.input-wrapper {
    flex: 1;
    margin-right: 0.75rem;
}

.input-wrapper input {
    width: 99%;
    height: 2.5rem;
    border-radius: 2%;
}

.input-wrapper input:disabled::-webkit-input-placeholder {
    color: #ccc; /* Style the placeholder text color */
}

.input-wrapper input:disabled {
    color: #ccc; /* Style the input text color */
}


.switch-wrapper {
    position: relative;
    width: 54px;
    height: 32px;
}

.switch {
    display: none;
}

.switch-label {
    display: block;
    background-color: #ccc;
    border-radius: 16px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
}

.switch-label:after {
    content: "";
    display: block;
    width: 26px;
    height: 26px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
    transition: 0.4s;
}

.switch-off {
    color: #888;
}

.switch:checked+.switch-label {
    background-color: #00CC00;
}

.switch:checked+.switch-label .switch-on {
    color: #fff;
}

.switch:checked+.switch-label .switch-off {
    color: #888;
}

.switch:checked+.switch-label:after {
    left: 25px;
}

.switch:disabled+.switch-label {
    background-color: #ccc;
    cursor: not-allowed;
}

.switch:disabled+.switch-label .switch-on {
    color: #ccc;
}

.switch:disabled+.switch-label .switch-off {
    color: #888;
}
</style>