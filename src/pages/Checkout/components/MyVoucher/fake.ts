export type Voucher = {
    id: number
    code: string
    description: string
    value: number
    voucher_type: string
    discount_type: string
    start_date: string
    end_date: string
    min_order_value: number
}

export const fakeDataVoucher: Voucher[] = [
    {
        id: 1,
        code: 'ABC1',
        description: 'Giảm tối đa 30k',
        value: 30000,
        voucher_type: 'SHIPPING',
        discount_type: 'MONEY',
        start_date: '2022-02-12',
        end_date: '2022-02-12',
        min_order_value: 0
    },
    {
        id: 2,
        code: 'ABC2',
        description: 'Miễn phí ship',
        value: 100,
        voucher_type: 'SHIPPING',
        discount_type: 'PERCENTAGE',
        start_date: '2022-02-12',
        end_date: '2022-02-12',
        min_order_value: 500000
    },
    {
        id: 3,
        code: 'ABC3',
        description: 'Giảm tối đa 20k trên đơn hàng',
        value: 20000,
        voucher_type: 'ORDER',
        discount_type: 'MONEY',
        start_date: '2022-02-12',
        end_date: '2022-02-12',
        min_order_value: 200000
    },
    {
        id: 4,
        code: 'ABC123',
        description: 'Giảm tối đa 10% đơn hàng từ 100K',
        value: 10,
        voucher_type: 'ORDER',
        discount_type: 'PERCENTAGE',
        start_date: '2022-02-12',
        end_date: '2022-02-12',
        min_order_value: 600000
    }
]
