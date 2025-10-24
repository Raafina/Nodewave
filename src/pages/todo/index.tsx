import Todo from '@/components/views/Todo';
import AuthLayout from '@/components/layouts/AuthLayout';
const TodoPage = () => {
  return (
    <AuthLayout>
      <Todo />
    </AuthLayout>
  );
};

export default TodoPage;
