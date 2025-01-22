<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="8"></v-col>
        </v-row>
        <!-- 키워드 검색 -->
        <v-text-field v-model="localSearchKeyword" class="mb-4" @input="onInput" label="키워드 검색" variant="outlined">
        </v-text-field>
    </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// Props 정의
const props = defineProps<{
    searchKeyword: string
}>();

// Emits 정의
const emit = defineEmits<{
    (event: 'update:searchKeyword', value: string): void;
}>();

// 로컬 상태
const localSearchKeyword = ref(props.searchKeyword);

// Props 변경 감지
watch(() => props.searchKeyword, (newValue) => {
    localSearchKeyword.value = newValue;
});

// 입력 이벤트 핸들러
const onInput = () => {
    emit('update:searchKeyword', localSearchKeyword.value);
};
</script>

<style scoped></style>
