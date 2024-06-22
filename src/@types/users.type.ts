export type User = {
    id: number
    full_name: string
    avatar: string
    email: string
    date_of_birth: string
    phone_number: string
    roles: [
        {
            name: string
            summary: string
        }
    ]
    status: string
    created_at: string
    updated_at: string
}
