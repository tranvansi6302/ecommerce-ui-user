import { useState, ChangeEvent, useEffect } from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
type MultiImageUploadProps = {
    onImagesChange: (files: File[] | null) => void | null
}

export default function MultiImageUpload({ onImagesChange }: MultiImageUploadProps) {
    const [files, setFiles] = useState<File[]>([])

    useEffect(() => {
        onImagesChange(files.length > 0 ? files : null)
    }, [files, onImagesChange])

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files)
            const validFiles = selectedFiles.filter((file) => {
                const fileType = file.type.toLowerCase()
                const validType = fileType === 'image/jpeg' || fileType === 'image/png'
                const validSize = file.size <= 10 * 1024 * 1024 // 10MB

                if (!validType) {
                    toast.error(`${file.name} không đúng định dạng.`)
                }

                if (!validSize) {
                    toast.error(`${file.name} dung lượng vượt quá 10MB.`)
                }

                return validType && validSize
            })

            if (validFiles.length + files.length > 5) {
                toast.error('Chỉ có thể tải lên tối đa 5 ảnh.')
                return
            }

            setFiles((prevFiles) => [...prevFiles, ...validFiles])
        }
    }

    const handleRemoveImage = (fileToRemove: File) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileToRemove.name))
    }

    return (
        <div className='container mx-auto'>
            <div className='flex flex-col'>
                <div>
                    <div className='mb-6 flex items-center gap-4'>
                        <label
                            className='w-[180px] h-[34px] border border-blue-600 rounded-[4px] flex items-center justify-center text-blue-600 capitalize cursor-pointer text-[14px] gap-2'
                            htmlFor='files'
                        >
                            Tải lên hình ảnh
                            <IoCloudUploadOutline fontSize='20px' />
                        </label>
                        <p className=' text-gray-400 text-[14px] mt-2'>
                            Dung lượng file tối đa 10 MB. Định dạng:.JPG, .JPEG, .PNG{' '}
                        </p>
                    </div>
                    <input
                        type='file'
                        multiple
                        onChange={handleImageChange}
                        className='mb-4 p-2 border border-gray-300 rounded hidden'
                        id='files'
                        name='files'
                        accept='.jpg,.jpeg,.png'
                    />
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {files.map((file, index) => (
                        <div key={index} className='relative p-1'>
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`preview ${index}`}
                                className='w-full h-full object-cover border border-gray-200 '
                            />
                            <button
                                type='button'
                                onClick={() => handleRemoveImage(file)}
                                className='absolute top-1 right-1 text-[25px] text-red-600 rounded-full p-1 hover:text-red-500'
                            >
                                <LiaTimesSolid />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
