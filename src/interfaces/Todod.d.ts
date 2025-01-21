export interface TodoType {
  // 접두사를 대문자로 쓰면 객체 타입으로 원시 타입을 감싸버려 객체가 되어버림
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
