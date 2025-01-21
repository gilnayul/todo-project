<template>
    <v-list>
        <!-- lines="two" : 텍스트 최대 2줄까지 표시 / mb(margin-bottom) : 외부 하단 여백 / 
             border : 각 리스트 테두리 / filteredTodoList : 상위 컴포넌트에서 props로 받은 요소를  -->
        <v-list-item class="mb-6" border height="60" lines="two" rounded v-for="item in filteredTodoList"
            :key="item.id">
            <!-- 동적 클래스 바인딩 : { 클래스 이름: 조건 }-->
            <v-list-item-title :class="{ completed: item.completed }">
                <!-- 객체여서 item.title -->
                {{ item.title }}
            </v-list-item-title>

            <!-- v-slot:append: 리스트 항목 오른쪽 액션 아이콘 추가 -->
            <template v-slot:append>

                <!-- v-list-item-action: 액션 아이콘(버튼 등)을 포함하는 Vuetify 컴포넌트-->
                <v-list-item-action>
                    <!-- 상태 토글을 위한 아이콘 -->
                    <v-icon @click="toggleComplete(item)">mdi-check-circle</v-icon>
                    <v-icon @click="handleDelete(item.id, item.title)">mdi-delete</v-icon>
                </v-list-item-action>
            </template>

        </v-list-item>

        <!-- 진도율 표시 -->
        <v-list-item class="progress-bar" height="50" lines="one" align="center">
            <v-list-item-title>
                진도율: {{ completedCount }}/{{ totalCount }} ({{ progress }}%)
            </v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import type { TodoType } from '../interfaces/Todod';
import type { PropType } from 'vue';    // props 타입 지정

export default defineComponent({

    props: {
        filteredTodoList: {

            // filteredTodoList 각 요소가 TodoType 객체임을 정의
            // PropType<> : 배열 요소 타입 지정 
            type: Array as PropType<TodoType[]>,
            required: true,     // prop 필수 설정
        },
    },

    setup(props, context) {



        // 완료-미완료 토글 메서드
        const toggleComplete = (item: TodoType) => {
            item.completed = !item.completed;
            context.emit('updateTodo', item); // 상위 컴포넌트에 변경 사항 전달
        };

        // 항목 삭제 메서드
        const handleDelete = (targetId: number, targetTitle: string) => {
            context.emit('handleDelete', targetId, targetTitle);
        };

        // 완료된 항목 개수 계산
        const completedCount = computed(() =>
            props.filteredTodoList.filter(item => item.completed).length
        );

        // 총 항목 개수 계산
        const totalCount = computed(() => props.filteredTodoList.length);

        // 진도율 계산
        const progress = computed(() => {
            if (totalCount.value === 0) return 0;
            return Math.round((completedCount.value / totalCount.value) * 100);
        });

        return {
            toggleComplete,
            handleDelete,
            completedCount,
            totalCount,
            progress,
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