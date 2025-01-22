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

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import { fetchTodos, updateTodo, deleteTodo } from '@/services/api';
import type { TodoType } from '../interfaces/Todod';
import type { PropType } from 'vue';

export default defineComponent({
    props: {
        filteredTodoList: {
            type: Array as PropType<TodoType[]>,
            required: true,
        },
    },
    setup(_, context) {
        const todos = ref<TodoType[]>([]);

        // 완료-미완료 토글 메서드
        const toggleComplete = async (item: TodoType) => {
            item.completed = !item.completed;
            try {
                await updateTodo(item.id, item); // API 호출
                context.emit('updateTodo', item); // 상위 컴포넌트에 변경 사항 전달
            } catch (error) {
                console.error('Failed to update todo:', error);
            }
        };

        // 항목 삭제 메서드
        const handleDelete = async (targetId: number, targetTitle: string) => {
            try {
                await deleteTodo(targetId); // API 호출
                context.emit('handleDelete', targetId, targetTitle);
            } catch (error) {
                console.error('Failed to delete todo:', error);
            }
        };

        // Todos 데이터 불러오기
        const loadTodos = async () => {
            try {
                const response = await fetchTodos(); // API 호출
                todos.value = response.data;
            } catch (error) {
                console.error('Failed to fetch todos:', error);
            }
        };

        // 완료된 항목 개수 계산
        const completedCount = computed(() =>
            todos.value.filter(item => item.completed).length
        );

        // 총 항목 개수 계산
        const totalCount = computed(() => todos.value.length);

        // 진도율 계산
        const progress = computed(() => {
            if (totalCount.value === 0) return 0;
            return Math.round((completedCount.value / totalCount.value) * 100);
        });

        // 컴포넌트가 마운트되면 Todos 데이터 로드
        onMounted(() => {
            loadTodos();
        });

        return {
            todos,
            toggleComplete,
            handleDelete,
            completedCount,
            totalCount,
            progress,
            loadTodos,
        };
    },
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
</style>
