import { ProfileResponse } from '~/@types/users.type'
import { API_URL } from '~/configs/api.config'
import { UserSchemaType } from '~/schemas/user.schema'
import http from '~/utils/http'

export type UpdateProfileRequest = Pick<UserSchemaType, 'full_name' | 'phone_number'> & {
    date_of_birth: string
}
const usersService = {
    getProfile: () => http.get<ProfileResponse>(API_URL.PROFILE),
    updateProfile: (body: UpdateProfileRequest) => http.patch<ProfileResponse>(API_URL.PROFILE, body),
    uploadProfileAvatar: (body: FormData) => {
        return http.patch<ProfileResponse>(API_URL.PROFILE_UPLOAD, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    changePassword: (body: { current_password: string; new_password: string }) => http.patch(API_URL.CHANGE_PASSWORD, body)
}

export default usersService
