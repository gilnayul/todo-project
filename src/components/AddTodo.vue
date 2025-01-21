<template>
    <!-- v-text-field : 텍스트 입력 필드(창) -->
    <v-text-field v-model="title" label="Todo 추가" class="mb-4" variant="outlined">

        <!-- #append : 오른쪽 끝에 콘텐츠 삽입 지정-->
        <template #append>
            <v-icon @click="handleSubmit">mdi-pencil</v-icon>
        </template>
    </v-text-field>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import type { TodoType } from '../interfaces/Todod';

// export default : 하나의 *개체를 내보낼 때 사용
//                : 컴포넌트를 외부(BaseSection.vue)로 보내는 역할
// export :  여러 개체(함수, 객체, 값)을 내보낼 때 사용
// 
export default defineComponent({

    // 상위 컴포넌트로 보낼 이벤트 이름 정의
    emits: ["handleSubmit"],

    // *객체 리터럴 : 객체를 정의하는 구문(중괄호로 정의 + 키,값)
    // 컴포넌트 핵심 동작 정의
    setup(_, { emit }) {
        const title = ref('');  // 사용자가 입력한 값을 저장하는 공간

        const handleSubmit = () => {

            // = : 정의 || == : 값 비교 || === : 값, 타입 비교
            if (title.value.trim() === '') return;

            // const newTodo: TodoType = {
            //     id: nextTodoId.value++,   // 유일키
            //     title: title.value.trim(), // 입력값 trim(문자열 양 끝 공백 제거)해서 입력
            //     completed: false    // 미완료 상태
            // }

            emit('handleSubmit', { title: title.value.trim(), completed: false });
            // emit('handleSubmit', newTodo);
            title.value = '';

        };


        return {
            title,
            handleSubmit,
        };
    }
});
</script>

<style scoped></style>
