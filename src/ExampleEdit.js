import React from 'react';

class ExampleEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({
      value: e.target.value
    })
  }
    render() {
        return(
            <div>
              <input type="text" value={this.props.value} onChange={this.handleChange}></input>
              <button>Edit</button>
            </div>
        );
    }
}
export default ExampleEdit;
