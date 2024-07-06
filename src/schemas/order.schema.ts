import * as yup from 'yup'
export const ordersSchema = yup.object({
    canceled_reason: yup.string().required('Lý do không được bỏ trống').trim()
})

export type OrderSchemaType = yup.InferType<typeof ordersSchema>
