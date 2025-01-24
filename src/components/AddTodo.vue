<template>
    <v-text-field v-model="title" label="Todo 추가" class="mb-4" variant="outlined">
        <template #append>
            <v-icon @click="handleSubmit">mdi-pencil</v-icon>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const title = ref('');
const emit = defineEmits(['handleSubmit']); // 상위 컴포넌트로 이벤트 정의

const handleSubmit = () => {
    if (title.value.trim() === '') {
        alert('Title cannot be empty');
        return;
    }
    console.log('Emit 호출:', title.value); // 디버깅용 로그
    emit('handleSubmit', title.value); // 'handleSubmit' 이벤트와 함께 title 전달
    title.value = ''
};
</script>
