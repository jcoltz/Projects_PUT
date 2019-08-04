INSERT INTO tasks_date (
	[text]
	,start_date
	,end_date
	,progress
	,sortorder
	,[parent]
	,[open]
	,[type]
	,customer
	,customer_id
	,work_order
	,lot_number
	,baseline_start
	,baseline_duration
	,notes
	,active
	,on_hold
	,color
	,textcolor
	,progressColor
	,PO_number
	,quote_number
	,material_on_hand
	,udf1
	
	)
SELECT 
	[descript] 
	,[entered]
	,due
	,0
	,0
	,0
	,0
	,"task"
	,""
	,""
	,fk_wkorder
	,lot_numb
	,[entered]
	,due
	,""
	,1
	,0
	,""
	,""
	,""
	,PO
	,quote_number
	,material_on_hand
	,""	
FROM lotnumber L
LEFT JOIN tasks_date T ON L.fk_wkorder = T.work_order
WHERE L.active = true
	AND T.work_order IS NULL