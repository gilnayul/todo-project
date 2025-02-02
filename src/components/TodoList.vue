<template>
    <v-list>
        <v-list-item class="mb-6" border height="60" lines="two" rounded v-for="item in filteredTodoList"
            :key="item.id">
            <!-- 수정 모드 -->
            <template v-if="item.isEditing">
                <input type="text" :value="item.title" @blur="cancelEdit(item)" @keydown.enter="saveEdit(item, $event)"
                    class="edit-input center-aligned" />
            </template>

            <!-- 일반 모드 -->
            <template v-else>
                <v-list-item-title :class="{ completed: item.completed }" @dblclick="startEditing(item)">
                    {{ item.title }}
                </v-list-item-title>
                <v-list-item-action append class="d-flex justify-end">
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

// 수정 시작 함수
const startEditing = (item: TodoType) => {
    item.isEditing = true;
};

// 수정 저장 함수
const saveEdit = async (item: TodoType, event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement;
    const updatedTitle = target.value.trim();

    if (updatedTitle && updatedTitle !== item.title) {
        try {
            const updatedItem = await updateTodo({ ...item, title: updatedTitle });
            emit("updateTodo", updatedItem);    // 부모 컴포넌트에 업데이트된 데이터 전달
        } catch (error) {
            console.log("### 수정 기능 에러 ###", error);
        }
    }

    item.isEditing = false;
};

// 수정 취소 함수
const cancelEdit = (item: TodoType) => {
    item.isEditing = false;
};

// 완료-미완료 토글 메서드
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

const completedStates = computed(() => props.filteredTodoList.map((item) => item.completed));

watch(completedStates, (newCompletedStates: boolean[]) => {
    console.log('Completed states changed:', newCompletedStates);
});


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

.edit-input {
    width: 80%;
    padding: 4px;
    font-size: 16px;
    border: none;
    outline: none;
    text-align: center;
    margin: 0 auto;
    display: block;
}

.center-aligned {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
