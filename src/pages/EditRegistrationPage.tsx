
import { useParams } from "react-router-dom";
import { ReaderEditForm } from "@/components/dashboard/readers/ReaderEditForm.tsx";

export function EditRegistrationPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto py-6 space-y-6">

      <ReaderEditForm mode="edit" id={Number(id)} />
    </div>
  );
}

export default EditRegistrationPage;
