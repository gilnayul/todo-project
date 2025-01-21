<template>
    <!-- v-dialog:  모달 창 구현 컴포넌트 -->
    <v-dialog v-model="showDeleteDialog" max-width="600">
        <v-card>
            <v-card-title class="headline">{{ cardTitle }}</v-card-title>
            <v-card-text>
                <!-- 템플릿 리터럴 -->
                {{ `${cardText}을(를) 삭제하겠습니까?` }}
            </v-card-text>
            <v-card-actions>
                <v-btn @click="cancel">취소</v-btn>
                <!-- primary : 기본 색상 -->
                <v-btn color="primary" @click="confirmDeleteTodo">삭제</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'ConfirmDeleteTodo',
    props: {
        cardTitle: {
            type: String,
            default: ''
        },
        cardText: {
            type: String,
            default: ''
        }
    },
    setup(_, context) {
        const showDeleteDialog = ref(true)

        const cancel = () => {
            context.emit('cancel')
        }

        const confirmDeleteTodo = () => {
            context.emit('confirmDeleteTodo')
        }
        return {
            showDeleteDialog,
            cancel,
            confirmDeleteTodo
        }
    }
})
</script>

<style scoped></style>
