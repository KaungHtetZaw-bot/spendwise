import { supabase } from "./supabase";
import { useUserStore } from "../store/useUserStore";
import { useConfirmationStore } from "../store/useConfirmationStore";
import { useToastStore } from "../store/useToastStore";
import { useTranslation } from "react-i18next";


export const checkBudgetStatus = async () => {
    const { profile } = useUserStore()
    const { openConfirm } = useConfirmationStore()
    const { t } = useTranslation()
    const { showToast } = useToastStore()
  if (!profile?.monthly_budget) return;

  // ၁။ Database သို့မဟုတ် Cache ကနေ Total Expense ကို ယူမယ်
  // (RPC သုံးတာက Edit လုပ်တဲ့အချိန်မှာ data ပိုတိကျပါတယ်)
  const { data: totalSpent } = await supabase.rpc('get_monthly_total', { 
    input_user_id: profile.user_id
  });

  const usagePercent = (totalSpent / profile.monthly_budget) * 100;

  // ၂။ Logic အရ Alert ထုတ်မယ်
  if (usagePercent >= 100) {
    openConfirm({
      title: t('budget.exceeded_title'),
      description: t('budget.exceeded_desc'),
      confirmText: t('common.got_it'),
      type: "danger",
      onConfirm: () => {}
    });
  } else if (usagePercent >= 80) {
    showToast('','warning')
  }
};