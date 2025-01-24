export interface TodoType {
    id: number;
    title: string;
    completed: boolean;
    isEditing: boolean; // 수정 상태 여부
    newTitle: string;   // 수정 중인 title
}
