export default {
    items: [
      {
        name: '主页',
        url: '/dashboard',
        icon: 'icon-speedometer',
        badge: {
          variant: 'primary',
          text: 'NEW'
        }
      },
      {
        title: true,
        name: '标题一',
        class: '',
        wrapper: {
          element: '',
          attributes: {}
        }
      },
      {
        name: '示例菜单',
        url: '/theme/colors',
        icon: 'icon-drop'
      },
      {
        name: '示例菜单',
        url: '/theme/typography',
        icon: 'icon-pencil'
      },
      {
        title: true,
        name: '标题一',
        class: '',
        wrapper: {
          element: '',
          attributes: {}
        }
      },
      {
        name: '菜单',
        url: '/base',
        icon: 'icon-puzzle',
        children: [
          {
            name: '子菜单',
            url: '/base/breadcrumbs',
            icon: 'icon-puzzle'
          },
          {
            name: '子菜单',
            url: '/base/cards',
            icon: 'icon-puzzle'
          }
        ]
      }
    ]
  }
  