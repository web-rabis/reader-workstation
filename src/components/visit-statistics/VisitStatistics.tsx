import {VisitsStatisticsResponse, VisitsTodayResponse} from "@/types/control.ts";
import {VisitInfo} from "@/components/visit-info/VisitInfo.tsx";
import {GeneralPagination} from "@/components/general-pagination/GeneralPagination.tsx";
import {useCallback, useEffect, useState} from "react";
import {adminControlService} from "@/services/admin-control-service.ts";
import {Paging} from "@/types/api.ts";
import {LucideRefreshCcw, RefreshCcw, RefreshCcwDot, RefreshCwIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useTranslation} from "@/contexts/LanguageContext.tsx";


const DEFAULT_PAGING: Paging = { skip: 1, limit: 15 , orderBy:"vizit_date", order:-1};
const DEFAULT_VISITS_TODAY: VisitsTodayResponse = { result:[], count:0};
const DEFAULT_VISITS_STATISTICS: VisitsStatisticsResponse = { all:0, inHall:0}
export function VisitStatistics() {
    const { t } = useTranslation();
    const [visitsToday, setVisitsToday] = useState<VisitsTodayResponse>(DEFAULT_VISITS_TODAY)
    const [visitsStatistics, setVisitsStatistics] = useState<VisitsStatisticsResponse>(DEFAULT_VISITS_STATISTICS)
    const [paging, setPaging] = useState<Paging>(DEFAULT_PAGING);

    const fetchVisits = useCallback(async () => {
        try {
            const response = await adminControlService.visitsToday(paging);
            const responseStats = await adminControlService.visitsStatistics();
            setVisitsToday(response.data);
            setVisitsStatistics(responseStats.data);
        } catch (error) {
            console.error(error);
        }
    }, [paging]);
    useEffect(() => {
        fetchVisits()
    }, [paging]);
    const totalPages = Math.ceil(visitsToday.count / paging.limit);
    return (
        <>
            <div className="p-4 border rounded-lg  gap-4 grid grid-cols-1 mb-4">
                <div className={"flex items-center justify-between"}>
                    <span className={"text-2xl"}>{t('numberVisitorsToday')}</span>
                    <Button variant={"link"} onClick={()=> fetchVisits()}><LucideRefreshCcw/></Button>
                </div>
                <span className={"pl-4"}>{t("all")} - {visitsStatistics.all }</span>
                <span className={"pl-4"}>{t("inHall")} - {visitsStatistics.inHall }</span>
            </div>
            {visitsToday.count>0 && (
                <div className="p-4 border rounded-lg  gap-4 grid grid-cols-1 mb-4">
                    <div className="space-y-4">
                        <span className={"text-2xl"}>{t("readersInHall")}</span>
                        {visitsToday.result.map((visit) => (<VisitInfo visit={visit}/>))}
                        <GeneralPagination totalPages={totalPages} currentPage={paging.skip} onPageChange={(page) => setPaging({...paging, skip: page})} />
                    </div>
                </div>
            )}

        </>
    )
}