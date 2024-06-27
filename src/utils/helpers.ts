import { ProductSale } from '~/@types/productSales.type'

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
    return '₫' + price.toLocaleString('vi-VN')
}
