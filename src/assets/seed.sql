CREATE TABLE IF NOT EXISTS transactions(id INTEGER PRIMARY KEY AUTOINCREMENT,amount INTEGER, transaction_time DATE,category_name TEXT, description TEXT, category_id INTEGER, split BOOLEAN, ignore BOOLEAN, transaction_type TEXT);

INSERT or IGNORE INTO transactions VALUES (1, 125, new Date(), 'Restaurant', 'Omakase', false, false, 'expense');
INSERT or IGNORE INTO transactions VALUES (2, 225, new Date(), 'Restaurant', 'Supreme', false, false, 'expense');
INSERT or IGNORE INTO transactions VALUES (3, 5, new Date(), 'Restaurant', 'Gigantic Pea', false, false, 'expense');
 
CREATE TABLE IF NOT EXISTS budget(id INTEGER PRIMARY KEY AUTOINCREMENT,income INTEGER, recurringExpenses INTEGER, savingPercentage NUMBER, budgetPerDAY INTEGER);
INSERT or IGNORE INTO budget VALUES (1, 10000, 2000, 0.20, 700);
