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

// --- FAQ Help Modal ---
const FaqHelpModal = ({ open, onOpenChange, getValues }: { open: boolean; onOpenChange: (open: boolean) => void; getValues: any }) => {
    const { toast } = useToast();
    const niche = getValues("nichoTrabalho") || '[Nicho de Trabalho]';
    const companyName = getValues("nomeEmpresa") || '[Nome da Empresa]';
    const services = getValues("services")?.map((s: any) => s.titulo).join(', ') || '[Liste seus serviços aqui]';
    const tone = getValues("tomConversa") || '[Informe o Tom de Voz, ex: "amigável e profissional"]';

    const promptText = `Aja como um especialista em atendimento ao cliente para o seguinte negócio: uma empresa de ${niche}, chamada ${companyName}. Meu público-alvo é [Descreva seu público aqui].

Crie uma lista de 20 perguntas frequentes (FAQs) que um cliente em potencial faria sobre meus serviços, que são: ${services}.

Para cada pergunta, forneça uma resposta clara e persuasiva, usando um tom de voz ${tone}. As respostas devem quebrar objeções comuns e ressaltar os benefícios dos meus serviços.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(promptText);
        toast({
            title: "Copiado!",
            description: "O prompt foi copiado para sua área de transferência.",
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl text-center">Dica de Mestre para um FAQ Poderoso</DialogTitle>
                    <DialogDescription className="text-center text-lg px-4">
                        Um bom FAQ antecipa as dúvidas e deixa seu cliente mais seguro para comprar. Use a IA a seu favor!
                        Abaixo está um prompt (comando) que você pode usar no ChatGPT ou outra IA para gerar ótimas perguntas e respostas.
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4">
                    <h4 className="text-xl font-semibold mb-2">Prompt para IA:</h4>
                    <div className="p-4 bg-muted rounded-md text-base text-muted-foreground whitespace-pre-wrap font-code">
                        {promptText}
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={() => onOpenChange(false)} variant="secondary" className="text-lg">Fechar</Button>
                    <Button type="button" onClick={handleCopy} className="text-lg">Copiar Prompt</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


// --- Form Schema ---
const FormSchema = z.object({
    nomeCompleto: z.string().min(3, "Nome completo é obrigatório"),
    emailConta: z.string().email("Email inválido"),
    dataNascimento: z.string().refine(val => val.replace(/\D/g, '').length === 8, { message: "Data de nascimento é obrigatória e deve ter 8 dígitos." }),
    whatsapp: z.string().refine(val => val.replace(/\D/g, '').length === 11, { message: "WhatsApp é obrigatório e deve ter 11 dígitos." }),
    nomeEmpresa: z.string().min(2, "Nome da empresa é obrigatório"),
    cnpjCpf: z.string().refine(val => {
        const cleaned = val?.replace(/\D/g, '');
        return !cleaned || cleaned.length === 11 || cleaned.length === 14;
    }, { message: "Deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos)." }).optional(),
    fotoPerfilUrl: z.string().url("URL inválida").optional().or(z.literal('')),
    cep: z.string().refine(val => val.replace(/\D/g, '').length === 8, { message: "CEP é obrigatório e deve ter 8 dígitos." }),
    rua: z.string().min(2, "Rua é obrigatória"),
    numero: z.string().min(1, "Número é obrigatório"),
    complemento: z.string().optional(),
    bairro: z.string().min(2, "Bairro é obrigatório"),
    cidade: z.string().min(2, "Cidade é obrigatória"),
    estadoUf: z.string().length(2, "UF deve ter 2 caracteres"),
    instagramPessoal: z.string().optional(),
    instagramProfissional: z.string().optional(),
    linkedin: z.string().optional(),
    tiktok: z.string().optional(),
    horarioFuncionamento: z.string().min(5, "Horário de funcionamento é obrigatório"),
    linkAgendamento: z.string().url("URL inválida").optional().or(z.literal('')),
    formasPagamento: z.string().min(3, "Formas de pagamento são obrigatórias"),
    nichoTrabalho: z.string().min(3, "Nicho de trabalho é obrigatório"),
    nomeAtendenteVirtual: z.string().optional(),
    tomConversa: z.string({ required_error: "Tom de conversa é obrigatório" }).min(1, "Tom de conversa é obrigatório"),
    humorConversa: z.string({ required_error: "Humor da conversa é obrigatório" }).min(1, "Humor da conversa é obrigatório"),
    saudacaoPreferida: z.string().min(5, "Saudação é obrigatória"),
    services: z.array(z.object({
        titulo: z.string().min(1, "Título do serviço é obrigatório"),
        descricao: z.string().min(1, "Descrição do serviço é obrigatória"),
    })).optional(),
    faqs: z.array(z.object({
        pergunta: z.string().optional(),
        resposta: z.string().optional(),
    })).optional(),
    palavrasChaveNegativas: z.string().optional(),
    indicacoes: z.array(z.object({
        nome: z.string().optional(),
        whatsapp: z.string().optional().refine(val => !val || val.replace(/\D/g, '').length === 11, { message: "WhatsApp inválido" }),
    })).optional(),
    lastCompletedStep: z.number().optional(),
    status: z.string().optional(),
    finalizadoEm: z.string().optional(),
});

const FormInput = ({ name, label, placeholder, ...props }: { name: keyof z.infer<typeof FormSchema>; label: string; placeholder: string;[key: string]: any }) => {
    const { control, formState: { errors } } = useFormContext();
    const error = errors[name];

    return (
        <div className="mb-4">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input id={name} placeholder={placeholder} {...field} {...props} value={field.value || ''} className="text-2xl py-6" />
                )}
            />
            {error && <p className="text-red-500 text-sm mt-1">{String(error.message)}</p>}
        </div>
    );
};

const FormMaskedInput = ({ name, label, placeholder, ...props }: { name: keyof z.infer<typeof FormSchema>; label: string; placeholder: string;[key: string]: any }) => {
    const { control, formState: { errors } } = useFormContext();
    const error = errors[name];

    return (
        <div className="mb-4">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <IMaskInput
                        {...field}
                        {...props}
                        unmask={true}
                        placeholder={placeholder}
                        value={field.value || ''}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            "text-2xl py-6"
                        )}
                    />
                )}
            />
            {error && <p className="text-red-500 text-sm mt-1">{String(error.message)}</p>}
        </div>
    );
};

const FormTextarea = ({ name, label, placeholder, ...props }: { name: keyof z.infer<typeof FormSchema>; label: string; placeholder: string;[key: string]: any }) => {
    const { control, formState: { errors } = {} } = useFormContext();
    const error = errors?.[name];

    return (
        <div className="mb-4">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Textarea id={name} placeholder={placeholder} {...field} {...props} value={field.value || ''} className="text-2xl" />
                )}
            />
            {error && <p className="text-red-500 text-sm mt-1">{String(error.message)}</p>}
        </div>
    );
};


const FormSelect = ({ name, label, placeholder, children }: { name: keyof z.infer<typeof FormSchema>; label: string; placeholder: string; children: React.ReactNode }) => {
    const { control, formState: { errors } } = useFormContext();
    const error = errors[name];

    return (
        <div className="mb-4">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="relative">
                        <select
                            id={name}
                            value={field.value || ""}
                            onChange={field.onChange}
                            className="form-select w-full text-2xl py-6 px-3 rounded-md border border-input bg-background text-foreground"
                        >
                            <option value="" disabled>{placeholder}</option>
                            {children}
                        </select>
                    </div>
                )}
            />
            {error && <p className="text-red-500 text-sm mt-1">{String(error.message)}</p>}
        </div>
    );
};

const MemoizedFormStep = memo(function FormStep({ children, onNext, onPrev, isFirst = false, isLast = false }: { children: React.ReactNode; onNext: () => void; onPrev?: () => void; isFirst?: boolean; isLast?: boolean }) {
    return (
        <div className="space-y-4">
            {children}
            <div className="flex justify-between mt-6">
                {!isFirst && onPrev ? <Button type="button" onClick={onPrev} variant="secondary" className="text-xl py-6 px-8">Anterior</Button> : <div />}
                {!isLast && <Button type="button" onClick={onNext} className="text-xl py-6 px-8">Próximo</Button>}
                {isLast && <Button type="button" onClick={onNext} className="text-xl py-6 px-8">Revisar e Finalizar</Button>}
            </div>
        </div>
    );
});


const MemberArea = ({ user, handleLogout, setView, showMessageModal }: { user: User | null; handleLogout: () => void; setView: (view: string) => void; showMessageModal: (title: string, message: string) => void }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [isFaqHelpModalOpen, setIsFaqHelpModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const appIdName = auth?.app?.options?.projectId;
    const totalSteps = 10;

    const methods = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            services: [],
            faqs: [],
            indicacoes: [{}, {}, {}],
            status: 'incompleto',
        },
        mode: "onChange"
    });

    const { control, watch, setValue, getValues, trigger, formState: { errors } } = methods;

    const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({ control, name: "services" });
    const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({ control, name: "faqs" });
    const { fields: indicacaoFields } = useFieldArray({ control, name: "indicacoes" });

    const profilePicUrlWatcher = watch('fotoPerfilUrl');
    const formData = watch();


    useEffect(() => {
        const loadData = async () => {
            if (!user || !appIdName) return;
            setIsLoading(true);
            const docRef = doc(db, `artifacts/${appIdName}/users/${user.uid}/chatbotForm/data`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                Object.keys(data).forEach(key => {
                    setValue(key as keyof z.infer<typeof FormSchema>, data[key]);
                });

                if (!data.services || data.services.length === 0) {
                    appendService({ titulo: '', descricao: '' });
                }

                if (!data.faqs || data.faqs.length === 0) {
                    appendFaq({ pergunta: '', resposta: '' });
                }

                if (data.status === 'finalizado') {
                    setCurrentStep(totalSteps + 2);
                } else {
                    setCurrentStep(data.lastCompletedStep ? Math.min(data.lastCompletedStep + 1, totalSteps) : 1);
                }
            } else {
                setValue("emailConta", user.email || "");
                setValue("nomeCompleto", user.displayName || "");
                appendService({ titulo: '', descricao: '' });
                appendFaq({ pergunta: '', resposta: '' });
                setCurrentStep(1);
            }
            setIsLoading(false);
        };
        loadData();
    }, [user, appIdName, setValue, appendService, appendFaq, totalSteps]);


    const saveStepData = useCallback(async () => {
        if (!user || !appIdName) return;
        const currentData = getValues();
        const dataToSave: { [key: string]: any } = {};

        for (const key in currentData) {
            const value = currentData[key as keyof typeof currentData];

            // Pular valores undefined ou null
            if (value === undefined || value === null) {
                continue;
            }

            // Pular strings vazias (exceto para campos opcionais)
            if (typeof value === 'string' && value.trim() === '' && key !== 'complemento' && key !== 'nomeAtendenteVirtual') {
                continue;
            }

            // Filtrar FAQs vazios
            if (key === 'faqs' && Array.isArray(value)) {
                const filteredFaqs = value.filter((faq: any) => {
                    const hasPergunta = faq?.pergunta && typeof faq.pergunta === 'string' && faq.pergunta.trim() !== '';
                    const hasResposta = faq?.resposta && typeof faq.resposta === 'string' && faq.resposta.trim() !== '';
                    return hasPergunta || hasResposta;
                });
                if (filteredFaqs.length > 0) {
                    dataToSave[key] = filteredFaqs;
                }
                continue;
            }

            // Filtrar serviços vazios
            if (key === 'services' && Array.isArray(value)) {
                const filteredServices = value.filter((service: any) => {
                    const hasTitulo = service?.titulo && typeof service.titulo === 'string' && service.titulo.trim() !== '';
                    const hasDescricao = service?.descricao && typeof service.descricao === 'string' && service.descricao.trim() !== '';
                    return hasTitulo || hasDescricao;
                });
                if (filteredServices.length > 0) {
                    dataToSave[key] = filteredServices;
                }
                continue;
            }

            // Filtrar indicações vazias
            if (key === 'indicacoes' && Array.isArray(value)) {
                const filteredIndicacoes = value.filter((indicacao: any) => {
                    const hasNome = indicacao?.nome && typeof indicacao.nome === 'string' && indicacao.nome.trim() !== '';
                    const hasWhatsapp = indicacao?.whatsapp && typeof indicacao.whatsapp === 'string' && indicacao.whatsapp.trim() !== '';
                    return hasNome || hasWhatsapp;
                });
                if (filteredIndicacoes.length > 0) {
                    dataToSave[key] = filteredIndicacoes;
                }
                continue;
            }

            dataToSave[key] = value;
        }

        const docRef = doc(db, `artifacts/${appIdName}/users/${user.uid}/chatbotForm/data`);
        await setDoc(docRef, dataToSave, { merge: true });
    }, [user, appIdName, getValues]);


    const getFieldsForStep = (step: number) => {
        switch (step) {
            case 1: return ["nomeCompleto", "emailConta", "dataNascimento", "whatsapp"];
            case 2: return ["nomeEmpresa", "cnpjCpf"];
            case 3: return ["cep", "rua", "numero", "bairro", "cidade", "estadoUf"];
            case 4: return ["instagramPessoal", "instagramProfissional", "linkedin", "tiktok"];
            case 5: return ["horarioFuncionamento", "formasPagamento", "nichoTrabalho"];
            case 6: return ["tomConversa", "humorConversa", "saudacaoPreferida"];
            case 7: return ["services"];
            case 8: return [];
            case 9: return ["palavrasChaveNegativas"];
            case 10: return ["indicacoes"];
            default: return [];
        }
    };

    const goToNextStep = useCallback(async () => {
        const fields = getFieldsForStep(currentStep) as (keyof z.infer<typeof FormSchema>)[];
        const isValid = await trigger(fields, { shouldFocus: true });

        if (!isValid) {
            showMessageModal("Campos Incompletos", "Por favor, preencha todos os campos obrigatórios antes de prosseguir.");
            return;
        }

        try {
            let currentStepData = { ...getValues(), lastCompletedStep: currentStep };

            if (currentStep === 2 && profilePicFile) {
                if (!user || !user.uid) {
                    showMessageModal("Erro de Autenticação", "Não foi possível verificar sua identidade. Por favor, tente recarregar a página.");
                    return;
                }
                setUploadStatus('Enviando...');
                const storageRef = ref(storage, `profile_pictures/${user.uid}/${profilePicFile.name}`);
                try {
                    await uploadBytes(storageRef, profilePicFile);
                    const url = await getDownloadURL(storageRef);
                    setValue('fotoPerfilUrl', url);
                    currentStepData.fotoPerfilUrl = url;
                    setUploadStatus('Envio com sucesso!');
                } catch (err: any) {
                    setUploadStatus('Erro no envio.');
                    console.error("Upload error:", err);
                    let errorMessage = "Não foi possível enviar sua imagem. Verifique sua conexão e o tamanho do arquivo.";
                    if (err.code === 'storage/unauthorized') {
                        errorMessage = "Você não tem permissão para enviar este arquivo. Por favor, recarregue a página e tente novamente.";
                    }
                    showMessageModal("Erro de Upload", errorMessage);
                    return;
                }
            }

            setValue("lastCompletedStep", currentStep);
            await saveStepData();

            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            } else {
                setCurrentStep(totalSteps + 1); // Go to review step
            }
        } catch (err) {
            console.error("Error in goToNextStep:", err);
            showMessageModal("Erro", "Ocorreu um erro ao salvar ou avançar. Tente novamente.");
        }
    }, [currentStep, profilePicFile, saveStepData, showMessageModal, user, trigger, getValues, setValue, totalSteps]);

    const goToPrevStep = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    const finalizeForm = useCallback(async () => {
        const finalData = { ...getValues(), status: 'finalizado', finalizadoEm: new Date().toISOString() };
        setValue('status', 'finalizado');
        setValue('finalizadoEm', finalData.finalizadoEm);
        await saveStepData();

        // Notifica o n8n que o formulário foi finalizado
        try {
            const webhookUrl = 'https://webhook.vempreender.com.br/webhook/chatbot-finalizado';
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?.uid,
                    appId: appIdName,
                    documentId: 'data',
                    oldStatus: 'incompleto',
                    newStatus: 'finalizado',
                    formData: JSON.parse(JSON.stringify(finalData))
                })
            });

            if (!response.ok) {
                console.error('Erro ao notificar n8n:', response.status);
            }
        } catch (error) {
            console.error('Erro ao chamar webhook:', error);
            // Não bloqueia o fluxo - usuário vê mensagem de sucesso mesmo se webhook falhar
        }

        setCurrentStep(totalSteps + 2); // Go to thank you step
    }, [getValues, saveStepData, setValue, totalSteps, user, appIdName]);


    const renderFormStep = () => {
        if (isLoading) return <p className="text-2xl">Carregando seus dados...</p>
        switch (currentStep) {
            case 1: return (
                <MemoizedFormStep key="step-1" onNext={goToNextStep} isFirst>
                    <h4 className="text-3xl font-semibold mb-4">1. Informações da Conta</h4>
                    <FormInput name="nomeCompleto" label="Nome Completo" placeholder="Nome Completo*" />
                    <FormInput name="emailConta" label="Email da Conta" placeholder="Email*" type="email" />
                    <FormMaskedInput name="dataNascimento" label="Data de Nascimento" placeholder="Data de Nascimento* (DD/MM/AAAA)" mask="00/00/0000" />
                    <FormMaskedInput name="whatsapp" label="WhatsApp" placeholder="WhatsApp* (00) 00000-0000" mask="(00) 00000-0000" />
                </MemoizedFormStep>
            );
            case 2: return (
                <MemoizedFormStep key="step-2" onPrev={goToPrevStep} onNext={goToNextStep}>
                    <h4 className="text-3xl font-semibold mb-4">2. Informações da Empresa</h4>
                    <FormInput name="nomeEmpresa" label="Nome da Empresa" placeholder="Nome da Empresa*" />
                    <FormMaskedInput
                        name="cnpjCpf"
                        label="CNPJ ou CPF"
                        placeholder="CNPJ ou CPF"
                        mask={[
                            { mask: '000.000.000-00' },
                            { mask: '00.000.000/0000-00' }
                        ]}
                    />

                    <label className="block text-xl font-medium mt-4 mb-2">Foto de Perfil / Logo (Opcional)</label>
                    <div className="cursor-pointer border-dashed border-2 border-border p-4 text-center rounded-lg hover:bg-muted" onClick={() => fileInputRef.current?.click()}>
                        <input type="file" ref={fileInputRef} id="profilePicInput" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setProfilePicFile(file);
                                setValue('fotoPerfilUrl', URL.createObjectURL(file));
                            }
                        }} />
                        <span id="fileName" className="text-lg">{profilePicFile?.name || 'Clique para escolher uma imagem'}</span>
                    </div>
                    {profilePicUrlWatcher && <img src={profilePicUrlWatcher} alt="Preview" width={150} height={150} className="rounded-full mx-auto mt-4 border-2 border-primary object-cover" />}
                    <p className="text-center font-bold text-primary text-xl">{uploadStatus}</p>
                </MemoizedFormStep>
            );
            case 3: return (
                <MemoizedFormStep key="step-3" onPrev={goToPrevStep} onNext={goToNextStep}>
                    <h4 className="text-3xl font-semibold mb-4">3. Endereço da Empresa</h4>
                    <FormMaskedInput name="cep" label="CEP" placeholder="CEP*" mask="00000-000" />
                    <FormInput name="rua" label="Rua" placeholder="Rua*" />
                    <FormInput name="numero" label="Número" placeholder="Número*" />
                    <FormInput name="complemento" label="Complemento" placeholder="Complemento" />
                    <FormInput name="bairro" label="Bairro" placeholder="Bairro*" />
                    <FormInput name="cidade" label="Cidade" placeholder="Cidade*" />
                    <FormInput name="estadoUf" label="Estado" placeholder="Estado (UF)*" maxLength={2} />
                </MemoizedFormStep>
            );
            case 4: return (
                <MemoizedFormStep key="step-4" onPrev={goToPrevStep} onNext={goToNextStep}>
                    <h4 className="text-3xl font-semibold mb-4">4. Redes Sociais (Opcional)</h4>
                    <FormInput name="instagramPessoal" label="Instagram Pessoal" placeholder="Instagram Pessoal" />
                    <FormInput name="instagramProfissional" label="Instagram Profissional" placeholder="Instagram Profissional" />
                    <FormInput name="linkedin" label="LinkedIn" placeholder="LinkedIn" />
                    <FormInput name="tiktok" label="TikTok" placeholder="TikTok" />
                </MemoizedFormStep>
            );
            case 5: return (
                <MemoizedFormStep key="step-5" onPrev={goToPrevStep} onNext={goToNextStep}>
                    <h4 className="text-3xl font-semibold mb-4">5. Detalhes do Negócio</h4>
                    <FormInput name="horarioFuncionamento" label="Horário de Funcionamento" placeholder="Horário de Funcionamento*" />
                    <FormInput name="linkAgendamento" label="Link de Agendamento" placeholder="Link de Agendamento (Opcional)" type="url" />
                    <FormInput name="formasPagamento" label="Formas de Pagamento" placeholder="Formas de Pagamento*" />
                    <FormInput name="nichoTrabalho" label="Nicho de Trabalho" placeholder="Nicho de Trabalho*" />
                </MemoizedFormStep>
            );
            case 6: return (
                <MemoizedFormStep key="step-6" onPrev={goToPrevStep} onNext={goToNextStep}>
                    <h4 className="text-3xl font-semibold mb-4">6. Personalidade do Chatbot</h4>
                    <FormInput name="nomeAtendenteVirtual" label="Nome do Atendente Virtual" placeholder="Nome do Atendente Virtual (Opcional)" />
                    <FormSelect name="tomConversa" label="Tom de Conversa" placeholder="Tom de Conversa*">
                        <option value="Formal">Formal</option>
                        <option value="Informal">Informal</option>
                        <option value="Amigavel">Amigável</option>
                        <option value="Neutro">Neutro</option>
                    </FormSelect>
                    <FormSelect name="humorConversa" label="Humor da Conversa" placeholder="Humor da Conversa*">
                        <option value="Serio">Sério</option>
                        <option value="Divertido">Divertido</option>
                        <option value="Equilibrado">Equilibrado</option>
                    </FormSelect>
                    <FormInput name="saudacaoPreferida" label="Exemplo de Saudação" placeholder="Exemplo de Saudação Preferida*" />
                </MemoizedFormStep>
            );
            case 7: return (
                <MemoizedFormStep key="step-7" onPrev={goToPrevStep} onNext={goToNextStep}>
                    <h4 className="text-3xl font-semibold mb-4">7. Serviços (Opcional, até 10)</h4>
                    {serviceFields.map((field, index) => (
                        <div key={field.id} className="service-item mb-4 p-4 rounded-lg border-2 border-border space-y-2">
                            <h5 className="font-semibold text-primary text-2xl">Serviço {index + 1}</h5>
                            <FormInput name={`services.${index}.titulo` as any} label="Título do Serviço" placeholder="Título do Serviço*" />
                            <FormTextarea name={`services.${index}.descricao` as any} label="Descrição do Serviço" placeholder="Descrição do Serviço*" />
                            <Button type="button" variant="destructive" size="sm" onClick={() => removeService(index)} className="text-lg">Remover</Button>
                        </div>
                    ))}
                    <Button type="button" variant="secondary" onClick={() => {
                        if (serviceFields.length < 10) appendService({ titulo: '', descricao: '' });
                        else showMessageModal("Limite Atingido", "Você pode adicionar no máximo 10 serviços.");
                    }} className="text-xl py-6">Adicionar Serviço</Button>
                </MemoizedFormStep>
            );
            case 8: return (
                <MemoizedFormStep key="step-8" onPrev={goToPrevStep} onNext={goToNextStep}>
                    <h4 className="text-3xl font-semibold mb-4">8. FAQs (Opcional, até 50)</h4>
                    <div className="bg-muted p-4 rounded-lg text-muted-foreground">
                        <h5 className="font-bold text-2xl">Informação Importante!</h5>
                        <ul className="list-disc list-inside text-xl space-y-2 mt-2">
                            <li>Adicione no mínimo 15 FAQs para um chatbot eficaz.</li>
                            <li>Seu progresso é salvo a cada etapa.</li>
                        </ul>
                    </div>
                    <Button type="button" onClick={() => setIsFaqHelpModalOpen(true)} className="w-full text-xl py-6 my-4">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Gerar FAQs com IA
                    </Button>
                    {faqFields.map((field, index) => (
                        <div key={field.id} className="faq-item mb-4 p-4 rounded-lg border-2 border-border space-y-2">
                            <h5 className="font-semibold text-primary text-2xl">FAQ {index + 1}</h5>
                            <FormInput name={`faqs.${index}.pergunta` as any} label="Pergunta" placeholder="Pergunta*" />
                            <FormTextarea name={`faqs.${index}.resposta` as any} label="Resposta" placeholder="Resposta*" />
                            <Button type="button" variant="destructive" size="sm" onClick={() => removeFaq(index)} className="text-lg">Remover</Button>
                        </div>
                    ))}
                    <Button type="button" variant="secondary" onClick={() => {
                        if (faqFields.length < 50) appendFaq({ pergunta: '', resposta: '' });
                        else showMessageModal("Limite Atingido", "Você pode adicionar no máximo 50 FAQs.");
                    }} className="text-xl py-6">Adicionar FAQ</Button>
                </MemoizedFormStep>
            );
            case 9: return (
                <MemoizedFormStep key="step-9" onPrev={goToPrevStep} onNext={goToNextStep}>
                    <h4 className="text-3xl font-semibold mb-4">9. Negativação de Palavras-Chave</h4>
                    <p className="text-muted-foreground text-xl">Liste palavras ou termos que seu chatbot DEVE EVITAR usar ou responder (separe por vírgula).</p>
                    <FormTextarea name="palavrasChaveNegativas" label="Palavras-Chave Negativas" placeholder="Ex: política, religião, xingamentos" rows={5} />
                </MemoizedFormStep>
            );
            case 10: return (
                <MemoizedFormStep key="step-10" onPrev={goToPrevStep} onNext={goToNextStep} isLast>
                    <h4 className="text-3xl font-semibold mb-4">10. Descontos por Indicação e Ação</h4>
                    <p className="text-muted-foreground text-xl">Garanta sua assinatura mensal de <strong className="text-primary">R$579,00 por apenas R$250,00!</strong> Para isso, preencha os dados de 3 contatos que também são empreendedores.</p>
                    <div className="space-y-4">
                        {indicacaoFields.map((field, index) => (
                            <div key={field.id} className="p-4 rounded-lg border-2 border-border space-y-2">
                                <h5 className="font-semibold text-primary text-2xl">Indicação {index + 1}</h5>
                                <FormInput name={`indicacoes.${index}.nome` as any} label="Nome" placeholder="Nome (Opcional)" />
                                <FormMaskedInput name={`indicacoes.${index}.whatsapp` as any} label="WhatsApp" placeholder="WhatsApp (Opcional)" mask="(00) 00000-0000" />
                            </div>
                        ))}
                    </div>
                    <p className="text-muted-foreground mt-6 text-xl">Garanta a implantação de <strong className="text-primary">R$800,00 por apenas R$400,00!</strong> Basta baixar nosso post e publicar nos Stories do seu Instagram marcando o <strong className="text-primary">@vempreender.ia</strong>.</p>
                    <Button type="button" onClick={() => {
                        const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Imagens%20LP%2FQR%20Vempreender.png?alt=media&token=7cb963a9-9c54-4d83-bcb5-d7b271f65c08';
                        window.open(imageUrl, '_blank');
                    }} className="text-xl py-6">Baixar Post para Stories</Button>
                    <p className="text-lg text-muted-foreground">(Ao clicar, o download será iniciado.)</p>
                </MemoizedFormStep>
            );
            case 11:
                return (
                    <div key="step-11">
                        <h4 className="text-3xl font-semibold mb-4">Revisão Final</h4>
                        <p className="mb-6 text-muted-foreground text-xl">Confira todos os seus dados. Se estiver tudo certo, clique em "Aprovar e Finalizar".</p>
                        <ReviewContent formData={formData} />
                        <div className="flex justify-between mt-6">
                            <Button type="button" onClick={() => setCurrentStep(1)} variant="secondary" className="text-xl py-6 px-8">Corrigir</Button>
                            <Button type="button" onClick={finalizeForm} className="text-xl py-6 px-8">Aprovar e Finalizar</Button>
                        </div>
                    </div>
                );
            case 12:
                return (
                    <div key="step-12" className="text-center">
                        <h4 className="text-4xl font-semibold mb-4">Obrigado!</h4>
                        <p className="text-2xl mb-6">Recebemos seus dados! Seu chatbot está sendo preparado e você receberá o link de acesso e as informações de pagamento em até 24 horas no seu e-mail e WhatsApp.</p>
                        <Button onClick={() => setCurrentStep(1)} className="text-xl py-6 px-8">Voltar para a Área de Membros</Button>
                    </div>
                );
            default: return <p className="text-2xl">Carregando etapa...</p>;
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="w-full bg-background p-8 rounded-lg shadow-lg border">
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(currentStep / (totalSteps + 1)) * 100}%` }}></div>
                        </div>
                        <div className="flex items-center ml-4">
                            <Button onClick={() => setView('affiliateArea')} variant="ghost" className="mr-2">Afiliados</Button>
                            <Button onClick={handleLogout} variant="destructive">Sair</Button>
                        </div>
                    </div>
                    {renderFormStep()}
                </div>
            </form>
            <FaqHelpModal open={isFaqHelpModalOpen} onOpenChange={setIsFaqHelpModalOpen} getValues={getValues} />
        </FormProvider>
    );
};


