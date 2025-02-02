<template>
    <v-list>
        <v-list-item class="todo-item mb-2" border height="60" lines="one" rounded v-for="item in filteredTodoList"
            :key="item.id">
            <v-row>
                <!-- ✅ 체크박스 (맨 왼쪽, 수직 & 수평 중앙 정렬) -->
                <v-col cols="2" class="d-flex align-center justify-center">
                    <v-checkbox v-model="selectedItems" :value="item.id" density="compact"
                        class="d-flex align-center"></v-checkbox>
                </v-col>


                <!-- ✅ 제목 (가운데) -->
                <v-col cols="7" class="d-flex align-center">
                    <template v-if="item.isEditing">
                        <input type="text" :value="item.title" @blur="cancelEdit(item)"
                            @keydown.enter="saveEdit(item, $event)" class="edit-input center-aligned" />
                    </template>
                    <template v-else>
                        <v-list-item-title :class="{ completed: item.completed }" @dblclick="startEditing(item)">
                            {{ item.title }}
                        </v-list-item-title>
                    </template>
                </v-col>

                <!-- ✅ 아이콘 (토글, 삭제 - 한 줄로 정렬) -->
                <v-col cols="3" class="icon-container">
                    <v-icon @click="toggleComplete(item)" class="mr-2">mdi-check-circle</v-icon>
                    <v-icon @click="handleDelete(item.id, item.title)">mdi-delete</v-icon>
                </v-col>
            </v-row>
        </v-list-item>

        <v-list-item class="progress-bar" height="50" lines="one" align="center">
            <v-list-item-title>
                진도율: {{ completedCount }}/{{ totalCount }} ({{ progress }}%)
            </v-list-item-title>
        </v-list-item>

        <!-- ✅ 버튼 2개 추가 -->
        <v-list-item class="d-flex justify-center">
            <v-btn color="red" @click="deleteAllTodos">전체 삭제</v-btn>
            <v-btn color="blue" class="ml-4" @click="deleteSelectedTodos" :disabled="selectedItems.length === 0">
                선택 삭제 ({{ selectedItems.length }})
            </v-btn>
        </v-list-item>
    </v-list>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, defineEmits, watch } from "vue";
import { updateTodo, deleteTodo } from '../services/api';
import type { TodoType } from '../interfaces/Todod';

// Props 정의
const props = defineProps({
    filteredTodoList: {
        type: Array as () => TodoType[],
        required: true,
    },
});

// Emits 정의
const emit = defineEmits(["updateTodo", "handleDelete", "updateProgress"]);

// ✅ 선택한 항목 ID 저장하는 배열
const selectedItems = ref<number[]>([]);

// ✅ 전체 삭제 기능
const deleteAllTodos = async () => {
    for (const item of props.filteredTodoList) {
        await deleteTodo(item.id);
        emit("handleDelete", item.id, item.title);
    }
};

// ✅ 선택 삭제 기능
const deleteSelectedTodos = async () => {
    for (const id of selectedItems.value) {
        const item = props.filteredTodoList.find((todo) => todo.id === id);
        if (item) {
            await deleteTodo(id);
            emit("handleDelete", id, item.title);
        }
    }
    selectedItems.value = []; // 삭제 후 선택 목록 초기화
};

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

watch(progress, (newProgress) => {
    emit("updateProgress", newProgress);
});
</script>

<style scoped>
.todo-item {
    /* display: flex; */
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: white;
    border-radius: 8px;
}

/* ✅ 체크박스 수직 및 수평 중앙 정렬 */
/* .checkbox-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
} */

/* ✅ 아이콘을 한 줄로 정렬 */
.icon-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

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
    width: 100%;
    padding: 6px;
    font-size: 16px;
    border: 1px solid #ccc;
    outline: none;
    text-align: center;
    display: block;
    border-radius: 4px;
}

.v-btn {
    min-width: 120px;
}

.mr-2 {
    margin-right: 8px;
}
</style>
