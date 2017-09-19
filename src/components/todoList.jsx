import React,{ Component } from 'react'
import './todoList.less'
import  { store }  from './store.js'
import { addTodo, toggleTodo } from './action.js'

export default class TodoList extends Component {
	constructor(props){
		super(props);
		this.state = {
			list: [],
			filter : 'all'
		}
		this.getInputVal = this.getInputVal.bind(this);
		this.toggleList = this.toggleList.bind(this);
		this.itemFilter = this.itemFilter.bind(this);
	}

	componentDidMount(){
		let changeState = ()=>{
			this.setState({
				list: store.getState()
			});
			//console.log(store.getState());
		}
		store.subscribe(changeState);
	}

	getInputVal(){ //点击添加按钮的执行函数
		let val = this.refs.inp.value;
		store.dispatch(addTodo(val));
		this.refs.inp.value = '';
		this.refs.inp.focus();
	}

	toggleList(index,ev){ //点击切换完成与未完成的函数

		store.dispatch(toggleTodo(index));
		this.itemFilter(this.state.filter);

	}

	itemFilter(option,ev){
		//console.dir(Object.keys(ev)); 可以循环出keys
		//console.log(typeof this.refs.tab.children);
		if(ev){
			Array.prototype.forEach.call(this.refs.tab.children,(ele)=>{
				ele.className = '';
			})
			let currentNode = ev.currentTarget; //当前点击的节点元素object
			currentNode.className = 'active';
		}
		switch(option){
			case 'all':
				this.setState({
					list: store.getState() || [],
					filter: 'all'
				});
			break;
			case 'active':
				let list = store.getState() || [];
				let tempList = list.filter(function(item){
					return !item.del
				});
				this.setState({
					list: tempList || [],
					filter: 'active'
				});
			break;
			case 'crossed':
				let list1 = store.getState() || [];
				let tempList1 = list1.filter(function(item){
					return item.del
				});
				this.setState({
					list: tempList1 || [],
					filter: 'crossed'
				});
			break;

		}
	}

	render(){
		let _this = this;
		return (
			<div className="todoList">
				<div className="up">
					<input type="text" placeholder="请输入待办事项名称" ref="inp"/>
					<button onClick={this.getInputVal}>添加</button>
				</div>
				<div className="middle" ref='tab'>
					<span className="active" onClick={this.itemFilter.bind(this,'all')}>所有</span>
					<span onClick={this.itemFilter.bind(this,'active')}>未完成</span>
					<span onClick={this.itemFilter.bind(this,'crossed')}>完成</span>
				</div>
				<div className="down">
					<ul>
						{
							this.state.list.map(function(obj,index){
								return (
									<li key={index} onClick={_this.toggleList.bind(_this,obj.ID)} style={{'textDecoration':obj.del?'line-through':'none'}}>
											{obj.item}
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}