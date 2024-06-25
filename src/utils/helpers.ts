import { ProductSale } from '~/@types/productSales.type'

export const getPrices = (productSales: ProductSale[]) => {
    let minSalePrice = Number.MAX_VALUE
    let minPromotionPrice = Number.MAX_VALUE
    let maxSalePrice = 0
    let maxPromotionPrice = 0

    productSales?.forEach((product) => {
        product.variants.forEach((variant) => {
            const pricePlan = variant.current_price_plan
            if (pricePlan) {
                const { sale_price, promotion_price } = pricePlan

                // Update min prices
                if (sale_price < minSalePrice) {
                    minSalePrice = sale_price
                }
                if (promotion_price !== null && promotion_price < minPromotionPrice) {
                    minPromotionPrice = promotion_price
                }

                // Update max prices
                if (sale_price > maxSalePrice) {
                    maxSalePrice = sale_price
                }
                if (promotion_price !== null && promotion_price > maxPromotionPrice) {
                    maxPromotionPrice = promotion_price
                }
            }
        })
    })

    // Adjust promotion prices if they are unset
    minPromotionPrice = minPromotionPrice === Number.MAX_VALUE ? 0 : (minPromotionPrice as number)
    maxPromotionPrice = maxPromotionPrice === 0 && minPromotionPrice !== null ? minPromotionPrice : maxPromotionPrice

    return {
        minSalePrice: minSalePrice === Number.MAX_VALUE ? null : minSalePrice,
        minPromotionPrice,
        maxSalePrice: maxSalePrice === 0 ? null : maxSalePrice,
        maxPromotionPrice: maxPromotionPrice === 0 ? null : maxPromotionPrice
    }
}

export const formatToVND = (price: number) => {
    return '₫' + price.toLocaleString('vi-VN')
}
