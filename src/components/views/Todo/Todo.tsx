import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ITodo } from '@/types/Todo';
import UndoneIcon from '@/components/icons/UndoneIcon';
import useTodo from './useTodo';
import DoneIcon from '@/components/icons/DoneIcon';
import { Controller } from 'react-hook-form';
import { cn } from '@/utils/cn';
import { useEffect } from 'react';

const Todo = () => {
  const {
    control,
    handleSubmit,
    errors,
    dataTodo,
    isSuccessMutateAddTodo,
    handleUpdateTodo,
    handleAddTodo,
    reset,
    selectedId,
    refetchTodo,
    setSelectedId,
    handleDeleteTodo,
    isPendingMutateDeleteTodo,
  } = useTodo();

  useEffect(() => {
    if (isSuccessMutateAddTodo) {
      reset();
      refetchTodo();
    }
  }, [isSuccessMutateAddTodo, refetchTodo, reset]);

  return (
    <>
      <h1 className="font-rubik text-[#174286] text-5xl font-bold mb-16">
        To Do
      </h1>
      <div className="flex justify-center">
        <Card className="border-2 shadow-xl w-[700px]">
          <CardContent className="px-8 py-4">
            <p className="text-xl font-medium text-[#7D7D7D]">Add New task</p>
            <form
              onSubmit={handleSubmit(handleAddTodo)}
              className="flex items-center gap-4">
              <Controller
                name="item"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    type="text"
                    className={cn(
                      'border-black!',
                      errors.item && 'border-red-500!'
                    )}
                  />
                )}
              />
              <Button variant="primary" type="submit" className="h-12">
                Add Todo
              </Button>
            </form>
            {errors.item && (
              <p className="text-red-500 text-sm mt-1">{errors.item.message}</p>
            )}
            {dataTodo?.map((todo: ITodo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between border-b-2 py-4">
                <div className="flex items-center gap-5">
                  <Checkbox
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedId(todo.id!);
                      } else {
                        setSelectedId('');
                      }
                    }}
                    checked={selectedId === todo.id}
                  />
                  <p className="text-[32px]">{todo.item}</p>
                </div>
                <button
                  className="hover:cursor-pointer"
                  onClick={() => {
                    handleUpdateTodo(todo);
                  }}>
                  {' '}
                  {!todo.isDone ? <UndoneIcon /> : <DoneIcon />}
                </button>
              </div>
            ))}
            <Button
              variant="destructive"
              className="text-2xl p-5 mt-16"
              onClick={handleDeleteTodo}
              disabled={!selectedId}>
              {isPendingMutateDeleteTodo ? 'Deleting...' : 'Delete Selected'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Todo;
