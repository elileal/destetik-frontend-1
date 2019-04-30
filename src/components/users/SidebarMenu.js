import React from 'react';
import SideMenu from 'react-sidemenu';

function SidebarMenu() {
  const itemsMenu = [
    {
      label: 'Dados Pessoais',
      value: '',
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
  ];

  const onClickItem = value => {
    window.location.href = `/edit/${value}`;
  };

  return <SideMenu items={itemsMenu} onMenuItemClick={onClickItem} />;
}

export default SidebarMenu;
