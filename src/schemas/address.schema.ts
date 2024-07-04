import * as yup from 'yup'

export const addressSchema = yup.object({
    full_name: yup.string().required('Họ tên không được bỏ trống').min(4, 'Họ tên tối thiểu 4 ký tự').trim(),
    phone_number: yup
        .string()
        .required('Số điện thoại không được bỏ trống')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng'),

    description: yup.string().required('Địa chỉ cụ thể không được bỏ trống').trim(),
    province: yup.object().required('Tỉnh thành là bắt buộc'),
    district: yup.object().required('Huyện là bắt buộc'),
    ward: yup.object().required('Xã là bắt buộc')
})

export type AddressSchemaType = yup.InferType<typeof addressSchema>
