import React from 'react';
import styles from './App.css';
import classNames from 'classnames/bind';
import SelectView from './SelectView';
import ExampleView from './ExampleView';
import ExampleEdit from './ExampleEdit'

const cx = classNames.bind(styles);
console.log(styles);

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      keyword: "",
      selectType: "",
      exampleData: [
        {type: 'digital', name: 'd_test1', value: '1'},
        {type: 'analog', name: 'a_test4', value: '0.1'},
        {type: 'digital', name: 'd_test2', value: '2'},
        {type: 'string', name: 's_test3', value: 'a'},
        {type: 'analog', name: 'a_test2', value: '0.2'},
        {type: 'string', name: 's_test1', value: 'b'},
        {type: 'analog', name: 'a_test3', value: '0.3'},
        {type: 'digital', name: 'd_test3', value: '3'}
      ],
      selectData: [
        {type: '', name: 'All'},
        {type: 'digital', name: 'Digital'},
        {type: 'analog', name: 'Analog'},
        {type: 'string', name: 'String'}
      ],
      isEdit: false,
      selectedKey: -1,
      editValue: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.selectClick = this.selectClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.sortExampleData = this.sortExampleData.bind(this);
    this.clickValue = this.clickValue.bind(this);
  }

  handleChange(e){
    this.setState({
      keyword: e.target.value
    });
  }

//selectbox 선택시 해당 option의 value값 선택
  selectClick(e){
    //var target = document.getElementById("selectbox");
    var targetValue = e.target.options[e.target.selectedIndex].value;
    this.setState({
      selectType: targetValue
    });
  }

  searchClick(data){
    console.log("keyword: " + this.state.keyword + " selectType: " + this.state.selectType);
    data = data.filter((example) => {
      return (example.name.toLowerCase().indexOf(this.state.keyword) > -1)
            &&(example.type.toLowerCase().indexOf(this.state.selectType) > -1);
        });
    console.log("searchClick: ", data);
  }

  sortExampleData = (data) => {
    data.sort((a, b) => {
      return (a.type < b.type ? -1 : (a.type > b.type ? 1 : 0))
      ||(a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
    });
  }

  clickValue(key){
    console.log("value: ", this.state.exampleData[key].value, " isEdit: ", this.state.isEdit, " key: ", key);
    this.setState({
      isEdit: true,
      selectedKey: key,
      editValue: this.state.exampleData[key].value
    })
  }

  render(){
    var exampleDataToMap = (data) => {
      data = data.filter((example) => {
        return  (example.name.toLowerCase().indexOf(this.state.keyword) > -1)
           &&(example.type.toLowerCase().indexOf(this.state.selectType)>-1);
      });
      return data.map((example, i) => {
        return (<ExampleView type={example.type}
                              name={example.name}
                              value={example.value}
                              key={i}
                              onClick={() => this.clickValue(i)}/>
                          );
      });
    }
    return   (
      <div >
        <div className={cx('searchPanelDiv')}>
          <select className={cx('searchSelect')} id="selectbox" onClick={this.selectClick}>
            {this.state.selectData.map((select, i) => {
              return (<SelectView type={select.type}
                                  name={select.name}
                                  key={i}/>);
                      })}
          </select>
          <input className={cx('searchInput')} type="text" name="Search" placeholder="Search" value={this.state.keyword} onChange={this.handleChange}/>
        </div>
        <div className={cx('viewDiv')}>
          {this.sortExampleData(this.state.exampleData)}
          <table className={cx('viewTable')}>{exampleDataToMap(this.state.exampleData)}</table>
        </div>
        <div>
          <ExampleEdit selectedKey={this.state.selectedKey}
                        value={this.state.editValue}/>
        </div>
      </div>
    );
  }
}

export default App;
