
INSERT INTO user_setting_groups (group_key, group_name, description, display_order, is_system) VALUES
('time', '時間設定', '拡張時間システムの設定', 1, true),
('display', '表示設定', 'UIの表示に関する設定', 2, true),
('notification', '通知設定', 'タスクの通知に関する設定', 3, true),
('behavior', '動作設定', 'アプリケーションの動作に関する設定', 4, true);

-- 設定定義の初期データを挿入
INSERT INTO user_setting_definitions (
    setting_key, group_key, setting_name, description, setting_type, 
    default_value, validation_rules, display_order, is_required, is_system
) VALUES
-- 時間設定
(
    'day_start_hour', 'time', '開始時刻', 
    '新しい日がスタートする時刻（0-23時）', 'range',
    '2'::jsonb,
    '{"min": 0, "max": 23, "step": 1}'::jsonb,
    1, true, true
),
(
    'max_hour', 'time', '最大時刻', 
    '1日の最大時刻（24-48時）', 'range',
    '29'::jsonb,
    '{"min": 24, "max": 48, "step": 1}'::jsonb,
    2, true, true
),
(
    'timezone', 'time', 'タイムゾーン', 
    'タイムゾーンの設定', 'select',
    '"Asia/Tokyo"'::jsonb,
    '{"options": ["Asia/Tokyo", "Asia/Seoul", "America/New_York", "Europe/London", "UTC"]}'::jsonb,
    3, true, true
),

-- 表示設定
(
    'theme', 'display', 'テーマ', 
    'アプリケーションのテーマ', 'select',
    '"light"'::jsonb,
    '{"options": ["light", "dark", "auto"]}'::jsonb,
    1, false, true
),
(
    'language', 'display', '言語', 
    '表示言語の設定', 'select',
    '"ja"'::jsonb,
    '{"options": ["ja", "en"]}'::jsonb,
    2, false, true
),
(
    'tasks_per_page', 'display', '1ページあたりのタスク数', 
    'タスク一覧で1ページに表示するタスクの数', 'range',
    '20'::jsonb,
    '{"min": 5, "max": 100, "step": 5}'::jsonb,
    3, false, true
),

-- 通知設定
(
    'enable_notifications', 'notification', '通知を有効にする', 
    'タスクの通知機能を有効にするかどうか', 'boolean',
    'true'::jsonb,
    '{}'::jsonb,
    1, false, true
),
(
    'notification_time_before', 'notification', '通知タイミング', 
    'タスクの期日何分前に通知するか', 'select',
    '30'::jsonb,
    '{"options": [5, 10, 15, 30, 60, 120]}'::jsonb,
    2, false, true
),

-- 動作設定
(
    'auto_save', 'behavior', '自動保存', 
    'タスクの編集内容を自動保存するかどうか', 'boolean',
    'true'::jsonb,
    '{}'::jsonb,
    1, false, true
),
(
    'confirm_delete', 'behavior', '削除確認', 
    'タスクを削除する際に確認ダイアログを表示するかどうか', 'boolean',
    'true'::jsonb,
    '{}'::jsonb,
    2, false, true
);
