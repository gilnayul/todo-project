<template>
    <v-list>
        <v-list-item class="mb-6" border height="60" lines="two" rounded v-for="item in filteredTodoList"
            :key="item.id">
            <v-list-item-title :class="{ completed: item.completed }">
                {{ item.title }}
            </v-list-item-title>
            <template v-slot:append>
                <v-list-item-action>
                    <v-icon @click="toggleComplete(item)">mdi-check-circle</v-icon>
                    <v-icon @click="handleDelete(item.id, item.title)">mdi-delete</v-icon>
                </v-list-item-action>
            </template>
        </v-list-item>

        <v-list-item class="progress-bar" height="50" lines="one" align="center">
            <v-list-item-title>
                진도율: {{ completedCount }}/{{ totalCount }} ({{ progress }}%)
            </v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { updateTodo, deleteTodo } from '../services/api';
import type { TodoType } from '../interfaces/Todod';
import { defineProps, defineEmits } from 'vue';
import { watch } from 'vue';

// Props 정의
const props = defineProps({
    filteredTodoList: {
        type: Array as () => TodoType[],
        required: true,
    },
});

// Emits 정의
const emit = defineEmits(["updateTodo", "handleDelete"]);

// 완료-미완료 토글 메서드
// async : 비동기 함수 - promise 반환
// promise : 비동기 작업 성공 / 실패 관리하는 객체

const toggleComplete = async (item: TodoType) => {
    const originalCompleted = item.completed; // 기존 상태 저장
    try {
        const updatedItem = await updateTodo({ ...item, completed: !item.completed }); // API 호출
        emit('updateTodo', updatedItem); // 업데이트된 데이터 전달
    } catch (error) {
        console.error('### 토글 기능 에러 ###', error);
        item.completed = originalCompleted; // 실패 시 상태 복원
    }
};



// const toggleComplete = async (item: TodoType) => {
//     item.completed = !item.completed;
//     try {
//         const updatedItem = await updateTodo(item); // 서버에서 업데이트된 데이터 반환
//         emit('updateTodo', updatedItem); // 부모 컴포넌트에 업데이트된 데이터를 전달
//     } catch (error) {
//         console.error('### 토글 기능 에러 ###', error);
//     }
// };


// const toggleComplete = async (item: TodoType) => {
//     item.completed = !item.completed;
//     try {
//         await updateTodo(item);     // await : promise가 해결될 때까지 기다리는 키워드
//         emit('updateTodo', item);
//     } catch (error) {
//         console.error('### 토글 기능 에러 ###', error);
//     }
// };

// 항목 삭제 메서드
const handleDelete = async (targetId: number, targetTitle: string) => {
    try {
        await deleteTodo(targetId);    // API 호출
        emit('handleDelete', targetId, targetTitle);
    } catch (error) {
        console.error('### 삭제 기능 에러 ###', error);
    }
};

// 완료된 항목 개수 계산
const completedCount = computed(() => {
    return props.filteredTodoList.filter((item: TodoType) => item.completed).length;
});

// 총 항목 개수 계산
const totalCount = computed(() => {
    return props.filteredTodoList.length;
});

// 진도율 계산
const progress = computed(() => totalCount.value ? Math.round((completedCount.value / totalCount.value) * 100) : 0);



watch(
    () => props.filteredTodoList.map((item) => item.completed), // 필요한 속성만 감시
    (newCompletedStates) => {
        console.log('Completed states changed:', newCompletedStates);
    }
);


</script>

<style scoped>
.completed {
    color: rgb(243, 83, 83);
    text-decoration: line-through;
}

.progress-bar {
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
}
</style>
