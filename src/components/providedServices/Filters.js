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
          <DropdownItem onClick={this.props.resetFilter}>Todos</DropdownItem>
          <DropdownItem id='manicure' onClick={this.props.handleFilterOnChange}>
            Manicure
          </DropdownItem>
          <DropdownItem id='pedicure' onClick={this.props.handleFilterOnChange}>
            Pedicure
          </DropdownItem>
          <DropdownItem
            id='hidratacao'
            onClick={this.props.handleFilterOnChange}
          >
            Hidratação
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default Filters;
