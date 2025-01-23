<template>
    <v-app>
        <v-main>
            <v-container class="mt-12">
                <v-row justify="center">
                    <v-col cols="12" sm="8" md="6">
                        <h1 class="text-center">Todo List</h1>
                        <v-card class="pa-10">
                            <v-form>
                                <AddTodo @handleSubmit="addSubmit" />
                                <SearchTodo v-model:searchKeyword="todoKeyword" />
                                <TodoList :filteredTodoList="filteredTodo" @updateTodo="handleUpdateTodo"
                                    @handleDelete="handleDelete" />
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <ConfirmDialog card-title="Todo 삭제" :card-text="cardText" :modelValue="showDeleteDialog" @cancel="cancel"
                @confirmDeleteTodo="confirmDeleteTodo(cardToDeleteId)" />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import AddTodo from './AddTodo.vue';
import SearchTodo from './SearchTodo.vue';
import TodoList from './TodoList.vue';
import ConfirmDialog from './modal/ConfirmDialog.vue';
import type { TodoType } from '../interfaces/Todod';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/api';

const todoKeyword = ref('');
const cardText = ref('');
const cardToDeleteId = ref(0);
const showDeleteDialog = ref(false);
const todoList = ref<TodoType[]>([]);

const loadTodosFromStorage = async () => {
    try {
        const response = await fetchTodos();
        todoList.value = response.data.sort((a: TodoType, b: TodoType) => a.id - b.id);

    } catch (error) {
        console.error('Failed to load todos:', error);
    }
};

onMounted(() => {
    loadTodosFromStorage();
});

const filteredTodo = computed(() => {
    const keyword = todoKeyword.value.trim().toLowerCase();
    return keyword ? todoList.value.filter(item => item.title.toLowerCase().includes(keyword)) : todoList.value;
});

const addSubmit = async (newTodo: TodoType) => {
    const isDuplicate = todoList.value.some(todo => todo.title === newTodo.title);
    if (isDuplicate) {
        alert('이미 존재하는 Todo입니다!');
        return;
    }
    try {
        const response = await createTodo({ text: newTodo.title });
        todoList.value.push(response.data);
    } catch (error) {
        console.error('Failed to add todo:', error);
    }
};

const handleUpdateTodo = async (updatedItem: TodoType) => {
    try {
        const response = await updateTodo(updatedItem);
        const index = todoList.value.findIndex((todo) => todo.id === updatedItem.id);
        todoList.value[index] = response.data;
    } catch (error) {
        console.error('Failed to update todo:', error);
    }
};

const handleDelete = (targetId: number, targetTitle: string) => {
    cardText.value = targetTitle;
    cardToDeleteId.value = targetId;
    showDeleteDialog.value = true;
};

const cancel = () => {
    showDeleteDialog.value = false;
};

const confirmDeleteTodo = async (targetId: number) => {
    try {
        await deleteTodo(targetId);
        todoList.value = todoList.value.filter((todo) => todo.id !== targetId);
        showDeleteDialog.value = false;
    } catch (error) {
        console.error('Failed to delete todo:', error);
    }
};
</script>



<style></style>
