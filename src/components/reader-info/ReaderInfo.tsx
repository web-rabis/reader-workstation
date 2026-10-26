import {Reader} from "@/types/reader.ts";
import {useTranslation} from "@/contexts/LanguageContext.tsx";
import {useCallback, useEffect, useState} from "react";
import {adminReaderService} from "@/services/admin-service.ts";
import {toast} from "sonner";
import {formatter} from "@/lib/date.ts";
import noPhotoImg from "@/components/reader-info/img/nophoto.png"

interface ReaderInfoProps {
    reader: Reader;
}

export function ReaderInfo({reader }: ReaderInfoProps) {
    const { t } = useTranslation();
    const [photo, setPhoto] = useState<string>("");
    useEffect(() => {
        fetchPhoto()
    }, [reader]);
    const fetchPhoto = useCallback(async () => {
        try {
            const responsePhoto = await adminReaderService.getReaderPhoto(reader.ticketNumber);
            setPhoto(responsePhoto);
        } catch (error) {
            toast.error(t('loadError'));
        }
    }, [ reader, t]);
    return (
        <div className="p-4 border rounded-lg  gap-4 hover:bg-muted/50 transition-colors grid grid-cols-1">
            <div className="space-y-1 flex items-start justify-start  gap-2">
                <div>
                    {photo && <img src={`data:image/jpg;base64,${photo}`} alt="" className={"w-[100px] rounded-lg"}/>}
                    {!photo && <img src={noPhotoImg} alt="" className={"w-[100px] rounded-lg"}/>}

                </div>
                <div>
                    <div className="font-medium">
                        <p>№ {reader.ticketNumber} {reader.lastname} {reader.firstname} {reader.middlename}</p>
                    </div>

                    {reader.barcode && (
                        <p className="text-sm text-muted-foreground">{t('barCode')}: {reader.barcode}</p>
                    )}
                    {reader.iin && (
                        <p className="text-sm text-muted-foreground">{t('iin')}: {reader.iin}</p>
                    )}
                    {reader.registrationDate && (
                        <p className="text-sm text-muted-foreground">
                            {t('registrationDate')}: {formatter.format(new Date(reader.registrationDate))}
                        </p>
                    )}
                    {reader.expirationDate && (
                        <p className="text-sm text-muted-foreground">
                            {t('expirationDate')}: {formatter.format(new Date(reader.expirationDate))}
                        </p>
                    )}
                    {reader.lastVisitDate && (
                        <p className="text-sm text-muted-foreground">
                            {t('lastVisitDate')}: {formatter.format(new Date(reader.lastVisitDate))}
                        </p>
                    )}
                    {reader.readersHall && (
                        <p className="text-sm text-muted-foreground">
                            {t('readersHall')}: {reader.readersHall}
                        </p>
                    )}
                </div>

            </div>
        </div>
    )
}