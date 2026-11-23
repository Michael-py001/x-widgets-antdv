const mockData = [
    {
        title: '地区',
        dataIndex: 'region',
        width: 80,
        fixed: 'left',
        ellipsis: true,
        customCell: (record, rowIndex, column) => {
            return {
                title: record[column.dataIndex],
            }
        },
    },
    {
        title: '集体经济组织总数',
        children: [
            {
                title: '总计',
                dataIndex: 'organizationCount',
                width: 70,
            },
            {
                title: '联合总社',
                dataIndex: 'organizationAssociateCount',
                width: 75,
            },
            {
                title: '经联社',
                dataIndex: 'organizationFinancialAssociateCount',
                width: 70,
            },
            {
                title: '经济社',
                dataIndex: 'organizationFinancialCount',
                width: 70,
            },
        ],
    },
    {
        title: '建账套组织数',
        children: [
            {
                title: '已建账',
                dataIndex: 'bookCount',
                width: 75,
            },
            {
                title: '完成率',
                dataIndex: 'finishRate',
                width: 75,
            },
            {
                title: '联合总社',
                dataIndex: 'bookAssociateCount',
                width: 75,
            },
            {
                title: '经联社',
                dataIndex: 'bookFinancialAssociateCount',
                width: 70,
            },
            {
                title: '经济社',
                dataIndex: 'bookFinancialCount',
                width: 70,
            },
        ],
    },
]



export const trainColums = (columns) => {

}