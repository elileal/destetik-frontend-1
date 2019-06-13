import React from 'react';
import SideMenu from 'react-sidemenu';
import { Redirect } from 'react-router-dom';
import { Media } from 'reactstrap';
import Slide from 'react-reveal/Slide';

class SidebarMenu extends React.Component {
  state = {
    activeItem: 'dados-pessoais',
    redirect: false,
    itemsMenu: [
      {
        label: 'Dados Pessoais',
        value: 'dados-pessoais',
        icon: 'fa-user'
      },
      {
        label: 'Localização',
        value: 'localizacao',
        icon: 'fa-map-marker-alt'
      },
      {
        label: 'Editar Foto',
        value: 'editar-foto',
        icon: 'fa-camera'
      },
      {
        label: 'Adicionar Serviços',
        value: 'add-servicos',
        icon: 'fa-briefcase'
      },
      {
        label: 'Formas de Pagamento',
        value: 'formas-de-pagamento',
        icon: 'fa-comments-dollar'
      },
      {
        label: 'Excluir Conta',
        value: 'excluir-conta',
        icon: 'fa-trash-alt'
      }
    ]
  };

  componentDidMount() {}

  onClickItem = value => {
    this.setState({ activeItem: value, redirect: true });
  };

  handleRedirect = () => {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect to={`/edit/${this.state.activeItem}`} />;
    }
  };

  render() {
    return (
      <Slide left>
        <div className="side-menu-container">
          {this.handleRedirect()}
          <Media
            className="profile-edit-image"
            object
            src={this.props.profileImg}
          />
          <SideMenu
            theme="destetik"
            activeItem={this.state.activeItem}
            items={this.state.itemsMenu}
            onMenuItemClick={this.onClickItem}
          />
        </div>
      </Slide>
    );
  }
}

export default SidebarMenu;
