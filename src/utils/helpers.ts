import { ProductSale } from '~/@types/productSales.type'
import { OrderStatus } from '~/enums/OrderStatus'
import { PaymentMethod } from '~/enums/PaymentMethod'
export const getMinMaxSalePrice = (product: ProductSale) => {
    let minSalePrice = Infinity
    let maxSalePrice = -Infinity

    product?.variants.forEach((variant) => {
        const salePrice = variant.current_price_plan.sale_price
        if (salePrice < minSalePrice) {
            minSalePrice = salePrice
        }
        if (salePrice > maxSalePrice) {
            maxSalePrice = salePrice
        }
    })

    return {
        minSalePrice,
        maxSalePrice
    }
}

// Function to get the minimum and maximum promotion prices
export const getMinMaxPromotionPrice = (product: ProductSale) => {
    let minPromotionPrice = Infinity
    let maxPromotionPrice = -Infinity

    product?.variants.forEach((variant) => {
        const promotionPrice = variant.current_price_plan.promotion_price
        if (promotionPrice !== null) {
            // Ensuring that the promotion price is not null
            if (promotionPrice < minPromotionPrice) {
                minPromotionPrice = promotionPrice
            }
            if (promotionPrice > maxPromotionPrice) {
                maxPromotionPrice = promotionPrice
            }
        }
    })

    // If no promotion prices were found, set them to null
    if (minPromotionPrice === Infinity) minPromotionPrice = 0
    if (maxPromotionPrice === -Infinity) maxPromotionPrice = 0

    return {
        minPromotionPrice,
        maxPromotionPrice
    }
}

export const checkEqualSalePrice = (product: ProductSale) => {
    const { minSalePrice, maxSalePrice } = getMinMaxSalePrice(product)
    return minSalePrice === maxSalePrice
}

export const checkEqualPromotionPrice = (product: ProductSale) => {
    const { minPromotionPrice, maxPromotionPrice } = getMinMaxPromotionPrice(product)
    return minPromotionPrice === maxPromotionPrice
}

export const getUniqueSizeAndColor = (product: ProductSale) => {
    const colors = new Set()
    const sizes = new Set()

    product?.variants?.forEach((variant) => {
        colors.add(variant.color)
        sizes.add(variant.size)
    })
    return {
        colors: Array.from(colors),
        sizes: Array.from(sizes)
    }
}

export const formatToVND = (price: number) => {
    if (price === undefined) return '0 VND'
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

const removeSpecialCharacter = (str: string) =>
    // eslint-disable-next-line no-useless-escape
    str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
    return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
    const arr = nameId?.split('-i-')
    return arr[arr.length - 1]
}

export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

export const formatDateFull = (dateString: string) => {
    const date = new Date(dateString)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${hours}:${minutes} ${day}/${month}/${year}`
}

export const convertOrderStatus = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.PENDING:
            return 'Chờ xác nhận'
        case OrderStatus.CONFIRMED:
            return 'Đã xác nhận'
        case OrderStatus.DELIVERING:
            return 'Đang giao hàng'
        case OrderStatus.DELIVERED:
            return 'Hoàn thành'
        case OrderStatus.CANCELLED:
            return 'Đã hủy'
        case OrderStatus.PAID:
            return 'Đã thanh toán'
        case OrderStatus.UNPAID:
            return 'Chưa thanh toán'
        default:
            return 'Không xác định'
    }
}

export const convertPaymentMethod = (method: string) => {
    switch (method) {
        case PaymentMethod.CASH_ON_DELIVERY:
            return 'Thanh toán khi nhận hàng'
        case PaymentMethod.MOMO:
            return 'Thanh toán qua MoMo'
        case PaymentMethod.VNPAY:
            return 'Thanh toán qua VNPay'
        default:
            return 'Không xác định'
    }
}

export const convertTimestampToDate = (epoch: number) => {
    const date = new Date(epoch * 1000) // Convert to milliseconds
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // January is 0!
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

export const RETURN_ORDER_STATUS = {
    REQUESTED: 'REQUESTED',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED'
}

export const convertReturnOrderStatus = (status: string) => {
    switch (status) {
        case RETURN_ORDER_STATUS.REQUESTED:
            return 'Chờ xác nhận'
        case RETURN_ORDER_STATUS.ACCEPTED:
            return 'Đã xác nhận'
        case RETURN_ORDER_STATUS.REJECTED:
            return 'Đã từ chối'
        default:
            return ''
    }
}
