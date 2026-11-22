import {Reader} from "@/types/reader.ts";
import {Visit} from "@/types/control.ts";
import {useCallback, useEffect, useState} from "react";
import {adminReaderService} from "@/services/admin-service.ts";
import {toast} from "sonner";
import noPhotoImg from "@/components/reader-info/img/nophoto.png";
import {formatterWithTime} from "@/lib/date.ts";
import {useTranslation} from "@/contexts/LanguageContext.tsx";


interface VisitInfoProps {
    visit: Visit;
}

export function VisitInfo({visit }: VisitInfoProps) {
    const { t } = useTranslation();
    const [reader, setReader] = useState<Reader>(undefined);
    const [readerPhoto, setReaderPhoto] = useState<string>("");
    useEffect(() => {
        fetchReader()
    }, [visit]);
    const fetchReader = useCallback(async () => {
        try {
            const response = await adminReaderService.getReaderByGlobalTicketNumber(visit.readerId);
            const responsePhoto = await adminReaderService.getReaderPhoto(response.data.result.ticketNumber);
            setReader(response.data.result);
            setReaderPhoto(responsePhoto);
        } catch (error) {
            toast.error(t('loadError'));
        }
    }, [ visit, t]);

    if (!reader) return <></>
    return <div className="p-4 border rounded-lg  gap-4 hover:bg-muted/50 transition-colors flex ">
        <div>
            {readerPhoto && <img src={`data:image/jpg;base64,${readerPhoto}`} alt="" className={"w-[90px] h-auto rounded-lg"}/>}
            {!readerPhoto && <img src={noPhotoImg} alt="" className={"w-[90px] h-auto rounded-lg"}/>}
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
            {visit.checkedInAt && (
                <p className="text-sm text-muted-foreground">{t('visitDate')}: {formatterWithTime.format(new Date(visit.checkedInAt))}</p>
            )}
            {visit.departmentId !== undefined && (
                <p className="text-sm text-muted-foreground">КР: {visit.departmentId}</p>
            )}
            <p className="text-sm text-muted-foreground">{t('employeeVisit')}: {visit.checkedInBy}</p>
        </div>
    </div>
}