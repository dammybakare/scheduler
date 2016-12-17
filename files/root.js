const Box = require('./box');
const Popup = require('./popup');
const rt = React.createClass({
	getInitialState: function() {
		LDB.init();
		this.props = this.props || {};
		return {
			startTime: this.props.startTime || 9,
			endTime: this.props.endTime || 17
		};
	},
	data: function(){
		const val = [];
		for(let i = this.state.startTime; i <= this.state.endTime; i++) {
			val.push({
				key: i,
				data: LDB.getLS(i)
			});
		}
		return val;
	},
	setData: function(param){
		LDB.setLS(param.key, param.value);
		this.forceUpdate();
	},
	clrData: function(key){
		LDB.delLS(key);
		this.forceUpdate();
	},
	reset: function(key){
		LDB.clsLS();
		this.forceUpdate();
	},
	render: function(){
		const timeSlots = this.data();
		const boxArr = timeSlots.map(e => 
			React.createElement(Box, {
				data: e.data,
				ref:(timeBox) => { if(timeBox)timeBox.par = this; },
				key: e.key,
				value: e.key
			})
		);
		const popupElem = React.createElement(Popup,{
			ref:(elem) => { 
				if(elem){
					this.popup = elem; 
					elem.par = this;
				}
			}
		});
		return React.createElement('div', {
			className: 'root'
		},
		boxArr,
		popupElem);
	}
});
const LDB = {
	init: function(){
		if(!localStorage.app){
			localStorage.app = JSON.stringify({});
		}
	},
	setLS: function(key = '', value = ''){
		const k = JSON.parse(localStorage.app);
		k[key] = value;
		localStorage.app = JSON.stringify(k);
	},
	getLS: function(key = ''){
		return JSON.parse(localStorage.app)[key];
	},
	delLS: function(key){
		const k = JSON.parse(localStorage.app);
		delete k[key];
		localStorage.app = JSON.stringify(k);
	},
	clrLS: function(){
		localStorage.removeItem('app');
	}
};

module.exports.rt = rt;