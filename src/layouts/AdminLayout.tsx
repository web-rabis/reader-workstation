import {useAuth} from "@/contexts/AuthContext.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import Login from "@/pages/Login.tsx";
import imgLogo from "@/layouts/img/logo.png";
import imgDarkLogo from "@/layouts/img/logo3.png";
import {useTranslation} from "@/contexts/LanguageContext.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import {toast} from "sonner";
import {
    LayoutDashboard,
    LogOut,
    Menu, Moon,
    Sun, User,
    Users, Languages, ArrowDownUp
} from "lucide-react";
import {Sidebar} from "@/components/ui/sidebar.tsx";

export default function AdminLayout() {
    const [leftOpen, setLeftOpen] = useState(true);
    const [rightOpen, setRightOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement | null>(null);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const langMenuRef = useRef<HTMLDivElement | null>(null);
    const [lang, setLang] = useState('ru');

    useEffect(() => {
        if (dark) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    }, [dark]);
    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            const t = e.target as Node;
            if (userMenuRef.current && !userMenuRef.current.contains(t)) setUserMenuOpen(false);
            if (langMenuRef.current && !langMenuRef.current.contains(t)) setLangMenuOpen(false);
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, []);

    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const {t, changeLanguage, languages} = useTranslation();
    const handleLogout = useCallback(() => {
        logout();
        toast.success(t('logoutSuccess'));
        navigate('/', { replace: true });
    }, [logout, t, navigate]);

    if (!isAuthenticated) {
        return <Login />;
    }
    const user = (() => {
        try {
            const raw = localStorage.getItem("librarian-user");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    })();
    if (!user) {
        return <Login />;
    }
    return (
        <div className="min-h-screen w-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/70">
                <div className={"mx-auto max-w-7xl grid grid-cols-12 gap-3 px-3 h-16"}>
                    <div className={"col-span-2 flex items-center justify-center"}>
                        {!dark && <img src={imgLogo} alt="My Admin" className="h-7 w-auto min-w-[66px]" />}
                        {dark && <img src={imgDarkLogo} alt="My Admin" className="h-7 w-auto min-w-[66px]" />}
                    </div>
                    <div className={"col-span-10 flex justify-between"}>
                        <div className={"flex items-center gap-2"}>
                            <button
                                onClick={() => setLeftOpen((v) => !v)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                                aria-label="Toggle left sidebar"
                            >
                                <Menu className="h-5 w-5" />
                            </button>


                            <span className="font-semibold tracking-tight">{t("registration")}</span>
                            <span className="ml-2 hidden rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 sm:inline">v1.0</span>

                        </div>
                        <div className="flex items-center gap-2">
                            {/*<button*/}
                            {/*    onClick={() => setRightOpen((v) => !v)}*/}
                            {/*    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"*/}
                            {/*    aria-label="Toggle right sidebar"*/}
                            {/*>*/}
                            {/*    {rightOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}*/}
                            {/*</button>*/}
                            <button
                                onClick={() => setDark((d) => !d)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                                aria-label="Toggle theme"
                            >
                                {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>
                            <div ref={langMenuRef} className="relative">
                                <button
                                    onClick={() => setLangMenuOpen((v) => !v)}
                                    className="inline-flex h-9 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-2 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                                    aria-haspopup="menu"
                                    aria-expanded={langMenuOpen}
                                >
                                    <Languages className="h-5 w-5" />
                                    <span className="text-sm font-medium">{lang.toUpperCase()}</span>
                                </button>
                                {langMenuOpen && (
                                    <div role="menu" className="absolute right-0 mt-2 w-28 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                                        {languages.map((code) => (
                                            <button
                                                key={code}
                                                className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
                                                onClick={() => {
                                                    setLang(code);
                                                    setLangMenuOpen(false);
                                                    changeLanguage(code);
                                                }}
                                            >
                                                <span>{code.toUpperCase()}</span>
                                                {lang === code ? <span>•</span> : null}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/*<button className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700" aria-label="Notifications">*/}
                            {/*    <Bell className="h-5 w-5" />*/}
                            {/*</button>*/}

                            <div ref={userMenuRef} className="relative ml-1">
                                <button
                                    onClick={() => setUserMenuOpen((v) => !v)}
                                    className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-2 py-1 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                                    aria-haspopup="menu"
                                    aria-expanded={userMenuOpen}
                                >
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div className="hidden text-sm leading-5 sm:block text-left">
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-xs text-zinc-500 dark:text-zinc-400">{user.department.name}</div>
                                    </div>
                                </button>

                                {userMenuOpen && (
                                    <div role="menu" className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                                        {/*<button*/}
                                        {/*    className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"*/}
                                        {/*    onClick={() => {*/}
                                        {/*        setUserMenuOpen(false);*/}
                                        {/*        console.log("Go to profile");*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    <User className="h-4 w-4" />*/}
                                        {/*    Профиль*/}
                                        {/*</button>*/}
                                        <button
                                            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-100 text-red-600 dark:text-red-400 dark:hover:bg-zinc-700"
                                            onClick={() => {
                                                setUserMenuOpen(false);
                                                handleLogout();
                                            }}
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Выйти
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-2 px-2 py-2 sm:px-3 lg:grid-cols-12 lg:gap-3 lg:py-3">
                {/* Left Sidebar */}
                {leftOpen && (
                    <aside className="lg:col-span-2">


                        <nav className="sticky top-20 flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800">
                            {[
                                { icon: <LayoutDashboard className="h-4 w-4" />, label: t("home") , url: "/readers"},
                                { icon: <Users className="h-4 w-4" />, label: t("readers") , url: "/readers"},
                                // { icon: <Users className="h-4 w-4" />, label: "Employees", url: "/employees" },
                                { icon: <ArrowDownUp className="h-4 w-4" />, label: t("control"), url: "/control" },
                            ].map((item) => (
                                <button
                                    key={item.label}
                                    className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
                                    onClick={() => {navigate(item.url)}}
                                >
<span className="grid place-items-center rounded-lg border border-zinc-200 bg-white p-1 group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:group-hover:border-zinc-600">
{item.icon}
</span>
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </aside>
                )}


                {/* Main Content */}
                <div className={`${leftOpen && rightOpen ? "lg:col-span-8" : leftOpen || rightOpen ? "lg:col-span-10" : "lg:col-span-12"}`}>
                    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                        <Outlet />
                    </section>
                </div>

                {/* Right Sidebar */}
                {rightOpen && (
                    <aside className="lg:col-span-2">
                        <div className="sticky top-20 flex flex-col gap-3">
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
                                <h3 className="mb-2 text-sm font-semibold">Статусы</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center justify-between">
                                        <span className="text-zinc-600 dark:text-zinc-300">Сервер</span>
                                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">OK</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-zinc-600 dark:text-zinc-300">Очереди</span>
                                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">Средне</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
                                <h3 className="mb-2 text-sm font-semibold">Быстрые действия</h3>
                                <div className="flex flex-wrap gap-2">
                                    <button className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/40 dark:hover:bg-zinc-800">Создать</button>
                                    <button className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/40 dark:hover:bg-zinc-800">Экспорт</button>
                                    <button className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/40 dark:hover:bg-zinc-800">Обновить</button>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}
            </div>
            </main>
            {/* Footer */}
            <footer className="border-t border-zinc-200 bg-white py-4 text-sm dark:border-zinc-700 dark:bg-zinc-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
                    <span className="text-zinc-600 dark:text-zinc-400">© {new Date().getFullYear()} My Admin. Все права защищены.</span>
                    <a className="text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-200" href="#">Политика конфиденциальности</a>
                </div>
            </footer>
        </div>
    )
}