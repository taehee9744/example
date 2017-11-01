import React from 'react';

class SelectView extends React.Component {

    render() {
        return (
          <option value={this.props.type}>{this.props.name}</option>
        );
    }
}

export default SelectView;
