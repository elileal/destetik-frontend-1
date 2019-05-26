import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import Api from '../../services/Api/index';

class Filters extends React.Component {
  state = {
    dropdownOpen: false,
    services: []
  };

  async componentDidMount() {
    const services = await Api.Services.getAll();
    this.setState({ services });
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    const { services } = this.state;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>Filtros</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.props.resetFilter}>Todos</DropdownItem>
          {services.map((service, index) => (
            <DropdownItem
              id={service._id}
              key={index}
              onClick={this.props.handleFilterOnChange}
            >
              {service.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default Filters;
