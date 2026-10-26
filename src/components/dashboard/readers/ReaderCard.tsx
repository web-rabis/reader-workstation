
import { Printer, RotateCcw, RotateCw, Crop } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { useTranslation } from "@/hooks/useTranslation.ts";
import {Reader} from "@/types/reader.ts";
import {Ean13} from "@/components/dashboard/Ean13.tsx";
import {printDiv} from "@/lib/print.ts";
import {useCallback, useEffect, useState} from "react";
import {adminReaderService} from "@/services/admin-service.ts";
import {adminDictionaryService} from "@/services/admin-dictionary-service.ts";
import 'react-advanced-cropper/dist/style.css';
import {toast} from "sonner";
import {ReaderCropPhoto} from "@/components/dashboard/readers/ReaderCropPhoto.tsx";

interface ReaderCardProps {
  registration: Reader;
  open: boolean;
  onClose: () => void;
  cropImage: (registration: Reader) => void;
}

export function ReaderCard({ registration, open, onClose,cropImage }: ReaderCardProps) {
  const { t } = useTranslation();

    const [photo, setPhoto] = useState<string>("");
    const [background, setBackground] = useState<string>("");
    useEffect(() => {
        fetchPhoto()
    }, []);
    const fetchPhoto = useCallback(async () => {
        try {
            const responsePhoto = await adminReaderService.getReaderPhoto(registration.ticketNumber);
            const responseBackground = await adminDictionaryService.getTypeCardBackground(registration.typeCard.id)
            setPhoto(responsePhoto);
            setBackground(responseBackground);
        } catch (error) {
            toast.error(t('loadError'));
        }
    }, [ registration, t]);
  const handlePrint = () => {
    printDiv('reader-card');
  };

    const handleRotate90 = () => {
        adminReaderService.rotateReaderPhoto90(registration.ticketNumber).then((data)=>{
            setPhoto(data);
        });
    };
    const handleRotate270 = () => {
        adminReaderService.rotateReaderPhoto270(registration.ticketNumber).then((data)=>{
            setPhoto(data);
        });
    };

    const handleOnCropImage=()=>{
        cropImage(registration);
    }

  const getStatusText = (status: string) => {
    return status === 'approved' ? t('active') : t('inactive');
  };
    const formatter = new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    if (registration===undefined){
        return <></>
    }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[415px]">
        <DialogHeader>
        </DialogHeader>
          <div className="space-y-4 p-4 border rounded-lg " id="reader-card">
          <div id={"readerCard"} style={{
              backgroundImage: `url(data:image/jpg;base64,${background})`,
              display:"grid",
              gridTemplateColumns: "90px auto",
              width: "8.5cm",
              height: "5.4cm",
              paddingLeft: "15px",
              paddingTop: "15px",
              paddingBottom: "15px",
              paddingRight: "10px",
              border: "black solid 0px",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
              lineHeight: 1.2,
              fontFamily: "Tahoma, sans-serif",
          }}>
              <div className={"flex flex-col gap-1 justify-end"}>
                  <div>
                  <img src={`data:image/jpg;base64,${photo}`} alt="Card" style={{
                      width: "90px",
                      height: "130px",
                      objectFit: "contain",
                      maxWidth: "90px",
                      maxHeight: "130px",
                  }} />
                  </div>
                  <div>
                  <Ean13 data12={registration.barcode}/>   {/* библиотека сама дорисует 13-ю цифру */}
                  </div>

              </div>
              <div style={{
                  marginLeft: "2px",
                  marginTop: "35px",
              }}>
                  <div style={{
                      marginLeft: "10px",
                      fontSize: "13px"
                  }}>
                      <b>OQYRMAN BILETI</b> № {registration.ticketNumber}
                  </div>
                  <div style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "130px",
                      alignItems: "center",
                  }}>
                      <div>
                      {registration.lastname}<br/>
                      {registration.firstname}<br/>
                      {registration.middlename}
                      </div>
                      <div>
                          {registration.readersHall}
                      </div>
                  </div>
                  <div style={{
                      marginTop: "5px",
                      marginLeft: "20px",
                      fontSize: "10px",
                  }}>
                      Tirkelgen kuni {formatter.format(new Date(registration.registrationDate))}<br/>
                      {registration.expirationDate && (<span>Merzimi {formatter.format(new Date(registration.expirationDate))} deiin</span>)}
                  </div>
                  <div style={{
                      fontSize: "10px",
                      marginTop: "8px",
                      marginLeft: "20px",
                  }}
                  >
                      Сайт: {registration.typeCard.web}<br/>
                      email: {registration.typeCard.email}<br/>
                      instagram: {registration.typeCard.instagram}
                  </div>

              </div>

          </div>
          </div>
        <div className="flex justify-between">
            <div className={"flex flex-row gap-2"}>
                <Button onClick={handleRotate270}><RotateCcw/></Button>
                <Button onClick={handleRotate90}><RotateCw/></Button>
            </div>
            {/*<div className={"flex flex-row gap-2"}>*/}
            {/*    <Button onClick={handleOnCropImage }><Crop/></Button>*/}
            {/*</div>*/}
            <div>
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            {t('print')}
          </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


