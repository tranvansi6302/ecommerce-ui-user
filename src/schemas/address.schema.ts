import * as yup from 'yup'

export const addressSchema = yup.object({
    province: yup.object().required('Tỉnh thành là bắt buộc'),
    district: yup.object().required('Huyện là bắt buộc'),
    ward: yup.object().required('Xã là bắt buộc')
})

export type AddressSchemaType = yup.InferType<typeof addressSchema>
