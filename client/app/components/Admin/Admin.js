import React, { Component } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import axios from 'axios';

import './Admin.scss';
import * as _ from 'lodash';

class Admin extends Component {

  constructor(props) {
    super(props)

    this.sortable = this.sortable.bind(this)
    this.state = {
      slidesList: null
    }

  
  }

  async componentDidMount() {

    const slidesList = _.map((await axios.get('http://localhost:8080/api/photos')).data, 'url');
    this.setState({
      slidesList,
    });

  }

  sortable() {  
    const SortableItem = SortableElement(({value}) =>
      <img src={value}></img>
    );
    const SortableList = SortableContainer(({items}) => {
      return (
        <ul>
          {items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} />
          ))}
        </ul>
      );
    });
    return(
      <SortableList axis="xy" items={this.state.slidesList}  />
    );
  }

  // onSortEnd = ({oldIndex, newIndex}) => {
  //   this.setState({
  //     items: arrayMove(this.state.items, oldIndex, newIndex),
  //   });
  // };

  render() {
    return (    
      <div>
        <h2>Admin Panel</h2>
         {this.state.slidesList && this.sortable() }
      </div>
    );
  }
}

export default Admin;
