const addTodo = (newItem)=>{ //添加待办项的action
	return {
		type: 'ADD_ITEM',
		newItem
	}
}
const toggleTodo = (index)=>{ //点击触发待办项完成或没完成的action
	return {
		type: 'TOGGLE_ITEM',
		changeID: index
	}
}

export { addTodo, toggleTodo }