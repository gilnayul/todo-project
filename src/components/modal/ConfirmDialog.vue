<template>
    <!-- v-dialog: 모달 창 구현 컴포넌트 -->
    <v-dialog v-model="showDeleteDialog" max-width="600">
        <v-card>
            <v-card-title class="headline">{{ cardTitle }}</v-card-title>
            <v-card-text>
                <!-- 템플릿 리터럴 -->
                {{ `${cardText}을(를) 삭제하겠습니까?` }}
            </v-card-text>
            <v-card-actions>
                <v-btn @click="cancel">취소</v-btn>
                <!-- primary : 기본 색상 -->
                <v-btn color="primary" @click="confirmDeleteTodo">삭제</v-btn>
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
    (event: 'confirmDeleteTodo'): void;
}>();

// 로컬 상태
const showDeleteDialog = ref(true);

// 취소 버튼 클릭 핸들러
const cancel = () => {
    emit('cancel');
};

// 삭제 버튼 클릭 핸들러
const confirmDeleteTodo = () => {
    emit('confirmDeleteTodo');
};
</script>

<style scoped></style>
