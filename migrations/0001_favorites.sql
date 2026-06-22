CREATE TABLE IF NOT EXISTS favorites (
  user_id TEXT NOT NULL,
  tool_path TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, tool_path)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user_sort_order
  ON favorites (user_id, sort_order);
