import React, { useRef, useState } from "react";
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
import { toPng } from 'html-to-image';
import { toast } from "sonner";

function GeneratePoster() {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
    const posterRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB > 1) {
                toast.warning(
                    "The selected file is larger than 1MB. Please choose a smaller file."
                );
                event.target.value = "";
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setIsCropDialogOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = () => {
        if (posterRef.current) {
            toPng(posterRef.current, { 
                quality: 6,
                pixelRatio: 4 
            }).then(dataUrl => {
                const link = document.createElement('a');
                link.download = `${name}_poster.png`;
                link.href = dataUrl;
                link.click();
            }).catch(error => {
                console.error('Download failed', error);
                toast.error('Failed to download poster');
            });
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
            <div className='absolute left-4 top-4 md:left-6 md:top-16 z-10'>
                <BackButton label="Generate Poster" />
            </div>
            
            <div className='relative w-full max-w-md mx-auto flex flex-col items-center gap-4'>
                <div ref={posterRef} className="relative w-full max-w-xs mx-auto">
                    <img 
                        src={Poster} 
                        alt="Poster Template" 
                        className="w-full h-auto object-contain"
                    />
                    
                    {croppedImage && (
                        <div className="absolute top-[54.1%] left-[29.5%] transform -translate-x-1/2 -translate-y-1/2 w-[32.5%] text-center">
                            <img
                                src={croppedImage}
                                alt="Cropped"
                                className="w-full h-[120px]  object-cover rounded-lg -rotate-4"
                            />
                            <p className="-rotate-6 handwriting text-sm md:text-base ">{name}</p>
                        </div>
                    )}
                </div>

                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" 
                    className="!pl-6 !rounded-full !bg-[#DEEEF7] placeholder:text-gray-400 w-full max-w-xs !outline-none !ring-0 !border-[#185273]" 
                    placeholder="Your Name" 
                />
                
                <Input
                    disabled={!name}
                    className="hidden"
                    label="Image"
                    id="fileInput"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                />

                {name && croppedImage && (
            
                <button 
                    onClick={handleDownload} 
                    className='uppercase text-white bg-[#0078B6] disabled:bg-[#0078B6]/60 text-center w-full max-w-xs py-2 rounded-full font-semibold cursor-pointer'
                >
                    Download 
                </button>
                )}
                
                <button 
                    disabled={!name} 
                    onClick={() => document.getElementById("fileInput").click()} 
                    className='uppercase text-white bg-[#0078B6] disabled:bg-[#0078B6]/60 text-center w-full max-w-xs py-2 rounded-full font-semibold cursor-pointer'
                >
                    UPLOAD PHOTO
                </button>

               


            </div>

            <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
                <ImageCropper
                    image={image}
                    onSave={(croppedImage) => {
                        setCroppedImage(croppedImage);
                    }}
                    onClose={() => setIsCropDialogOpen(false)}
                />
            </Dialog>
        </div>
    )
}

export default GeneratePoster;