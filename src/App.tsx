
import {Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { EditRegistrationPage } from "./pages/EditRegistrationPage";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import NewReaderPage from "@/pages/NewReaderPage.tsx";
import AdminLayout from "@/layouts/AdminLayout.tsx";
import {Control} from "@/components/control/Control.tsx";
import {Readers} from "@/components/readers/Readers.tsx";
import {Employees} from "@/components/dashboard/readers/Employees.tsx";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AdminLayout />}>
              <Route index element={<Navigate to="readers" replace />} />
              <Route path="control" element={<Control />} />
              <Route path="readers" element={<Readers />} />
              <Route path="readers/:id/edit" element={<EditRegistrationPage />} />
              <Route path="readers/new" element={<NewReaderPage />} />
              <Route path="employees" element={<Employees />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
