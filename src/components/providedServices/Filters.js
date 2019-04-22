import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class Filters extends React.Component {
  state = {
    dropdownOpen: false
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>Filtros</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Manicure</DropdownItem>
          <DropdownItem>Pedicure</DropdownItem>
          <DropdownItem>Hidratação</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default Filters;
