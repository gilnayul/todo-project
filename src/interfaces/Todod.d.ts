export interface TodoType {
    id: number;
    title: string;
    completed: boolean;

    // 임시저장
    isEditing: boolean; 
    newTitle: string;
}
