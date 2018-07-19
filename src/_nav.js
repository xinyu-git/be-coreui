export default {
    items: [
      {
        name: '后台主页',
        url: '/dashboard',
        icon: 'fa fa-tachometer',
        badge: {
          variant: 'primary',
          text: 'NEW'
        }
      },
      {
        name: '商品管理',
        url: '/dashboard',
        icon: 'fa fa-product-hunt',
        children: [
          {
            name: '商品列表',
            url: '/goods/goodsList',
            icon: 'fa fa-circle'
          }
          // ,
          // {
          //   name: '商品分类',
          //   url: '/base/cards',
          //   icon: 'fa fa-circle'
          // },
          // {
          //   name: '品牌管理',
          //   url: '/base/cards',
          //   icon: 'fa fa-circle'
          // }
        ]
      },
      {
        name: '订单中心',
        url: '/base',
        icon: 'fa fa-large fa-truck',
        children: [
          {
            name: '订单列表',
            url: '/order/orderList',
            icon: 'fa fa-circle'
          }
        ]
      }
    ]
  }
  