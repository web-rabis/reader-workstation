
import { PencilIcon, IdCard, Repeat, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {Reader } from "@/types/admin-api.ts";
import { useTranslation } from "@/contexts/LanguageContext.tsx";
import {formatter} from "@/lib/date.ts";

interface RegistrationCardProps {
  registration: Reader;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onEdit: (id: number) => void;
  onViewCard: (registration: Reader) => void;
  getStatusLabel: (status: string) => string;
  onReRegistration: (registration: Reader) => void;
  onDelete: (id: number) => void;
}

export function RegistrationCard({
  registration,
  onApprove,
  onReject,
  onEdit,
  onViewCard,
  onReRegistration,
  onDelete,
  getStatusLabel,
}: RegistrationCardProps) {
  const { t } = useTranslation();
  const handleApprove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onApprove(registration.ticketNumber);
  };

  const handleReject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onReject(registration.ticketNumber);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(registration.ticketNumber);
  };

  const handleViewCard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewCard(registration);
  };
  const handleReRegistration = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onReRegistration(registration);
  };
    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm(t('deleteQuestion'))){
            onDelete(registration.ticketNumber);
        }
    };
  return (
    <div className="p-4 border rounded-lg  gap-4 hover:bg-muted/50 transition-colors grid grid-cols-1">
      <div className="space-y-1">
        <div className="font-medium grid grid-cols-2">
            {registration.status=="" && (<>№ {registration.ticketNumber} </>)}
             {registration.lastname} {registration.firstname} {registration.middlename}
        </div>
        <p className="text-sm text-muted-foreground">{t('yearBirth')}: {registration.yearBirth}</p>
        {registration.barcode && (
          <p className="text-sm text-muted-foreground">{t('barCode')}: {registration.barcode}</p>
        )}
        {registration.iin && (
          <p className="text-sm text-muted-foreground">{t('iin')}: {registration.iin}</p>
        )}
        {registration.phone && (
           <p className="text-sm text-muted-foreground">{t('phoneNumber')}: {registration.phone}</p>
        )}
        {registration.workPhone && (
          <p className="text-sm text-muted-foreground">{t('workPhone')}: {registration.workPhone}</p>
        )}
        {registration.registrationDate && (
          <p className="text-sm text-muted-foreground">
                  {t('registrationDate')}: {formatter.format(new Date(registration.registrationDate))}
          </p>
        )}
        {registration.expirationDate && (
          <p className="text-sm text-muted-foreground">
            {t('expirationDate')}: {formatter.format(new Date(registration.expirationDate))}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
          <Badge variant="secondary" className={"w-[100px]"}>{registration.priznakUdal===""?getStatusLabel(registration.status):t("deleted")}</Badge>
          {(registration.status === "" && registration.priznakUdal==="") && (
            <>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-600 hover:text-gray-700"
                    onClick={handleViewCard}
                >
                    <IdCard className="w-4 h-4 mr-1" />
                    {t('ticket')}
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-600 hover:text-gray-700"
                    onClick={handleReRegistration}
                >
                    <Repeat className="w-4 h-4 mr-1" />
                    {t('renewalRegistration')}
                </Button>
            </>
          )}

          {(registration.status !== "rejected" && registration.status !== "deleted" && registration.priznakUdal==="") &&(
            <Button
                variant="outline"
                size="sm"
                className="text-blue-600 hover:text-blue-700"
                onClick={handleEdit}
            >
                <PencilIcon className="w-4 h-4 mr-1" />
                {t('edit')}
            </Button>
          )}

          {(registration.status === "pending" && registration.priznakUdal==="") && (
            <>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600 hover:text-green-700"
                    onClick={handleApprove}
                >
                    {t('approve')}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={handleReject}
                >
                    {t('reject')}
                </Button>
            </>
          )}

          {(registration.status === "" && registration.priznakUdal==="") && (
              <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={handleDelete}
              >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {t('delete')}
              </Button>

          )}
      </div>
    </div>
  );
}
