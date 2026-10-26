import {ReaderEditForm} from "@/components/dashboard/readers/ReaderEditForm.tsx";

export function NewReaderPage() {

  return (
    <div className="container mx-auto py-6 space-y-6">
      <ReaderEditForm mode="create" />
    </div>
  );
}

export default NewReaderPage;
