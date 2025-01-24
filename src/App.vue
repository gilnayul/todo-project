<template>
  <v-app>
    <v-main class="no-scrollbar">
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
import AddTodo from '../src/components/AddTodo.vue';
import SearchTodo from '../src/components/SearchTodo.vue';
import TodoList from '../src/components/TodoList.vue';
import ConfirmDialog from '../src/components/modal/ConfirmDialog.vue';
import { TodoType } from './interfaces/Todod';
import { fetchTodos, updateTodo, deleteTodo } from './services/api';
import axios from 'axios';

const todoKeyword = ref('');
const cardText = ref('');
const cardToDeleteId = ref(0);
const showDeleteDialog = ref(false);
const todoList = ref<TodoType[]>([]);

// 네트워크에서 Todo 리스트 로드
const loadTodosFromStorage = async () => {
  try {
    const response = await fetchTodos();
    todoList.value = response.data.map((item: TodoType) => ({
      ...item,
      isEditing: false,
      newTitle: '',
    }));
  } catch (error) {
    console.error('Failed to load todos:', error);
  }
};


// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadTodosFromStorage();
});

// 필터링된 Todo 리스트 계산
const filteredTodo = computed(() => {
  const keyword = todoKeyword.value.trim().toLowerCase();
  return keyword
    ? todoList.value.filter((item) => item.title.toLowerCase().includes(keyword))
    : todoList.value;
});

// AddTodo에서 전달된 데이터를 처리
const addSubmit = async (title: string) => {
  if (!title.trim()) {
    alert('Title is empty');
    return;
  }
  try {
    const response = await axios.post<TodoType>('/api/todos', {
      title,
      completed: false,
    });
    todoList.value.push({
      ...response.data,
      isEditing: false,
      newTitle: '',
    });
  } catch (error) {
    console.error('Error adding todo:', error);
  }
  loadTodosFromStorage();
};


// Todo 업데이트 처리
const handleUpdateTodo = async (updatedItem: TodoType) => {
  try {
    const response = await updateTodo(updatedItem);
    const index = todoList.value.findIndex((todo) => todo.id === updatedItem.id);
    if (index !== -1) {
      todoList.value[index] = response; // 업데이트된 Todo 반영
    }
  } catch (error) {
    console.error('Failed to update todo:', error);
  }
};

// Todo 삭제 다이얼로그 표시
const handleDelete = (targetId: number, targetTitle: string) => {
  cardText.value = targetTitle;
  cardToDeleteId.value = targetId;
  showDeleteDialog.value = true;
};

// 삭제 다이얼로그 취소
const cancel = () => {
  showDeleteDialog.value = false;
};

// Todo 삭제 처리
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
<style>
.no-scrollbar {
  overflow: hidden;
  /* 스크롤 바 숨기기 */
}
</style>