const AffiliateArea = ({ user, setView, showMessageModal }: { user: User | null; setView: (view: string) => void; showMessageModal: (title: string, message: string) => void }) => {
    const [affiliateLink, setAffiliateLink] = useState('');
    const [statusMessage, setStatusMessage] = useState('Verificando seu status de afiliado...');
    const appIdName = auth?.app?.options?.projectId;

    useEffect(() => {
        const checkAffiliateStatus = async () => {
            if (!user || !appIdName) return;
            const docRef = doc(db, `artifacts/${appIdName}/users/${user.uid}/affiliateProfile/data`);
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().affiliateCode) {
                    setAffiliateLink(`${window.location.protocol}//${window.location.host}/?ref=${docSnap.data().affiliateCode}`);
                    setStatusMessage('Você já é um afiliado! Compartilhe seu link exclusivo.');
                } else {
                    setStatusMessage('Você ainda não é um afiliado. Clique abaixo para gerar seu link.');
                }
            } catch (e) {
                console.error("Error checking affiliate status:", e);
                setStatusMessage("Erro ao verificar status de afiliado.");
            }

        };
        checkAffiliateStatus();
    }, [user, appIdName]);

    const generateAffiliateLink = async () => {
        if (!user || !appIdName) return;
        const newAffiliateCode = user.uid.substring(0, 8) + Math.random().toString(36).substring(2, 6);
        const docRef = doc(db, `artifacts/${appIdName}/users/${user.uid}/affiliateProfile/data`);
        try {
            await setDoc(docRef, { affiliateCode: newAffiliateCode, joinedAt: new Date() }, { merge: true });
            setAffiliateLink(`${window.location.protocol}//${window.location.host}/?ref=${newAffiliateCode}`);
            setStatusMessage('Você já é um afiliado! Compartilhe seu link exclusivo.');
            showMessageModal('Sucesso!', 'Parabéns, você agora é um afiliado!');
        } catch (e) {
            console.error('Error generating affiliate link:', e);
            showMessageModal('Erro', 'Não foi possível gerar seu link de afiliado.');
        }
    };

    const copyLink = () => {
        if (affiliateLink) {
            navigator.clipboard.writeText(affiliateLink)
                .then(() => showMessageModal("Sucesso", "Link de afiliado copiado!"))
                .catch(err => console.error('Erro ao copiar:', err));
        }
    };

    return (
        <div className="bg-card text-card-foreground p-8 rounded-lg shadow-lg border">
            <h2 className="text-4xl font-bold mb-6">Minha Área de Afiliado</h2>
            <div className="mb-6 text-left">
                <p className="mb-3 text-muted-foreground text-xl">{statusMessage}</p>
                {affiliateLink && (
                    <div className="flex items-center mt-2">
                        <Input value={affiliateLink} readOnly className="!mb-0 text-xl py-6" />
                        <Button onClick={copyLink} variant="secondary" className="whitespace-nowrap ml-2 text-xl py-6">Copiar</Button>
                    </div>
                )}
            </div>

            {!affiliateLink && (
                <Button onClick={generateAffiliateLink} className="w-full mb-8 text-xl py-6">Tornar-me Afiliado e Gerar Link</Button>
            )}

            <div className="mt-6 text-left">
                <h3 className="text-3xl font-semibold mb-3">Suas Estatísticas</h3>
                <p className="text-muted-foreground text-xl">Em breve, você poderá acompanhar aqui o desempenho do seu link de afiliado e seus ganhos.</p>
            </div>

            <Button onClick={() => setView('memberArea')} variant="secondary" className="mt-8 text-xl py-6">Voltar</Button>
        </div>
    );
};

