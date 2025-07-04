alter table task_tags enable row level security;

-- task_tagsテーブルのポリシー
DROP POLICY IF EXISTS "users can view own task_tags" ON task_tags;
create policy "users can view own task_tags"
  on task_tags for select
  using (auth.uid() = user_id);

DROP POLICY IF EXISTS "users can create own task_tags" ON task_tags;
create policy "users can create own task_tags"
  on task_tags for insert
  with check (auth.uid() = user_id);

DROP POLICY IF EXISTS "users can update own task_tags" ON task_tags;
create policy "users can update own task_tags"
  on task_tags for update
  using (auth.uid() = user_id);

DROP POLICY IF EXISTS "users can delete own task_tags" ON task_tags;
create policy "users can delete own task_tags"
  on task_tags for delete
  using (auth.uid() = user_id);

