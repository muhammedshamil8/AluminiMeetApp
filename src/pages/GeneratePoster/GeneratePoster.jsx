import React, { useState } from "react";
import BackButton from '@/components/BackButton';
import Poster from '@/assets/poster.png'
import { Input } from "@/components/ui/input";
import {
    DialogHeader,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ImageCropper from "@/components/ImageCropper/imageCropper";


function GeneratePoster() {
    const [name, setName] = useState("");
    const handleCloseDialog = () => {
        formik.resetForm();
        closeModal();
        setImage(null);
        setCroppedImage(null);
        setShowImgError(false);
    };
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
            if (fileSizeInMB > 1) {
                toast.warning(
                    "The selected file is larger than 1MB. Please choose a smaller file."
                );
                event.target.value = "";
                return; // Stop further processing
            }

            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setIsCropDialogOpen(true); // Open crop dialog after selecting an image
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="relative h-full flex-1 flex items-center justify-center flex-col w-full">
            <div className='absolute left-6  top-16 '>
                <BackButton label="Generate Poster" />
            </div>
            <div className=' relative w-full flex items-center justify-start flex-col gap-4 p-6 max-w-[500px] mt-10'>
                <img src={Poster} className='mx-auto' />
                {croppedImage && (
                    <div className="flex flex-col items-center gap-2 absolute top-[165px] left-[83px]">
                        <img
                            src={croppedImage}
                            alt="Cropped"
                            className="w-[148px] h-42 rounded-lg -rotate-4"
                        />
                        <p className="-rotate-4 handwriting">{name}</p>
                    </div>
                )}
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" className="!pl-6 !rounded-full !bg-[#DEEEF7] placeholder:text-gray-400 max-w-[380px] !outline-none !ring-0 !border-[#185273]" placeholder="Your Name" />
                <Input
                    disabled={!name}
                    className="hidden"
                    label="Image"
                    id="fileInput"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                />
                <button disabled={!name} onClick={() => {
                    document.getElementById("fileInput").click();
                }} className='uppercase text-white bg-[#0078B6] disabled:bg-[#0078B6]/60 text-center w-full max-w-[380px] py-2 rounded-full font-semibold cursor-pointer'>
                    UPLOAD PHOTO
                </button>
            </div>


            <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
                <ImageCropper
                    image={image}
                    onSave={(croppedImage) => {
                        setCroppedImage(croppedImage);
                        // setShowImgError(false);
                    }}
                    onClose={() => setIsCropDialogOpen(false)}
                />
            </Dialog>

        </div>
    )
}

export default GeneratePoster
