export function isOverThreeDays(date: string) {
    const today = new Date()
    const inputDate = new Date(date)

    // Tính khoảng cách giữa ngày hiện tại và ngày nhập vào
    const diffTime = today.getTime() - inputDate.getTime()

    // Chuyển đổi khoảng cách thời gian từ miligiây thành ngày
    const diffDays = diffTime / (1000 * 3600 * 24)

    // Kiểm tra xem có vượt quá 3 ngày không
    return diffDays > 3
}
