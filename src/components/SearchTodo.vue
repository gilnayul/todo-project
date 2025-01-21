<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="8">

            </v-col>
        </v-row>
    </v-container>
    <!-- mb(margin-bottom) : 외부 하단 여백 -->
    <v-text-field v-model="localSearchKeyword" class="mb-4" @input="onInput" label="키워드 검색" variant="outlined">
    </v-text-field>
</template>


<script lang="ts">
// import { mergeProps } from 'vue';
import { watch } from 'vue';
import { defineComponent, ref } from 'vue'

export default defineComponent({

    // vue 개발자 도구에서 컴포넌트 트리를 지정한 이름으로 식별하기 위해
    // 이름을 지정하지 않으면 Anonymous Component 또는 <Component>로 표시됨
    name: 'SearchTodo',
    props: {
        searchKeyword: {
            type: String,
            default: ''
        }     // 부모에서 내려온 값을 받을 props
    },

    emits: ['update:searchKeyword'], // emit 이벤트 정의

    // { emit } : 중괄호 없이 사용할 경우 변수로 받아들임
    setup(props, { emit }) {     // props 공란
        const localSearchKeyword = ref(props.searchKeyword || '');  // 사용자가 입력한 값을 저장하는 공간

        watch(() => props.searchKeyword, (newValue) => {
            localSearchKeyword.value = newValue;
        });

        const onInput = () => {
            emit('update:searchKeyword', localSearchKeyword.value);
        };

        // e.target : 타입을 단언하고 싶을 때 사용*
        // searchKeyword : 타입 단언이 불필요하고 v-model을 사용하고 있을 때 사용*

        // e : DOM  이벤트 객체(SearchTodo에서는 @input 이벤트가 발생하면 Vue가 자동으로 onInput 함수 호출하고 첫 번째 매개변수 e로 전달)*
        // const onInput = (e: Event) => {

        //     // e.target         : <input type="타입" value="실제 값">
        //     // HTMLInputElement : 따로 지정이 없으면 EventTarget으로 인식되는데 속성(value)가 없어서 지정 | 타입 단언(선언) | DOM 객체*
        //     // * 왜 searchKeyword를 써도 되는데 e.target을 따로 썼는지*
        //     const target = e.target as HTMLInputElement
        //     emit('update:searchKeyword', target.value)      // update: 양방향 데이터 바인딩을 위해 필요
        // }

        return {
            localSearchKeyword,
            onInput
        }
    }
})
</script>

<style scoped></style>
