import MemberLayout from '@/components/layouts/MemberLayout';
import Todo from '@/components/views/Todo';

const TodoPage = () => {
  return (
    <MemberLayout title="To Do List | Activity">
      <Todo />
    </MemberLayout>
  );
};

export default TodoPage;
