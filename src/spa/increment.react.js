import React from 'react';
import $ from 'jquery';
import urlJoin from 'url-join';

class Increment extends React.Component {
	constructor(props) {
		super();
		this.state = {
			incValue: -1,
			hasError: false
		};
	}

	render() {
		if (this.state.hasError) {
			return <p>Error. API server may be down.</p>;
		}
		if (this.state.incValue < 0) {
			return <p>Fetching...</p>;
		}
		else {
			return <p>Incremented value is {this.state.incValue}.</p>;
		}
	}

	componentDidMount() {
		$.ajax({
			url: urlJoin(global.__apiUrl__, 'json-test'),
			method: 'GET',
			success: (res) => {
				this.setState({
					incValue: res.incResult
				});
			},
			error: () => {
				console.log(...arguments);
				this.setState({
					hasError: true
				});
			}
		});
	}
}

export default Increment;