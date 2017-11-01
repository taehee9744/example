import React from 'react';
//import styles from './ExampleView.css';

class ExampleView extends React.Component {

    render() {
        return(
                <tr><td>{this.props.type}</td><td>{this.props.name}</td><td onClick={this.props.onClick}>{this.props.value}</td></tr>
        );
    }
}

export default ExampleView;
