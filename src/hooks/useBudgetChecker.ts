import { supabase } from "../lib/supabase";
import { useUserStore } from "../store/useUserStore";
import { useConfirmationStore } from "../store/useConfirmationStore";
import { useToastStore } from "../store/useToastStore";
import { useTranslation } from "react-i18next";

export const useBudgetChecker = () => {
  const { profile, isNotifyEnabled} = useUserStore();
  const { openConfirm } = useConfirmationStore();
  const { showToast } = useToastStore();
  const { t } = useTranslation();

  const checkBudget = async () => {
    if (!isNotifyEnabled || !profile?.monthly_budget) return;

    const { data: totalSpent, error } = await supabase.rpc('get_monthly_total', { 
      input_user_id: profile?.user_id 
    });

    if (error) {
        console.error("Budget check error:", error);
        return;
    }

    const usagePercent = (totalSpent / profile.monthly_budget) * 100;

    if (usagePercent >= 100) {
      openConfirm({
        title: t('budgetPage.exceeded_title'),
        description: t('budgetPage.exceeded_desc'),
        confirmText: t('common.got_it'),
        type: "danger",
        onConfirm: () => {}
      });
    } else if (usagePercent >= 80) {
      showToast(`${t('budget.warning_80')} (${Math.round(usagePercent)}%)`, 'warning');
    }
  };

  return { checkBudget };
};