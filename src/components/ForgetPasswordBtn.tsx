import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import { useToastStore } from '../store/useToastStore'
import ConfirmationModal from './ConfirmationModal'
import { useState } from 'react'

interface ForgetPasswordBtnProps {
    email?: string; // profile email လှမ်းပေးဖို့
    onClick?: () => void; // အကယ်၍ Modal မသုံးဘဲ အပြင်က logic သုံးချင်ရင် (ဥပမာ Auth Modal ဖွင့်ဖို့)
}

const ForgetPasswordBtn = ({ onClick, email }: ForgetPasswordBtnProps) => {
    const { t } = useTranslation()
    const { showToast } = useToastStore()
    const [showResetModal, setShowResetModal] = useState(false);
    const [isSendingLink, setIsSendingLink] = useState(false);

    // ခလုတ်နှိပ်လိုက်တဲ့အခါ လုပ်မယ့်အလုပ်
    const handleBtnClick = () => {
        if (onClick) {
            // အကယ်၍ အပြင်ကနေ Modal ဖွင့်ဖို့ logic ပေးထားရင် အဲဒါကို လုပ်မယ်
            onClick();
        } else {
            // ဘာမှမပေးထားရင် ဒီထဲက Confirmation Modal ကို ဖွင့်မယ်
            setShowResetModal(true);
        }
    };

    // Modal ထဲက Confirm နှိပ်မှ အလုပ်လုပ်မယ့် function
    const handlePasswordResetRequest = async () => {
        setIsSendingLink(true);
        try {
            // ၁။ User Email ကို အရင်ရှာမယ် (Prop ကမလာရင် လက်ရှိ login user ဆီကယူမယ်)
            let targetEmail = email;
            if (!targetEmail) {
                const { data: { user } } = await supabase.auth.getUser();
                targetEmail = user?.email;
            }

            if (!targetEmail) throw new Error("Email not found");

            // ၂။ Reset Link ပို့မယ်
            const { error } = await supabase.auth.resetPasswordForEmail(targetEmail, {
                redirectTo: `${window.location.origin}/auth?mode=reset_password`,
            });

            if (error) throw error;
            
            showToast(t('success.reset_link_sent') || 'Reset link sent to your email!', 'success');
            setShowResetModal(false);
        } catch (error: any) {
            showToast(error.message, 'danger');
        } finally {
            setIsSendingLink(false);
        }
    };

    return (
        <>
            <button 
                type="button"
                onClick={handleBtnClick}
                className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:underline ml-2 transition-all active:scale-95"
            >
                {t('auth.forgot_password_link')}
            </button>

            {/* Modal ကို ဒီထဲမှာပဲ တစ်ခါတည်း handle လုပ်ထားတယ် */}
            {!onClick && (
                <ConfirmationModal
                    isOpen={showResetModal}
                    onClose={() => setShowResetModal(false)}
                    onConfirm={handlePasswordResetRequest}
                    type="warning"
                    title="Reset Password?"
                    description={`We will send a secure password reset link to \n ${email || 'your email address'}`}
                    confirmText="Send Link"
                    isLoading={isSendingLink}
                />
            )}
        </>
    )
}

export default ForgetPasswordBtn