import {Ebook, Magazine, Order} from "@/types/control.ts";
import {BookType, Newspaper} from "lucide-react";
import {formatterWithTime} from "@/lib/date.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {useTranslation} from "@/contexts/LanguageContext.tsx";
import {useCallback} from "react";

interface OrderProps {
    order: Order;
}
export function OrderInfo({order}: OrderProps) {
    const {t} = useTranslation()
    const getStatusLabel = useCallback((status: string) => {
        switch (status) {
            case "Order.Ordered":
                return t('statusOrderOrdered');
            case "Order.InStorage":
                return t('statusOrderInStorage');
            case "Order.InReadingHall":
                return t('statusOrderInReadingHall');
            case "Order.InHands":
                return t('statusOrderInHands');
            case "Order.Postponed":
                return t('statusOrderPostponed');
            case "Order.ReturnToStorage":
                return t('statusOrderReturnToStorage');
            case "Order.Processed":
                return t('statusOrderProcessed');
            case "Order.Rejected":
                return t('statusOrderRejected');
            case "Order.ReaderReturned":
                return t('statusOrderReaderReturned');
        }
    }, [t]);
    const EbookInfo = (ebook: Ebook) => {
        if(ebook===null){
            return <></>
        }
        return <div>
            <p className="text-sm text-muted-foreground">
                Автор: {ebook.author}
            </p>
            <p className="text-sm text-muted-foreground">
                Заглавие: {ebook.title}
            </p>
            {ebook.inv.invNumber && <p className="text-sm text-muted-foreground">
                Инв номер: {ebook.inv.invNumber }
            </p>}
            {ebook.inv.barcode && <p className="text-sm text-muted-foreground">
                Штрих-код: {ebook.inv?.barcode }
            </p>}
        </div>
    }
    const MagazineInfo = (magazine: Magazine) => {
        if(magazine===null){
            return <></>
        }
        return <div>
            <p className="text-sm text-muted-foreground">
                Название: {magazine.title}
            </p>
            <p className="text-sm text-muted-foreground">
                Номер: {magazine.number}
            </p>
            <p className="text-sm text-muted-foreground">
                Год: {magazine.year}
            </p>
            {magazine.inv.invNumber && <p className="text-sm text-muted-foreground">
                Инв номер: {magazine.inv.invNumber }
            </p>}
            {magazine.inv.barcode && <p className="text-sm text-muted-foreground">
                Штрих-код: {magazine.inv?.barcode }
            </p>}
        </div>
    }
return (
    <div className={"p-4 border rounded-lg  gap-4 hover:bg-muted/50 transition-colors grid grid-cols-1 mt-5"}>
        <div className="font-medium flex gap-2">
            <div>
                {order.type==='ebook' && <BookType/>}
                {order.type==='magazine' && <Newspaper/>}
            </div>
            <div className={"w-full"}>
                <div className={"flex justify-between pb-3"}>
                    <div>№ {order.id} от {formatterWithTime.format(new Date(order.orderedAt))}
                        <span className={"pl-3"}>{order.department.name}</span>
                    </div>
                    <Badge variant="secondary" >{getStatusLabel(order.status.code)}</Badge>
                </div>
                <div>

                </div>
                {EbookInfo(order.ebook)}
                {MagazineInfo(order.magazine)}

            </div>
            <div>

            </div>
        </div>
    </div>
)
}