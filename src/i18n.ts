import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const getSavedLanguage = () => {
  try {
    const storage = localStorage.getItem('user-storage');
    if (storage) {
      const parsed = JSON.parse(storage);
      return parsed.state.language || 'en';
    }
  } catch (e) {
    return 'en';
  }
  return 'en';
};

const resources = {
  en: {
    translation: {
      "greeting": "Hello,",
      "search_placeholder": "Search by note or category...",
      "statistics": "Statistics",
      "recent_history": "Recent History",
      "no_transactions": "No transactions yet.",
      ////
      "not_found_title": "Page Not Found",
      "not_found_desc": "The page you are looking for doesn't exist or has been moved to another dimension.",
      "back_home": "Back to Home",
      "go_back": "Go Previous",
      "sign_out": "Sign Out",
      
      ////
      "personal": "Personal Preference",
      "notifications": "Notifications",
      "budget": "Monthly Budget",
      "update_budget": "Update Budget",
      "language": "Language",
      "currency": "Currency",
      "settings": "Settings",
      "income": "Income",
      "expense": "Expense",
      "account_settings": "Account Setting",
      "security_app": "Security & App",
      "weekly_activity": "Weekly Activity",
      "nav": {
        "home": "Home",
        "history": "History",
        "stats": "Stats",
        "settings": "Settings"
      },
      "privacy": {
        "title": "Privacy Policy",
        "close": "Close",
        "section1_title": "1. Data Collection",
        "section1_desc": "We collect your email and transaction data solely to provide expense tracking services. Your data is stored securely via Supabase.",
        "section2_title": "2. Data Security",
        "section2_desc": "All data is encrypted and we do not share your personal information with third parties.",
      },
      "account": {
        "title": "Account Settings",
        "name_label": "Display Name",
        "job_label": "Job Title / Role",
        "save": "Save Changes",
        "saving": "Saving Changes...",
        "danger_zone": "Danger Zone",
        "delete": "Delete Account & Data",
        "success": "Profile updated!",
        "job_placeholder": "Developer, Student, etc.",
        "name_placeholder": "Your Name"
      },
      "time": {
        "today": "Today",
        "week": "This Week",
        "month": "This Month",
        "year": "This Year",
        "custom": "Custom"
      },
      "stats": {
        "total_income": "Total Income",
        "total_expense": "Total Expense",
        "total_balance": "Total",
        "total_net": "Net Balance",
        "spending_breakdown": "Spending Breakdown",
        "no_data": "No data available"
      },
      "inputs": {
        "amount_label": "Amount",
        "amount_placeholder": "Enter amount",
        "note_label": "Note",
        "note_placeholder": "What was this for?",
        "currency_unit": "Ks."
      }
    }
  },
  mm: {
  translation: {
      "greeting": "မင်္ဂလာပါ၊",
      "search_placeholder": "မှတ်စု သို့မဟုတ် အမျိုးအစားဖြင့် ရှာဖွေရန်...",
      "statistics": "စာရင်းအင်း အချက်အလက်",
      "recent_history": "လတ်တလော မှတ်တမ်း",
      "no_transactions": "မှတ်တမ်း မရှိသေးပါ။",
      ////
      "not_found_title": "စာမျက်နှာ ရှာမတွေ့ပါ",
      "not_found_desc": "သင်ရှာနေသော စာမျက်နှာ မရှိပါ သို့မဟုတ် အခြားတစ်နေရာသို့ ရောက်ရှိနေပါသည်။",
      "back_home": "ပင်မစာမျက်နှာသို့",
      "go_back": "နောက်သို့ပြန်သွားရန်",
      "sign_out":"ထွက်ရန်",
      ////
      "personal": "ကိုယ်ရေးကိုယ်တာ ဦးစားပေး",
      "notifications": "အသိပေးချက်များ",
      "budget": "လစဉ် အသုံးစရိတ်",
      "update_budget": "ပမာဏ ပြင်ဆင်ရန်",
      "language": "ဘာသာစကား",
      "currency": "ငွေကြေး",
      "settings": "ဆက်တင်များ",
      "income": "ဝင်ငွေ",
      "expense": "ထွက်ငွေ",
      "account_settings": "အကောင့် ဆက်တင်",
      "security_app": "လုံခြုံရေးနှင့် အက်ပ်ဆက်တင်",
      "weekly_activity": "အပတ်စဉ် လှုပ်ရှားမှု",
      "nav": {
        "home": "ပင်မ",
        "history": "မှတ်တမ်း",
        "stats": "စာရင်း",
        "settings": "ဆက်တင်"
      },
      "privacy": {
        "title": "ကိုယ်ရေးအချက်အလက် မူဝါဒ",
        "close": "ပိတ်ရန်",
        "section1_title": "၁။ အချက်အလက် စုဆောင်းခြင်း",
        "section1_desc": "သင်၏ အီးမေးလ်နှင့် ငွေစာရင်းမှတ်တမ်းများကို ဝန်ဆောင်မှုပေးရန်အတွက်သာ စုဆောင်းပါသည်။ သင်၏ အချက်အလက်များကို Supabase တွင် လုံခြုံစွာ သိမ်းဆည်းထားပါသည်။",
        "section2_title": "၂။ အချက်အလက် လုံခြုံရေး",
        "section2_desc": "အချက်အလက်အားလုံးကို ကုဒ်စနစ်ဖြင့် လုံခြုံအောင် ပြုလုပ်ထားပြီး ပြင်ပအဖွဲ့အစည်းများထံ မည်သည့်အခါမျှ မျှဝေမည်မဟုတ်ပါ။",
      },

      "account": {
        "title": "အကောင့် ဆက်တင်",
        "name_label": "အမည်",
        "job_label": "အလုပ်အကိုင် / ရာထူး",
        "save": "ပြင်ဆင်မှုများ သိမ်းဆည်းရန်",
        "saving": "သိမ်းဆည်းနေပါသည်...",
        "danger_zone": "အန္တရာယ်ရှိ နယ်မြေ",
        "delete": "အကောင့်နှင့် အချက်အလက်များ ဖျက်ရန်",
        "success": "ပရိုဖိုင် ပြင်ဆင်ပြီးပါပြီ။",
        "job_placeholder": "Developer ၊ ကျောင်းသား စသဖြင့်...",
        "name_placeholder": "သင့်အမည်"
      },
      "time": {
        "today": "ယနေ့",
        "week": "ယခုအပတ်",
        "month": "ယခုလ",
        "year": "ယခုနှစ်",
        "custom": "စိတ်ကြိုက်"
      },
      "stats": {
        "total_income": "စုစုပေါင်း ဝင်ငွေ",
        "total_expense": "စုစုပေါင်း ထွက်ငွေ",
        "total_balance": "ထွက်ငွေ စုစုပေါင်း",
        "total_net": "စုစုပေါင်း ကျန်ငွေ",
        "spending_breakdown": "သုံးစွဲမှု အမျိုးအစားများ",
        "no_data": "အချက်အလက် မရှိသေးပါ"
      },
      "inputs": {
        "amount_label": "ပမာဏ",
        "amount_placeholder": "ပမာဏ ထည့်ပါ",
        "note_label": "မှတ်စု",
        "note_placeholder": "အကြောင်းအရာ ရေးသားပါ",
        "currency_unit": "ကျပ်"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;