<template>
    <v-app>
        <v-main>
            <!-- 여백 부여 -->
            <!-- v-container: 컨텐츠를 중앙에 놓음 -->
            <v-container class="mt-12">

                <!-- v-row, v-col : 화면 분할 -->
                <v-row justify="center">
                    <v-col cols="12" sm="8" md="6">
                        <h1 class="text-center">Todo List</h1>

                        <!-- v-card: 박스/카드 형태 -->
                        <!-- pa : 안쪽 여백(padding) 부여 -->
                        <v-card class="pa-10">
                            <v-form>

                                <!-- Todo 추가 -->
                                <!-- @하위 이벤트 이름 = "이벤트 핸들러" -->
                                <!-- 일반 이벤트 : 이벤트 행위 자체
                                     이벤트 핸들러 : 이벤트가 발생했을 때 실행되는 구체적 기능(함수) -->
                                <AddTodo @handleSubmit="addSubmit" />

                                <!-- Todo 키워드 검색 -->
                                <!-- v-model: 하위 속성 이름 = "상위 변수" -->
                                <SearchTodo v-model:searchKeyword="todoKeyword" />

                                <!-- TodoList -->
                                <!-- @ : v-on // : = v-bind *-->
                                <TodoList :filteredTodoList="filteredTodo" @updateTodo="handleUpdateTodo"
                                    @handleDelete="handleDelete" />
                            </v-form>
                        </v-card>lo
                    </v-col>
                </v-row>
            </v-container>
            <!-- :card-text = 폰트 지정, 하단 여백 제거 -->
            <ConfirmDialog card-title="Todo 삭제" :card-text="cardText" :modelValue="showDeleteDialog" @cancel="cancel"
                @confirmDeleteTodo="confirmDeleteTodo(cardToDeleteId)" />
            <!-- <ErrorDialog card-title="Todo 중복" :card-text="cardText" :modelValue="showErrorDialog" @cancel="cancel"
                @confirmErrorTodo="confirmErrorTodo(cardToDeleteId)" /> -->
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import AddTodo from './AddTodo.vue'
import SearchTodo from './SearchTodo.vue'
import TodoList from './TodoList.vue'
import ConfirmDialog from './modal/ConfirmDialog.vue'
// import ErrorDialog from './modal/ErrorDialog.vue'
import type { TodoType } from '../interfaces/Todod'
import { onMounted } from 'vue'

// export default : 하나의 *개체만 선언되어 있는 모듈
export default defineComponent({

    // 하위 컴포넌트 등록
    components: { AddTodo, SearchTodo, TodoList, ConfirmDialog },

    // 하위 컴포넌트 내부 로직 정의
    setup() {
        const title = ref('')
        const todoKeyword = ref('')

        const cardText = ref('')
        const cardToDeleteId = ref(0)   // 아직 제거할 목록이 없는 상태(id는 1부터 시작)
        const showDeleteDialog = ref(false)     // 모달이 숨겨져 있는 상태

        // 제네릭 문법 : 타입 동적으로 지정 가능(TodoType[]으로 타입 매개변수 지정)
        const todoList = ref<TodoType[]>([])

        // localstorage 데이터 표시
        // map((key)) => : key를 활용해 value를 가져옴
        const loadTodosFromStorage = () => {
            const storedTodos = Object.keys(localStorage).map((key) => {
                const todo = localStorage.getItem(key);
                return todo ? JSON.parse(todo) : null;
            })
                .filter(Boolean)
                .sort((a: TodoType, b: TodoType) => a.id - b.id);
            todoList.value = storedTodos;
        };



        // 컴포넌트 로드 시 호출
        onMounted(() => {
            loadTodosFromStorage();
        });


        // 필터 기능
        const filteredTodo = computed(() => {
            const keyword = todoKeyword.value.trim().toLowerCase()  // 공백 제거 + 소문자 통일
            if (!keyword) {     // 검색어가 없는 경우 - 모든 할 일 표시
                return todoList.value
            } else {
                // 검색어가 있는 경우 - 목록(item.title)에 검색어(keyword)가 포함되어 있는 조건에 맞는 항목 표시
                // item : todoList.value 별칭
                return todoList.value.filter(item => item.title.toLowerCase().includes(keyword))
            }
        })

        // addTodo의 이벤트 핸들러
        const addSubmit = (newTodo: TodoType) => {

            // 중복 title 방지
            const isDuplicate = todoList.value.some(todo => todo.title === newTodo.title);
            if (isDuplicate) {
                alert('이미 존재하는 Todo입니다!');
                return;
            }

            // 현재 todoList에서 가장 큰 id를 찾기
            const maxId = todoList.value.length > 0
                ? Math.max(...todoList.value.map(todo => todo.id))
                : -1;

            // 새로운 id를 기존 maxId + 1로 설정
            const newTodoWithId = { ...newTodo, id: maxId + 1 };

            todoList.value.push(newTodoWithId);   // AddTodo에서 전달받은    데이터 추가*
            localStorage.setItem(newTodoWithId.id.toString(), JSON.stringify(newTodoWithId))    // JSON.stringfy : 객체 or 값을 JSON 문자열로 변환

        };

        // 토글 변수
        const handleUpdateTodo = (updatedItem: TodoType) => {
            const index = todoList.value.findIndex((todo) => todo.id === updatedItem.id);
            todoList.value[index] = updatedItem;

        };


        // 삭제 변수
        const handleDelete = (targetId: number, targetTitle: string) => {
            cardText.value = targetTitle
            cardToDeleteId.value = targetId
            showDeleteDialog.value = true
        }

        const cancel = () => {
            showDeleteDialog.value = false
        }

        // 삭제 확인 모달 이벤트 핸들러
        const confirmDeleteTodo = (targetId: number) => {
            todoList.value = todoList.value.filter((todo) => todo.id !== targetId)
            localStorage.removeItem(targetId.toString())
            showDeleteDialog.value = false
        }

        // 중복 확인 모달 이벤트 핸들러 - ###
        // const confirmErrorTodo = (targetTitle: string) => {
        //     cardText.value = tartgetTitle

        //     if 
        //     todoList.value = todoList.value.filter((todo) => todo.id !== targetId)
        //     localStorage.removeItem(targetId.toString())
        //     showDeleteDialog.value = false
        // }

        return {
            addSubmit,
            title,
            todoKeyword,
            todoList,
            cardText,
            cardToDeleteId,
            showDeleteDialog,
            filteredTodo,
            handleDelete,
            cancel,
            confirmDeleteTodo,
            handleUpdateTodo
        }
    }
})
</script>
<style></style>
