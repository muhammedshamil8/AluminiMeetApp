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
import html2canvas from 'html2canvas';
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
        const poster = document.getElementById('posterID');
        html2canvas(poster, {
            scale: 5,
            useCORS: true
        }).then((canvas) => {
            const imageUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imageUrl;
            if (name) {
                link.download = `${name}_poster.png`;
            } else {
                link.download = 'poster.png';
            }
            link.click();
        });
    };
    
    const handleShare = async () => {
        const poster = document.getElementById('posterID');
        html2canvas(poster, {
            scale: 5,
            useCORS: true
        }).then((canvas) => {
            canvas.toBlob(async (blob) => {
                if (!blob) return;
    
                const file = new File([blob], 'poster.png', { type: 'image/png' });
    
                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: "Alumini Meet",
                            url: 'https://alumini-meet-app-theta.vercel.app/',
                            text: "Check out the poster I created on Alumini Meet",
                            files: [file],
                        });
                    } catch (err) {
                        console.error('Error sharing:', err);
                    }
                } else {
                    console.warn('Web Share API not supported or file sharing not supported');
                    alert('Sorry, file sharing is not supported on your device please download the image and share it manually');
                }
            });
        });
    };

    return (
        <div className="relative  flex-1 flex flex-col items-center justify-around p-4 gap-10">
            <div className='flex items-start justify-start w-full px-6 my-16'>
                <BackButton label="Generate Poster" />
            </div>

            <div className='relative w-full max-w-md mx-auto flex flex-col items-center gap-4 flex-grow '>
                <div ref={posterRef} className="relative w-full max-w-xs mx-auto overflow-hidden" id="posterID">
                    <img
                        src={Poster}
                        alt="Poster Template"
                        className="w-full h-auto object-contain"
                    />

                    {croppedImage && (
                        <div className="absolute top-[50%] left-[29.5%] transform -translate-x-1/2 -translate-y-1/2 w-[32.5%] text-center">
                            <img
                                src={croppedImage}
                                alt="Cropped"
                                className="uploaded-image rounded-md  handwriting2 "
                            />

                        </div>

                    )}

                    <p style={{overflowWrap: 'anywhere'}} className={` text-center leading-4 max-w-[100px] handwriting absolute top-[73%] left-[29.5%] transform -translate-x-1/2 -translate-y-1/2  ${name.length > 10 ? 'text-[9px]' : 'text-sm'}`}>{name}</p>

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
                <button
                    disabled={!name}
                    onClick={() => document.getElementById("fileInput").click()}
                    className='uppercase text-white bg-[#0078B6] disabled:bg-[#0078B6]/60 text-center w-full max-w-xs py-2 rounded-full font-semibold cursor-pointer transition-all ease-in-out hover:bg-[#0078B6]/70 hover:shadow-lg'
                >
                    UPLOAD PHOTO
                </button>

                {name && croppedImage && (
                    <>
                        <button
                            onClick={handleDownload}
                            className='uppercase text-white bg-[#0078B6] disabled:bg-[#0078B6]/60 text-center w-full max-w-xs py-2 rounded-full font-semibold cursor-pointer transition-all ease-in-out hover:bg-[#0078B6]/70 hover:shadow-lg' 
                        >
                            Download
                        </button>
                        <button onClick={handleShare} className='ppercase text-white bg-[#0078B6] disabled:bg-[#0078B6]/60 text-center w-full max-w-xs py-2 rounded-full font-semibold cursor-pointer transition-all ease-in-out hover:bg-[#0078B6]/70 hover:shadow-lg' >Share</button>
                    </>
                )}

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