const ReviewContent = ({ formData }: { formData: any }) => {
    const displayNames: { [key: string]: string } = {
        nomeCompleto: "Nome Completo", emailConta: "Email da Conta", dataNascimento: "Data de Nascimento", whatsapp: "WhatsApp (Conta)",
        nomeEmpresa: "Nome da Empresa", cnpjCpf: "CNPJ/CPF", fotoPerfilUrl: "Foto de Perfil",
        rua: "Rua", numero: "Número", complemento: "Complemento", bairro: "Bairro", cidade: "Cidade", estadoUf: "Estado (UF)", cep: "CEP",
        instagramPessoal: "Instagram Pessoal", instagramProfissional: "Instagram Profissional", linkedin: "LinkedIn", tiktok: "TikTok",
        horarioFuncionamento: "Horário de Funcionamento", linkAgendamento: "Link de Agendamento", formasPagamento: "Formas de Pagamento", nichoTrabalho: "Nicho de Trabalho",
        nomeAtendenteVirtual: "Nome do Atendente", tomConversa: "Tom de Conversa", humorConversa: "Humor", saudacaoPreferida: "Saudação",
        palavrasChaveNegativas: "Palavras Negativas", services: "Serviços", faqs: "FAQs", indicacoes: "Indicações"
    };

    return (
        <div id="reviewContent" className="text-left p-4 rounded-lg mb-6 space-y-4">
            {Object.entries(formData).map(([key, value]) => {
                if (!displayNames[key] || !value || (Array.isArray(value) && value.length === 0)) return null;

                const filteredValue = Array.isArray(value) ? value.filter(item => {
                    if (key === 'indicacoes') return item.nome || item.whatsapp;
                    if (key === 'services') return item.titulo || item.descricao;
                    if (key === 'faqs') return item.pergunta || item.resposta;
                    return true;
                }) : value;

                if (Array.isArray(filteredValue) && filteredValue.length === 0) return null;


                return (
                    <div key={key} className="py-2 border-b border-border">
                        <h5 className="text-3xl font-semibold text-primary">{displayNames[key]}</h5>
                        {Array.isArray(filteredValue) ? (
                            <ul className="list-none pl-2 mt-2 space-y-2">
                                {filteredValue.map((item: any, index: number) => (
                                    <li key={index} className="mt-2 p-2 rounded bg-muted text-xl">
                                        {key === 'services' && `Título: ${item.titulo} | Descrição: ${item.descricao}`}
                                        {key === 'faqs' && `P: ${item.pergunta} | R: ${item.resposta}`}
                                        {key === 'indicacoes' && `${item.nome || 'N/A'} - ${item.whatsapp || 'N/A'}`}
                                    </li>
                                ))}
                            </ul>
                        ) : key === 'fotoPerfilUrl' ? (
                            <img src={value as string} alt="Foto de Perfil" className="max-w-[100px] rounded-full mt-2" />
                        ) : (
                            <p className="text-xl pl-2">{String(value)}</p>
                        )}
                    </div>
                )
            })}
        </div>
    )
};
