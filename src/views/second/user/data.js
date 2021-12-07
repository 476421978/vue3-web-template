export const userColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    slots: {
      customRender: 'id'
    }
  },
  {
    title: '账号',
    dataIndex: 'account',
    slots: {
      customRender: 'account'
    }
  },
  {
    title: '权限名称',
    dataIndex: 'vue_role.name',
    slots: {
      customRender: 'vue_role_name'
    }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    slots: {
      customRender: 'sex'
    }
  },
  {
    title: '最后登录时间',
    dataIndex: 'last_time',
    slots: {
      customRender: 'last_time'
    }
  },
  {
    title: '操作',
    dataIndex: 'btn',
    slots: {
      customRender: 'btn'
    }
  }
]
