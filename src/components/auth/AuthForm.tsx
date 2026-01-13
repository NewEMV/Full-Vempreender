'use client';

import { Eye, EyeOff, Sparkles } from 'lucide-react';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    verifyPasswordResetCode,
    confirmPasswordReset,
    updateProfile,
    type User,
} from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '@/lib/firebase';
import { useState, useEffect, useRef, useCallback, memo, createContext, useContext } from 'react';
import { useForm, FormProvider, Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { IMaskInput } from 'react-imask';

// --- Utility Functions (integrated) ---
const cn = (...inputs: any[]) => {
    return twMerge(clsx(inputs));
};

const ToastContext = createContext<{ toast: (props: any) => void } | null>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toastState, setToastState] = useState<any>(null);
    const toast = useCallback((props: any) => {
        setToastState({ ...props, open: true });
    }, []);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            {toastState && (
                <div className="fixed bottom-4 right-4 z-50">
                    <div className="flex w-[350px] items-center justify-between space-x-4 overflow-hidden rounded-md border bg-background p-6 shadow-lg">
                        <div className="flex flex-col space-y-1">
                            {toastState.title && <div className="text-sm font-semibold">{toastState.title}</div>}
                            {toastState.description && <div className="text-sm text-muted-foreground">{toastState.description}</div>}
                        </div>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
};

const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

// --- UI Components (integrated) ---
const Button = ({ className, variant, size, ...props }: { className?: string; variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"; size?: "default" | "sm" | "lg" | "icon";[key: string]: any }) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses = {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
    };
    const sizeClasses = {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
    };
    return <button className={cn(baseClasses, variantClasses[variant || 'default'], sizeClasses[size || 'default'], className)} {...props} />;
};

const Input = ({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
};

const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    );
};

const Dialog = ({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) => {
    return (
        open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                <div className="flex flex-col rounded-lg bg-card text-card-foreground shadow-xl p-6 relative">{children}</div>
            </div>
        )
    );
};
const DialogContent = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={cn("dialog-content", className)}>{children}</div>;
const DialogHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={cn("dialog-header", className)}>{children}</div>;
const DialogTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => <h2 className={cn("text-2xl font-semibold", className)}>{children}</h2>;
const DialogDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
const DialogFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}>{children}</div>;

// --- SVG Icons ---
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.99,36.566,44,30.836,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);


