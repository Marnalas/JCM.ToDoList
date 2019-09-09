/**
 * A ToDo item.
 */
export default interface ToDo {
  id: string;
  user: string;
  order: number;
  title: string;
  description: string;
  isDone: boolean;
}
