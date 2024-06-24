import * as yup from 'yup'
export const authSchema = yup.object({
    full_name: yup.string().required('Họ tên không được bỏ trống').min(4, 'Họ tên tối thiểu 4 ký tự').trim(),
    email: yup.string().required('Email không được bỏ trống').email('Email không đúng định dạng').trim(),
    password: yup.string().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu tối thiếu 6 ký tự').trim(),
    confirm_password: yup
        .string()
        .required('Xác nhận mật khẩu không được bỏ trống')
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
})

export type AuthSchemaType = yup.InferType<typeof authSchema>
