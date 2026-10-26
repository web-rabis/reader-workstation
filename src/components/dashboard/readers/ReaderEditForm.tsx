
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { toast } from "sonner";
import {Dictionary, dictionaryWithLabel } from "@/types/admin-api.ts";
import { adminDictionaryService } from "@/services/admin-dictionary-service.ts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/contexts/LanguageContext.tsx";
import {EditReaderFormData, initEditReaderFormData, editReaderFormDataFromReaderData} from "@/types/reader.ts";
import {adminReaderService} from "@/services/admin-service.ts";
import {Crop} from "lucide-react";
import {ReaderCropPhoto} from "@/components/dashboard/readers/ReaderCropPhoto.tsx";
import {TypeCard} from "@/types/dictionary.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Switch} from "@/components/ui/switch.tsx";

interface ReaderEditFormProps {
  mode?: "create" | "edit";
  id?: number;
}

export function ReaderEditForm({ mode = "create", id }: ReaderEditFormProps) {
  const navigate = useNavigate();
  const { t, currentLanguage } = useTranslation();
  const [formData, setFormData] = useState<EditReaderFormData>(initEditReaderFormData);
  const [loading, setLoading] = useState(false);
  const [dictionaries, setDictionaries] = useState<{
    nationalities: Dictionary[];
    genders: Dictionary[];
    educations: Dictionary[];
    socialStatuses: Dictionary[];
    specializations: Dictionary[];
    institutes: Dictionary[];
    faculties: Dictionary[];
    academicDegrees: Dictionary[];
    typeCards: TypeCard[];
  }>({
    nationalities: [],
    genders: [],
    educations: [],
    socialStatuses: [],
    specializations: [],
    institutes: [],
    faculties: [],
    academicDegrees: [],
    typeCards: [],
  });

  useEffect(() => {
    const loadDictionaries = async () => {
      try {
        const [
          nationalitiesRes,
          gendersRes,
          educationsRes,
          socialStatusesRes,
          specializationsRes,
          institutesRes,
          facultiesRes,
          academicDegreesRes,
          typeCards,
        ] = await Promise.all([
            adminDictionaryService.getNationalities(),
            adminDictionaryService.getGenders(),
            adminDictionaryService.getEducations(),
            adminDictionaryService.getSocialStatuses(),
            adminDictionaryService.getSpecializations(),
            adminDictionaryService.getInstitutes(),
            adminDictionaryService.getFaculties(),
            adminDictionaryService.getAcademicDegrees(),
            adminDictionaryService.getTypeCards(),
        ]);

        setDictionaries({
          nationalities: nationalitiesRes.data.result,
          genders: gendersRes.data.result,
          educations: educationsRes.data.result,
          socialStatuses: socialStatusesRes.data.result,
          specializations: specializationsRes.data.result,
          institutes: institutesRes.data.result,
          faculties: facultiesRes.data.result,
          academicDegrees: academicDegreesRes.data.result,
          typeCards: typeCards.data.result,
        });
      } catch (error) {
        toast.error(t('loadError'));
      }
    };

    loadDictionaries();
  }, [t]);

  useEffect(() => {
    if (mode === "edit" && id) {
      const loadRegistration = async () => {
          setLoading(true);
          try {
          const response = await adminReaderService.getReaderById(id);
          const photo = await adminReaderService.getReaderPhoto(id);
          setFormData(editReaderFormDataFromReaderData(response.data.result,photo));
        } catch (error) {
          toast.error(t('loadError'));
          console.error(error);
          //navigate("/dashboard");
        } finally {
              setLoading(false);
          }
      };
      loadRegistration();
    }
  }, [mode, id, navigate, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "edit" && id) {
        await adminReaderService.updateReader(id, formData);
        toast.success(t('updateSuccess'));
        navigate("/readers");
      } else {
          await adminReaderService.createReader(formData);
          navigate("/readers");
      }
    } catch (error) {
        alert(t('processingError')+'\n'+error.response?.data.error.message)
    }
  };
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string ,photoView: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };
    const handleOnCropImage=()=>{
        setOpenCropPhoto(true);
    }
    const [openCropPhoto, setOpenCropPhoto] = useState<boolean>(false);
    if (loading) {
        return <div className="text-center p-6">{t("loading")}...</div>;
    }

    return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{mode==='create'?t('createReader'):t('editReader')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
            {formData.photoView && (
                <div className="mb-4">
                    <img src={formData.photoView} alt="User photo" className="max-w-[200px] rounded shadow" />
                    {/*<div className={"flex flex-row gap-2"}>*/}
                    {/*    <Button onClick={handleOnCropImage }><Crop/></Button>*/}
                    {/*</div>*/}
                </div>
            )}
            <div className="space-y-2">
                <div className="space-y-2 inline-flex items-center">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="search-mode"
                            checked={formData.isEmployee}
                            onCheckedChange={(e) => setFormData({ ...formData, isEmployee: e })}
                        />
                        <Label htmlFor="search-mode">
                            {t("isEmployee")}
                        </Label>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
            <Label htmlFor="photo">{t('photo')}</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <Label htmlFor="typeCard">{t('typeCard')}</Label>
                  <Select
                      value={formData.typeCard.toString()}
                      onValueChange={(value) => setFormData({ ...formData, typeCard: Number(value) })}
                  >
                      <SelectTrigger>
                          <SelectValue placeholder={t('typeCard')} />
                      </SelectTrigger>
                      <SelectContent>
                          {dictionaries.typeCards.map((item) => {
                              if (item.type.trim()!=='') {
                                  return <SelectItem key={item.id} value={item.id.toString()}>
                                      {item.type}
                                  </SelectItem>
                              }
                          })}
                      </SelectContent>
                  </Select>
              </div>


            <div className="space-y-2">
              <Label htmlFor="iin">{t('iin')}</Label>
              <Input
                id="iin"
                value={formData.iin}
                onChange={(e) => setFormData({ ...formData, iin: e.target.value })}
                required
                maxLength={12}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">{t('lastName')}</Label>
              <Input
                id="lastName"
                value={formData.lastname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">{t('firstName')}</Label>
              <Input
                id="firstName"
                value={formData.firstname}
                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                required
              />
            </div>

              <div className="space-y-2">
                  <Label htmlFor="firstName">{t('middleName')}</Label>
                  <Input
                      id="middleName"
                      value={formData.middlename}
                      onChange={(e) => setFormData({ ...formData, middlename: e.target.value })}
                  />
              </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">{t('birthDate')}</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
            <Label htmlFor="nationality">{t('nationality')}</Label>
              <Select
                  value={formData.nationality.toString()}
                  onValueChange={(value) => setFormData({ ...formData, nationality: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('nationality')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.nationalities.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">{t('gender')}</Label>
              <Select
                value={formData.sex.toString()}
                onValueChange={(value) => setFormData({ ...formData, sex: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('gender')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.genders.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                        {dictionaryWithLabel(item).label(currentLanguage)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">{t('education')}</Label>
              <Select
                value={formData.education.toString()}
                onValueChange={(value) => setFormData({ ...formData, education: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('education')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.educations.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                        {dictionaryWithLabel(item).label(currentLanguage)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialStatus">{t('socialStatus')}</Label>
              <Select
                value={formData.socialStatus.toString()}
                onValueChange={(value) => setFormData({ ...formData, socialStatus: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('socialStatus')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.socialStatuses.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">{t('specialization')}</Label>
              <Select
                value={formData.speciality.toString()}
                onValueChange={(value) => setFormData({ ...formData, speciality: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('specialization')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.specializations.map((item) => {
                      if (item.name !== "") {
                          return <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name}
                          </SelectItem>
                      }
                    }
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="institute">{t('institute')}</Label>
              <Select
                value={formData.institution.toString()}
                onValueChange={(value) => setFormData({ ...formData, institution: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('institute')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.institutes.map((item) => {
                      if(item.name!=="") {
                          return <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name}
                          </SelectItem>
                      }
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty">{t('faculty')}</Label>
              <Select
                value={formData.faculty.toString()}
                onValueChange={(value) => setFormData({ ...formData, faculty: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('faculty')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.faculties.map((item) => {
                      if(item.name!=="") {
                          return <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name}
                          </SelectItem>
                      }
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">{t('course')}</Label>
              <Input
                id="course"
                value={formData.course}
                maxLength={1}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workplace">{t('workplace')}</Label>
              <Input
                id="workplace"
                value={formData.workPlace}
                maxLength={40}
                onChange={(e) => setFormData({ ...formData, workPlace: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">{t('position')}</Label>
              <Input
                id="position"
                value={formData.position}
                maxLength={45}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="academicDegree">{t('academicDegree')}</Label>
              <Select
                value={formData.academicDegree.toString()}
                onValueChange={(value) => setFormData({ ...formData, academicDegree: Number(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('academicDegree')} />
                </SelectTrigger>
                <SelectContent>
                  {dictionaries.academicDegrees.map((item) => {
                      if(item.name!=="") {
                          return <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name}
                          </SelectItem>
                      }
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">{t('phoneNumber')}</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workPhone">{t('workPhone')}</Label>
              <Input
                id="workPhone"
                type="tel"
                value={formData.workPhone}
                onChange={(e) => setFormData({ ...formData, workPhone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{t('address')}</Label>
              <Input
                id="address"
                value={formData.address}
                maxLength={100}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>


              <div className="space-y-2">
                  <Label htmlFor="address">{t("readersHall")}</Label>
                  <Input
                      id="readerHall"
                      value={formData.readersHall}
                      maxLength={100}
                      onChange={(e) => setFormData({ ...formData, readersHall: e.target.value })}
                  />
              </div>
          </div>

          <Button type="submit" className="w-full">
            {t('submit')}
          </Button>
        </form>
          {formData && openCropPhoto && (
              <ReaderCropPhoto
                  id={id}
                  open={!!openCropPhoto}
                  onClose={() => setOpenCropPhoto(false)}
              />
          )}
      </CardContent>
    </Card>
  );
}
