<template>
    <!-- v-text-field : 텍스트 입력 필드(창) -->
    <v-text-field v-model="title" label="Todo 추가" class="mb-4" variant="outlined">
        <!-- #append : 오른쪽 끝에 콘텐츠 삽입 지정-->
        <template #append>
            <v-icon @click="handleSubmit">mdi-pencil</v-icon>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const title = ref('');
const emit = defineEmits(['handleSubmit']);

const handleSubmit = () => {
    if (title.value.trim() === '') return;
    emit('handleSubmit', { title: title.value.trim(), completed: false });
    title.value = '';
};
</script>

<style scoped></style>