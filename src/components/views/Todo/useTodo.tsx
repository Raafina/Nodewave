import todoService from '@/services/todo.service';
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ITodo, ITodoUpdatePayload } from '@/types/Todo';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const todoSchema = z.object({
  item: z.string().min(1, 'Item is required'),
});

const useTodo = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>('');

  // Get All Task
  const getTodos = async () => {
    const params = ``;
    const res = await todoService.getTodos(params);
    const { data } = res;
    return data.content.entries;
  };

  const {
    data: dataTodo,
    isLoading: isLoadingTodo,
    isRefetching: isRefetchingTodo,
    refetch: refetchTodo,
  } = useQuery({
    queryKey: ['Events'],
    queryFn: () => getTodos(),
    enabled: router.isReady,
  });

  // Create Task
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      item: '',
    },
  });

  const addTodo = async (payload: ITodo) => {
    const res = await todoService.addTodo(payload);
    return res;
  };

  const {
    mutate: mutateAddTodo,
    isPending: isPendingMutateAddTodo,
    isSuccess: isSuccessMutateAddTodo,
  } = useMutation({
    mutationFn: addTodo,
    onError: (error) => {
      toast.error(error.message || 'Invalid add Task');
    },
    onSuccess: () => {
      toast.success('Success add Task');
      reset();
    },
  });

  const handleAddTodo = (data: ITodo) => mutateAddTodo(data);

  // Update Task
  const updateTodo = async (todo: ITodo) => {
    const payload: ITodoUpdatePayload = {
      action: todo.isDone ? 'UNDONE' : 'DONE',
    };
    const { data } = await todoService.updateTodo(todo.id!, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateTodo,
    isPending: isPendingMutateUpdateTodo,
    isSuccess: isSuccessMutateUpdateTodo,
  } = useMutation({
    mutationFn: (todo: ITodo) => updateTodo(todo),
    onError: (error) => {
      toast.error(error.message || 'Invalid update Task');
    },
    onSuccess: () => {
      refetchTodo();
      toast.success('Success update Task');
    },
  });

  const handleUpdateTodo = (todo: ITodo) => {
    mutateUpdateTodo(todo);
  };

  const deleteTodo = async (selectedId: string) => {
    const res = await todoService.deleteTodo(selectedId);
    return res;
  };

  const {
    mutate: mutateDeleteTodo,
    isPending: isPendingMutateDeleteTodo,
    isSuccess: isSuccessMutateDeleteTodo,
  } = useMutation({
    mutationFn: deleteTodo,
    onError: (error) => {
      toast.error(error.message || 'Invalid delete Task');
    },
    onSuccess: () => {
      toast.success('Success delete Task');
      refetchTodo(); // agar list ter-update setelah delete
      setSelectedId(''); // reset selection
    },
  });

  const handleDeleteTodo = () => {
    if (!selectedId) {
      toast.error('Please select a task to delete');
      return;
    }

    mutateDeleteTodo(selectedId);
  };

  return {
    dataTodo,
    isLoadingTodo,
    isRefetchingTodo,
    selectedId,
    setSelectedId,
    refetchTodo,
    handleUpdateTodo,
    handleDeleteTodo,
    isPendingMutateUpdateTodo,
    isSuccessMutateUpdateTodo,
    isPendingMutateAddTodo,
    isSuccessMutateAddTodo,
    isPendingMutateDeleteTodo,
    isSuccessMutateDeleteTodo,
    mutateDeleteTodo,
    control,
    handleAddTodo,
    handleSubmit,
    errors,
    reset,
    setError,
  };
};

export default useTodo;
