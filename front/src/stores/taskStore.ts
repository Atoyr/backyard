import { defineStore } from 'pinia';

import { supabase } from '@/lib/supabase';
import type { Task } from "@/types/task";
import { transformTaskRowToModel } from '@/utils/transformers/task';


type State = {
  taskList: Task[];
  loading: boolean;
  error?: string | null;
}

export const useTaskStore = defineStore('tasks', {
  state: (): State => ({
    taskList: [],
    loading: false,
    error: null
  }), 
  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      
      try {
        const { data, error: supabaseError } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (supabaseError) {
          throw supabaseError
        }
        
        this.taskList = data.map(transformTaskRowToModel);
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'TODOの取得に失敗しました'
        console.error('Error fetching todos:', err)
      } finally {
        this.loading = false
      }
    },
    async createTask(newTask: Omit<Task, 'id' | 'created_at'>) {
      this.loading = true
      this.error = null

      try {
        const { data, error: createError } = await supabase
          .from('tasks')
          .insert([{
            title: newTask.title,
            description: newTask.description,
            due_date: newTask.dueDate,
            completed: false
          }])
          .select()
          .single()

          if (createError) throw createError
          
          this.taskList.unshift(data)
          return data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'TODOの登録に失敗しました'
      } finally {
        this.loading = false
      }
    }, 
  }
});

