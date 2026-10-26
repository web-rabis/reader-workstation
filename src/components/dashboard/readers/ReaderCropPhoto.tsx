import {Cropper} from "react-advanced-cropper";
import {Reader} from "@/types/reader.ts";
import {DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Dialog, DialogContent} from "@/components/ui/dialog.tsx";
interface CropImageProps {
    id: number;
    open: boolean;
    onClose: () => void;
}
export function ReaderCropPhoto({ id,open,onClose }: CropImageProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[415px] h-[415px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>
                <div>
                    {/*<Cropper*/}
                    {/*    src={`data:image/jpg;base64,${image}`}*/}
                    {/*    className={'cropper'}*/}
                    {/*/>*/}
                </div>eeeeee
            </DialogContent>
        </Dialog>

    )
}