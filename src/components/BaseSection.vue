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

// const title = ref('');
const todoKeyword = ref('');
const cardText = ref('');
const cardToDeleteId = ref(0);
const showDeleteDialog = ref(false);
const todoList = ref<TodoType[]>([]);

const loadTodosFromStorage = () => {
    const storedTodos = Object.keys(localStorage).map((key) => {
        const todo = localStorage.getItem(key);
        return todo ? JSON.parse(todo) : null;
    })
        .filter(Boolean)
        .sort((a: TodoType, b: TodoType) => a.id - b.id);
    todoList.value = storedTodos;
};

onMounted(() => {
    loadTodosFromStorage();
});

const filteredTodo = computed(() => {
    const keyword = todoKeyword.value.trim().toLowerCase();
    return keyword ? todoList.value.filter(item => item.title.toLowerCase().includes(keyword)) : todoList.value;
});

const addSubmit = (newTodo: TodoType) => {
    const isDuplicate = todoList.value.some(todo => todo.title === newTodo.title);
    if (isDuplicate) {
        alert('이미 존재하는 Todo입니다!');
        return;
    }
    const maxId = todoList.value.length > 0 ? Math.max(...todoList.value.map(todo => todo.id)) : -1;
    const newTodoWithId = { ...newTodo, id: maxId + 1 };
    todoList.value.push(newTodoWithId);
    localStorage.setItem(newTodoWithId.id.toString(), JSON.stringify(newTodoWithId));
};

const handleUpdateTodo = (updatedItem: TodoType) => {
    const index = todoList.value.findIndex((todo) => todo.id === updatedItem.id);
    todoList.value[index] = updatedItem;
};

const handleDelete = (targetId: number, targetTitle: string) => {
    cardText.value = targetTitle;
    cardToDeleteId.value = targetId;
    showDeleteDialog.value = true;
};

const cancel = () => {
    showDeleteDialog.value = false;
};

const confirmDeleteTodo = (targetId: number) => {
    todoList.value = todoList.value.filter((todo) => todo.id !== targetId);
    localStorage.removeItem(targetId.toString());
    showDeleteDialog.value = false;
};
</script>

<style></style>
