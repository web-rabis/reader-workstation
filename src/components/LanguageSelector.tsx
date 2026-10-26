
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/LanguageContext";

export function LanguageSelector() {
  const { currentLanguage, changeLanguage } = useTranslation();

  return (
    <div className="flex gap-2">
      <Button
        variant={currentLanguage === 'ru' ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('ru')}
      >
        RU
      </Button>
      <Button
        variant={currentLanguage === 'kk' ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('kk')}
      >
        KK
      </Button>
      <Button
        variant={currentLanguage === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('en')}
      >
        EN
      </Button>
    </div>
  );
}
