export interface LanguageOptions {
    en: string;
    ru: string;
    kz: string;
}

export interface Dictionary {
    id: number;
    name: string;
    translations?: LanguageOptions;
}
export interface TypeCard {
    id: number;
    type: string;
    code: string;
    web: string;
    email: string;
    instagram: string;
    isTerm: boolean;
    photo: string;
    photoTitle: string;
}
export interface DictionaryListResponse<T> {
    count: number;
    result: T[];
}
export function dictionaryWithLabel(dict: Dictionary) {
    return {
        ...dict,
        label(lang: string) {
            if (lang === 'en') {
                return dict.translations?.en ?? dict.name
            } else if (lang === 'kk') {
                return dict.translations?.kz ?? dict.name
            }else if (lang === 'ru') {
                return dict.translations?.ru ?? dict.name
            }
        },
    };
}
