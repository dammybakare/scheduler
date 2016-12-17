const box = React.createClass({
	getInitialState: function(){
		this.props = this.props || {};
		return {
			value: this.props.value || '',
			data: this.props.data,
			marked: !(!this.props.data)
		};
	},
	showPopup: function(){
		this.par.popup.show({ id: this.state.value, data: this.props.data });
	},
	clrBox: function(){
		this.par.clrData(this.state.value);
	},
	render: function(){
		const value = parseInt(this.state.value);
		const text = `${value > 12 ? value - 12 : value}${value > 12 ? 'pm':'am'}`;
		return React.createElement('div', {
			className: `timeBox ${!this.props.data ? '' : 'marked'}`,
			onClick: () => {
				this.showPopup();
			},
		},
		text);
	}
});
module.exports = box;