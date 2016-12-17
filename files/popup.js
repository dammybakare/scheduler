var popup = React.createClass({
	getInitialState: function(){
		this.props = this.props || {};
		return {
			visible: false,
			name: '',
			number: '',
			id: '',
			okBtn: 'Ok',
			delBtn: 'Delete',
			cancelBtn: 'Cancel'
		};
	},
	show: function(param){
		param.data = param.data || {};
		const name = param.data.name || '';
		const number = param.data.number || '';
		this.setState({ id: param.id, visible: true, name, number });
	},
	update: function(){
		if (this.nameBox.value !== '' || this.numberBox.value !== ''){
			this.par.setData({
				key: this.state.id,
				value: {
					name: this.nameBox.value,
					number: this.numberBox.value
				}
			});
		}
	},
	del: function(){
		this.par.clrData(this.state.id);
		this.setState({name: '', number: ''});
	},
	render: function(){
		return React.createElement('div', {
			className: this.state.visible ? '' : 'hidden'
		}, 
		React.createElement('input', {
			ref: (input) => {this.nameBox = input;},
			value: this.state.name,
			onChange: (e) => {this.setState({name: e.value});},
			className: 'popupTxt popupElem',
			placeHolder: 'Name'
		}), 
		React.createElement('input', {
			value: this.state.number,
			ref: (input) => {this.numberBox = input;},
			placeHolder: 'Number',
			onChange: (e) => {this.setState({number: e.value});},
			className: 'popupTxt popupElem'
		}), 
		React.createElement('input', {
			value: this.state.okBtn,
			onClick: () => {this.update();},
			type: 'button',
			className: 'popupButton popupElem'
		}), 
		React.createElement('input', {
			value: this.state.cancelBtn,
			type: 'button',
			onClick: () => {this.setState({visible: false});},
			className: 'popupButton popupElem'
		}), 
		React.createElement('input', {
			value: this.state.delBtn,
			type: 'button',
			onClick: () => {this.del();},
			className: 'popupButton popupDel popupElem',
			disabled: (this.state.name === '' || this.state.number === '')
		}));
	}
});
module.exports = popup;