// --- Shared Components ---
const MessageModal = ({ title, message, onClose, open }: { title: string; message: string; onClose: () => void; open: boolean }) => (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle className="text-2xl">{title}</DialogTitle>
                <DialogDescription className="text-lg">{message}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={onClose} className="text-lg">OK</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

const PasswordInput = ({ id, value, onChange, placeholder }: { id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="relative w-full mb-4">
            <Input
                id={id}
                type={isVisible ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className="pr-12 !mb-0 text-2xl py-6"
            />
            <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                onClick={() => setIsVisible(!isVisible)}
            >
                {isVisible ? <EyeOff size={24} /> : <Eye size={24} />}
            </span>
        </div>
    );
};

// --- Auth Views ---
const LoginScreen = ({ setView, handleAuthAction, error }: { setView: (view: string) => void; handleAuthAction: (action: string, email: string, password?: string) => void; error: string }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        handleAuthAction('login', email, password);
    };

    return (
        <div className="bg-card text-card-foreground p-8 rounded-lg shadow-lg border">
            <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
            {error && <p className="text-red-500 text-lg text-center font-semibold mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <Input id="loginEmail" type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required className="text-2xl py-6" />
                <PasswordInput id="loginPassword" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" className="w-full text-xl py-6">Entrar</Button>
            </form>
            <Button onClick={() => handleAuthAction('google', '')} variant="outline" className="w-full mt-4 text-xl py-6">
                <GoogleIcon className="mr-2 w-6 h-6" />
                Entrar com Google
            </Button>
            <p className="text-lg mt-4 text-center">
                <button onClick={() => setView('forgot')} className="text-primary hover:underline">Esqueceu a senha?</button>
            </p>
            <p className="text-lg mt-2 text-center">
                Não tem uma conta? <button onClick={() => setView('register')} className="text-primary hover:underline">Registre-se</button>
            </p>
        </div>
    );
};

const RegisterScreen = ({ setView, handleAuthAction, error }: { setView: (view: string) => void; handleAuthAction: (action: string, email: string, password?: string, name?: string) => void; error: string }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        handleAuthAction('register', email, password, name);
    };

    return (
        <div className="bg-card text-card-foreground p-8 rounded-lg shadow-lg border">
            <h2 className="text-4xl font-bold mb-6 text-center">Registrar</h2>
            {error && <p className="text-red-500 text-lg text-center font-semibold mb-4">{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
                <Input id="registerName" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required className="text-2xl py-6" />
                <Input id="registerEmail" type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required className="text-2xl py-6" />
                <PasswordInput id="registerPassword" placeholder="Crie uma senha (mín. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" className="w-full text-xl py-6">Criar Conta</Button>
            </form>
            <p className="text-lg mt-4 text-center">
                Já tem uma conta? <button onClick={() => setView('login')} className="text-primary hover:underline">Faça login</button>
            </p>
        </div>
    );
};

const ForgotPasswordScreen = ({ setView, handleAuthAction, error }: { setView: (view: string) => void; handleAuthAction: (action: string, email: string) => void; error: string }) => {
    const [email, setEmail] = useState('');

    const handleForgot = (e: React.FormEvent) => {
        e.preventDefault();
        handleAuthAction('forgot', email);
    };

    return (
        <div className="bg-card text-card-foreground p-8 rounded-lg shadow-lg border">
            <h2 className="text-4xl font-bold mb-6 text-center">Recuperar Senha</h2>
            <p className="text-lg mb-4 text-center text-muted-foreground">Digite seu e-mail para receber um link de redefinição de senha.</p>
            {error && <p className="text-red-500 text-lg text-center font-semibold mb-4">{error}</p>}
            <form onSubmit={handleForgot} className="space-y-4">
                <Input id="resetEmail" type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required className="text-2xl py-6" />
                <Button type="submit" className="w-full text-xl py-6">Enviar Link</Button>
            </form>
            <p className="text-lg mt-4 text-center">
                <button onClick={() => setView('login')} className="text-primary hover:underline">Voltar ao Login</button>
            </p>
        </div>
    );
};

const ResetPasswordScreen = ({ handleAuthAction, error }: { handleAuthAction: (action: string, email: string | null, password?: string) => void; error: string }) => {
    const [password, setPassword] = useState('');

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        handleAuthAction('reset', null, password);
    };

    return (
        <div className="bg-card text-card-foreground p-8 rounded-lg shadow-lg border">
            <h2 className="text-4xl font-bold mb-6 text-center">Crie sua Nova Senha</h2>
            <p className="text-lg mb-4 text-center text-muted-foreground">Por favor, digite sua nova senha abaixo.</p>
            {error && <p className="text-red-500 text-lg text-center font-semibold mb-4">{error}</p>}
            <form onSubmit={handleReset} className="space-y-4">
                <PasswordInput id="newPassword" placeholder="Nova senha (mín. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" className="w-full text-xl py-6">Salvar Nova Senha</Button>
            </form>
        </div>
    );
};

// --- Main Component ---
export default function AuthForm() {
    const [view, setView] = useState('loading'); // loading, login, register, forgot, reset, memberArea, affiliateArea
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState('');
    const [passwordResetCode, setPasswordResetCode] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    const showMessageModal = (title: string, message: string) => {
        setModalContent({ title, message });
        setIsModalOpen(true);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const mode = params.get('mode');
        const oobCode = params.get('oobCode');

        if (mode === 'resetPassword' && oobCode) {
            verifyPasswordResetCode(auth, oobCode)
                .then(() => {
                    setPasswordResetCode(oobCode);
                    setView('reset');
                })
                .catch((err) => {
                    console.error('Password reset code verification error:', err);
                    setError('Link para redefinição de senha inválido ou expirado.');
                    setView('login');
                });
        } else {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    setUser(currentUser);
                    setView('memberArea');
                } else {
                    setUser(null);
                    setView('login');
                }
            });
            return () => unsubscribe();
        }
    }, []);

    const handleAuthAction = async (action: string, email: string | null, password?: string, name?: string) => {
        setError('');
        try {
            switch (action) {
                case 'login':
                    if (!email || !password) return;
                    await signInWithEmailAndPassword(auth, email, password);
                    break;
                case 'register':
                    if (!email || !password || !name) return;
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    await updateProfile(userCredential.user, { displayName: name });
                    showMessageModal('Sucesso!', 'Conta criada com sucesso! Você já pode fazer login.');
                    setView('login');
                    break;
                case 'google':
                    await signInWithPopup(auth, new GoogleAuthProvider());
                    break;
                case 'forgot':
                    if (!email) return;
                    await sendPasswordResetEmail(auth, email);
                    showMessageModal('Link Enviado', 'Verifique sua caixa de entrada para o link de redefinição de senha.');
                    break;
                case 'reset':
                    if (passwordResetCode && password) {
                        await confirmPasswordReset(auth, passwordResetCode, password);
                        showMessageModal('Sucesso!', 'Sua senha foi redefinida. Você pode fazer o login agora.');
                        setPasswordResetCode(null);
                        window.history.replaceState({}, document.title, window.location.pathname);
                        setView('login');
                    }
                    break;
                default:
                    break;
            }
        } catch (err: any) {
            console.error(`Auth action '${action}' failed:`, err);
            setError(err.message);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    const renderView = () => {
        switch (view) {
            case 'loading':
                return <p className="text-2xl">Carregando...</p>;
            case 'login':
                return <LoginScreen setView={setView} handleAuthAction={handleAuthAction} error={error} />;
            case 'register':
                return <RegisterScreen setView={setView} handleAuthAction={handleAuthAction} error={error} />;
            case 'forgot':
                return <ForgotPasswordScreen setView={setView} handleAuthAction={handleAuthAction} error={error} />;
            case 'reset':
                return <ResetPasswordScreen handleAuthAction={handleAuthAction} error={error} />;
            case 'memberArea':
                return <MemberArea user={user} handleLogout={handleLogout} setView={setView} showMessageModal={showMessageModal} />;
            case 'affiliateArea':
                return <AffiliateArea user={user} setView={setView} showMessageModal={showMessageModal} />;
            default:
                return <LoginScreen setView={setView} handleAuthAction={handleAuthAction} error={error} />;
        }
    };

    return (
        <ToastProvider>
            <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl">
                {renderView()}
                <MessageModal {...modalContent} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </ToastProvider>
    );
}

// --- Components auxiliares omitidos por brevidade - continuam no próximo arquivo ---
