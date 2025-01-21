<template>
    <!-- v-dialog:  모달 창 구현 컴포넌트 -->
    <v-dialog v-model="showErrorDialog" max-width="600">
        <v-card>
            <v-card-title class="headline">{{ cardTitle }}</v-card-title>
            <v-card-text>
                <!-- 템플릿 리터럴 -->
                {{ `${cardText}는(은) 이미 존재하는 Todo입니다` }}
            </v-card-text>
            <v-card-actions>
                <!-- primary : 기본 색상 -->
                <v-btn color="primary" @click="confirmErrorTodo">확인</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'ConfirmErrorTodo',
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
        const showErrorDialog = ref(true)

        const cancel = () => {
            context.emit('cancel')
        }

        const confirmErrorTodo = () => {
            context.emit('confirmErrorTodo')
        }
        return {
            showErrorDialog,
            cancel,
            confirmErrorTodo
        }
    }
})
</script>

<style scoped></style>
