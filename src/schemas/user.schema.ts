import * as yup from 'yup'
export const userSchema = yup.object({
    full_name: yup.string().required('Họ tên không được bỏ trống').min(4, 'Họ tên tối thiểu 4 ký tự').trim(),
    email: yup.string().required('Email không được bỏ trống').email('Email không đúng định dạng').trim(),
    phone_number: yup
        .string()
        .required('Số điện thoại không được bỏ trống')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng'),
    current_password: yup.string().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu tối thiếu 6 ký tự').trim(),
    new_password: yup.string().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu tối thiếu 6 ký tự').trim(),
    confirm_new_password: yup
        .string()
        .required('Xác nhận mật khẩu không được bỏ trống')
        .oneOf([yup.ref('new_password')], 'Mật khẩu không khớp')
})

export type UserSchemaType = yup.InferType<typeof userSchema>
