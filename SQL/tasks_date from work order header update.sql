update tasks_date 
SET
	t.customer_id = w.fk_custid
From tasks_date	
INNER JOIN wkordhead W ON 
(W.workorder = T.work_order)
WHERE W.active = true


UPDATE p
SET p.customer_id = aw8.fk_custid
FROM tasks_date p
INNER JOIN wkordhead aw8
ON p.work_order = aw8.workorder

UPDATE tasks_date
SET customer_id = wkordhead.customer_id
FROM wkordhead as 'emp2'
WHERE
   tasks_date.work_order = emp2.workorder



UPDATE T  
SET T.customer_id = W.customer_id; 
from tasks_date T
INNER JOIN wkordhead W ON T.work_order = W.workorder 
  
  
 UPDATE tasks_date INNER JOIN wkordhead ON tasks_date.work_order = wkordhead.workorder
SET tasks_date.customer_id = [wkordhead].[customer_id]; 