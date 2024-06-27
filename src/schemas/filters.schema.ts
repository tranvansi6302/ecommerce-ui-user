import * as yup from 'yup'

export const minMaxPriceSchema = yup.object({
    min_price: yup.number().typeError('Giá không phù hợp').required('Giá không phù hợp').positive('Giá không phù hợp'),
    max_price: yup
        .number()
        .typeError('Giá không phù hợp')
        .required('Giá không phù hợp')
        .positive('Giá không phù hợp')
        .test('is-greater', 'Giá không phù hợp', function (value) {
            const { min_price } = this.parent
            return value > min_price
        })
})

export type FilterMinMaxType = yup.InferType<typeof minMaxPriceSchema>
