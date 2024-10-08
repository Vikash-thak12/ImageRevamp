"use client"
import React from 'react'
import { useToast } from '../ui/use-toast'
import { CldImage, CldUploadWidget } from "next-cloudinary"
import Image from 'next/image'
import { dataUrl, getImageSize } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'

type MediaUploaderProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    publicId: string;
    image: any;
    type: string;
}

const MediaUploader = ({ publicId, onValueChange, setImage, image, type }: MediaUploaderProps) => {

    const { toast } = useToast()

    const onUploadSuccessHandler = (result: any) => {

        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url,
        }))

        onValueChange(result?.info?.public_id)


        toast({
            title: "Image Uploaded Successfully",
            description: "1 Credit  was decuted from your account",
            duration: 5000,
            className: 'success-toast'
        })
    }

    const onUploadErrorHandler = () => {
        toast({
            title: "something went wrong while uploading the image",
            description: "Please try again",
            duration: 5000,
            className: 'error-toast'
        })
    }


    return (
        // gives multiple options from where we can upload the image
        <CldUploadWidget
            uploadPreset='my_imagerevamp'
            options={{
                multiple: false,
                resourceType: "image"
            }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}
        >
            {({ open }) => (
                <div className='flex flex-col gap-4'>
                    <h3 className='h3-bold text-dark-600'>Original</h3>

                    {publicId ? (
                        <>
                            <div className='cursor-pointer overflow-hidden rounded-[10px]'>

                                {/* CldImage used to display images from Cloudinary with various transformations (e.g., resizing, cropping, applying effects) */}
                                <CldImage
                                    width={getImageSize(type, image, "width")}
                                    height={getImageSize(type, image, "width")}
                                    src={publicId}
                                    alt='image'
                                    sizes={"(max-width: 767px) 100vw, 50vw"}
                                    placeholder={dataUrl as PlaceholderValue}
                                    className='media-uploader_CldImage'
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='media-uploader_cta' onClick={() => open()}>
                                <div className='media-uploader_cta-image'>
                                    <Image
                                        src="/assets/icons/add.svg"
                                        alt='Add Image'
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <p className='p-14-medium'>Click here to upload the Image</p>
                            </div>
                        </>
                    )}
                </div>
            )}
        </CldUploadWidget>
    )
}

export default MediaUploader