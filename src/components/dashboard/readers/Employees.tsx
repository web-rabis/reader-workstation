import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {RegistrationFilters} from "@/components/dashboard/readers/RegistrationFilters.tsx";
import {RegistrationCard} from "@/components/dashboard/readers/RegistrationCard.tsx";
import {RegistrationPagination} from "@/components/dashboard/RegistrationPagination.tsx";
import {ReaderCard} from "@/components/dashboard/readers/ReaderCard.tsx";
import {ReaderCropPhoto} from "@/components/dashboard/readers/ReaderCropPhoto.tsx";
import {useCallback, useEffect, useState} from "react";
import {initReaderSearchParams, ReaderListResponse} from "@/types/admin-api.ts";
import {Reader, ReaderSearchParams} from "@/types/reader.ts";
import {loadFromStorage, saveToStorage} from "@/lib/stateStorage.ts";
import {Paging} from "@/types/api.ts";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "@/contexts/LanguageContext.tsx";
import {adminReaderEmployeeService} from "@/services/admin-service.ts";
import {toast} from "sonner";
const KEY_SEARCH   = "dashboard:employees:search";
const KEY_PAGING   = "dashboard:employees:paging";
const DEFAULT_SEARCH: ReaderSearchParams = initReaderSearchParams; // КОНСТАНТА, не вызываем!
const DEFAULT_PAGING: Paging = { skip: 1, limit: 15 , orderBy:"ticketNumber", order:-1};
export function Employees() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [openCropPhoto, setOpenCropPhoto] = useState<boolean>(false);
    const [registrations, setRegistrations] = useState<ReaderListResponse>({result:[],count:0});
    const [searchParams, setSearchParams] = useState<ReaderSearchParams>(() =>
        loadFromStorage<ReaderSearchParams>(KEY_SEARCH, DEFAULT_SEARCH)
    );
    const [paging, setPaging] = useState<Paging>(() =>
        loadFromStorage<Paging>(KEY_PAGING, DEFAULT_PAGING)
    );
    const [selectedRegistration, setSelectedRegistration] = useState<Reader | null>(null);
    const fetchRegistrations = useCallback(async () => {
        try {
            if(searchParams.query!="" && searchParams.query.length<3){
                return
            }
            const response = await adminReaderEmployeeService.getReaderAll(searchParams,paging);
            setRegistrations(response.data);
        } catch (error) {
            toast.error(t('loadError'));
        }
    }, [ searchParams,paging, t]);
    useEffect(() => { saveToStorage(KEY_SEARCH, searchParams); },        [searchParams]);
    useEffect(() => { saveToStorage(KEY_PAGING, paging); },         [paging]);

    useEffect(() => {
        fetchRegistrations();
    }, [fetchRegistrations, paging]);


    const handleApprove = useCallback(async (id: number) => {
    }, []);

    const handleReject = useCallback(async (id: number) => {
    }, []);

    const handleEdit = useCallback((id: number) => {
        navigate(`/edit-registration/${id}`);
    }, [navigate]);

    const handleNew = useCallback(() => {
        navigate(`/new-reader`);
    }, [navigate]);

    const totalPages = Math.ceil(registrations.count / paging.limit);

    const getStatusLabel = useCallback((status: string) => {
        switch (status) {
            case "pending":
                return t('pending');
            case "approved":
                return t('approved');
            case "rejected":
                return t('rejected');
            default:
                return t('active');
        }
    }, [t]);

    const handleStatusChange = useCallback((value: string) => {
        // setStatusFilter(value);
        setSearchParams(prev => ({ ...prev, status: value}));
        if(value=="*"){
            setPaging({...DEFAULT_PAGING,order:-1}); // сброс
        } else {
            setPaging({...DEFAULT_PAGING,order:1}); // сброс
        }
    }, []);

    const handleAdvancedToggle = useCallback((value: boolean) => {
        setSearchParams(prev => ({ ...prev, advancedSearch: value}));
        setPaging(DEFAULT_PAGING); // сброс
    }, []);

    const handleSearchChange = useCallback((value: string) => {
        setSearchParams(prev => ({ ...prev, query: value}));
        setPaging(DEFAULT_PAGING); // сброс
    }, []);

    const handleExpirationChangeLow = useCallback((value: string) => {
        setSearchParams(prev => ({ ...prev, expirationDateLow: value}));
        setPaging(DEFAULT_PAGING); // сброс
    }, []);
    const handleExpirationChangeHigh = useCallback((value: string) => {
        setSearchParams(prev => ({ ...prev, expirationDateHigh: value}));
        setPaging(DEFAULT_PAGING); // сброс
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setPaging({...paging,skip:page}); // сброс
    }, []);

    const handleOnViewCard=useCallback((reader:Reader)=>{
        setSelectedRegistration(reader);
    },[])

    const handleReRegistration = useCallback(async (reader:Reader) => {
        try {
            await adminReaderEmployeeService.renewalReaderRegistration(reader.ticketNumber);
            toast.success(t('rejectSuccess').replace('{id}', reader.ticketNumber.toString()));
            fetchRegistrations();
        } catch (error) {
            toast.error(t('processingError'));
        }
    }, [fetchRegistrations, t]);

    return (
        <div>
        <Card>
            <CardHeader>
                <RegistrationFilters
                    searchParams={searchParams}
                    paging={paging}
                    onStatusChange={handleStatusChange}
                    onSearchChange={handleSearchChange}
                    onExpirationLowChange={handleExpirationChangeLow}
                    onExpirationHighChange={handleExpirationChangeHigh}
                    onAdvancedToggle={handleAdvancedToggle}
                    onNewReader={handleNew}
                />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {registrations.count === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            {t('noRegistrations')}
                        </div>
                    ) : (
                        registrations.result.map((registration) => (
                            <RegistrationCard
                                key={registration.ticketNumber}
                                registration={registration}
                                onApprove={handleApprove}
                                onReject={handleReject}
                                onEdit={handleEdit}
                                onViewCard={handleOnViewCard}
                                onReRegistration={handleReRegistration}
                                getStatusLabel={getStatusLabel}
                            />
                        ))
                    )}
                </div>

                {totalPages > 1 && (
                    <RegistrationPagination
                        currentPage={paging.skip}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </CardContent>
        </Card>

    {selectedRegistration && (
        <ReaderCard
            registration={selectedRegistration}
            open={!!selectedRegistration}
            onClose={() => setSelectedRegistration(null)}
            cropImage={(registration)=>{setOpenCropPhoto(true);}}
        />
    )}
    {selectedRegistration && openCropPhoto && (
        <ReaderCropPhoto
            id={selectedRegistration?.ticketNumber}
            open={!!openCropPhoto}
            onClose={() => setOpenCropPhoto(false)}
        />
    )}
        </div>
    )
}