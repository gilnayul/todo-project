<template>
    <!-- v-dialog: 모달 창 구현 컴포넌트 -->
    <v-dialog v-model="showErrorDialog" max-width="600">
        <v-card>
            <v-card-title class="headline">{{ cardTitle }}</v-card-title>
            <v-card-text>
                <!-- 템플릿 리터럴 -->
                {{ `${cardText}는(은) 이미 존재하는 Todo입니다` }}
            </v-card-text>
            <v-card-actions>
                <!-- primary : 기본 색상 -->
                <v-btn color="primary" @click="confirmErrorTodo">확인</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Props 정의
const { cardTitle, cardText } = defineProps<{
    cardTitle: string;
    cardText: string;
}>();

// Emits 정의
const emit = defineEmits<{
    (event: 'cancel'): void;
    (event: 'confirmErrorTodo'): void;
}>();

// 로컬 상태
const showErrorDialog = ref(true);

// 확인 버튼 클릭 핸들러
const confirmErrorTodo = () => {
    emit('confirmErrorTodo');
};
</script>

<style scoped></style>
