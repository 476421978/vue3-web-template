export const roleColumns = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   sorter: true,
  //   slots: {
  //     customRender: 'id'
  //   }
  // },
  {
    title: '唯一编码',
    dataIndex: 'code',
    sorter: true,
    slots: {
      customRender: 'code'
    }
  },
  {
    title: '名称',
    dataIndex: 'name',
    slots: {
      customRender: 'name'
    }
  },
  {
    title: '描述',
    dataIndex: 'describe',
    slots: {
      customRender: 'describe'
    }
  },
  {
    title: '状态',
    dataIndex: 'open_flag',
    slots: {
      customRender: 'open_flag'
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
