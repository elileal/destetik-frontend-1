import React from 'react';
import SideMenu from 'react-sidemenu';
import { Redirect } from 'react-router-dom';

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
        label: 'Adicionar Serviços',
        value: 'add-servicos',
        icon: 'fa-briefcase'
      },
      {
        label: 'Histórico',
        value: 'historico',
        icon: 'fa-list-alt'
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

  onClickItem = value => {
    this.setState({ activeItem: value, redirect: true });

    //return <Redirect to={`/edit/${value}`} />;
    //window.location.href = `/edit/${value}`;
  };

  handleRedirect = () => {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return <Redirect to={`/edit/${this.state.activeItem}`} />;
    }
  };

  render() {
    return (
      <>
        {this.handleRedirect()}
        <SideMenu
          theme='destetik'
          activeItem={this.state.activeItem}
          items={this.state.itemsMenu}
          onMenuItemClick={this.onClickItem}
        />
      </>
    );
  }
}

export default SidebarMenu;
