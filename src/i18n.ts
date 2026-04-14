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
      "no_transactions_found": "No Transactions Found",
      "monthly_income": "Monthly Income",
      "budget_limit": "Budget Limit",
      "spending_progress": "Spending Progress",
      "update_income": "Update Income",
      "spent": "Spent",
      "remaining": "Remaining",
      "over_limit_warning": "Limit Exceeded!",
      "budget_warning": "Approaching Limit",
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
      "landing": {
        "login": "Login",
        "get_started": "Get Started",
        "smart_tracking": "Smart Finance Tracking",
        "hero_title_1": "Take Control of Your",
        "hero_title_2": "Financial Future.",
        "hero_desc": "The best way to track your daily expenses and save money systematically. Simple, Secure, and Automated.",
        "start_trial": "Start Free Trial",
        "secure_title": "Secure Data",
        "secure_desc": "Your data is always safe with our Supabase integration.",
        "insights_title": "Visual Insights",
        "insights_desc": "Clearly see where your money is going with charts and graphs.",
        "budget_title": "Monthly Budget",
        "budget_desc": "Set monthly budgets and stay in control of your spending."
      },
      "auth": {
        "login_tab": "Login",
        "register_tab": "Register",
        "welcome_back": "Welcome Back!",
        "create_account": "Create Account",
        "final_steps": "Final Steps",
        "login_desc": "Enter your details to sign in.",
        "register_desc": "Let’s start with basics.",
        "final_desc": "Tell us a bit about yourself.",
        "full_name": "Full Name",
        "email": "Email Address",
        "password": "Password",
        "career": "Your Career",
        "income": "Monthly Income",
        "upload_photo": "Upload Photo",
        "back": "Back",
        "sign_in": "Sign In",
        "continue": "Continue",
        "complete_setup": "Complete Setup",
        "processing": "Processing..."
      },
      "inputs": {
        "amount_label": "Amount",
        "amount_placeholder": "Enter amount",
        "note_label": "Note",
        "note_placeholder": "What was this for?",
        "currency_unit": "Ks."
      },

      "actions": {
        "add_transaction": "Add Transaction",
        "update_transaction": "Update Transaction",
        "saving": "Saving...",
        "transaction_actions": "Transaction Actions",
        "edit": "Edit",
        "delete": "Delete",
        "cancel": "Cancel",
        "confirm": "Confirm",
      },
      
      "success": {
        "login_success": "Login successful!",
        "register_success": "Registered successfully!",
        "added": "Transaction added successfully!",
        "updated": "Profile updated!",
        "transaction_updated": "Transaction updated!",
        "deleted": "Deleted successfully",
        "saved": "Saved!"
      },
      "errors": {
        "invalid_credentials": "Invalid email or password.",
        "user_exists": "An account with this email already exists.",
        "weak_password": "Password should be at least 6 characters.",
        "general_auth_error": "Authentication failed. Please try again.",
        "network_error": "Network error. Please check your connection.",
        "required_fields": "Please fill all required fields before saving.",
        "update_failed": "Update failed. Please try again.",
        "add_failed": "Failed to add transaction.",
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
      "no_transactions_found": "မှတ်တမ်းများ ရှာမတွေ့ပါ",
      "monthly_income": "လစဉ်ဝင်ငွေ",
      "budget_limit": "သုံးစွဲမှု ကန့်သတ်ချက်",
      "spending_progress": "သုံးစွဲမှု အခြေအနေ",
      "update_income": "ဝင်ငွေ ပြင်ဆင်ရန်",
      "spent": "သုံးပြီး",
      "remaining": "ကျန်ရှိ",
      "over_limit_warning": "ကန့်သတ်ချက်ထက် ကျော်လွန်နေသည်!",
      "budget_warning": "ကန့်သတ်ချက် နီးကပ်နေသည်",
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
      "landing": {
        "login": "ဝင်ရန်",
        "get_started": "စတင်မည်",
        "smart_tracking": "စမတ်ကျသော ငွေကြေးစီမံမှု",
        "hero_title_1": "သင့်ရဲ့ ငွေကြေးအနာဂတ်ကို",
        "hero_title_2": "စိတ်ကြိုက် ထိန်းချုပ်လိုက်ပါ။",
        "hero_desc": "မင်းရဲ့ နေ့စဉ်အသုံးစရိတ်တွေကို စနစ်တကျ မှတ်သားပြီး ငွေစုဆောင်းနိုင်မယ့် နည်းလမ်းကောင်း။ ရိုးရှင်း၊ လုံခြုံပြီး အလိုအလျောက် လုပ်ဆောင်ပေးမှာပါ။",
        "start_trial": "အခမဲ့ စတင်သုံးစွဲရန်",
        "secure_title": "လုံခြုံစိတ်ချရမှု",
        "secure_desc": "Supabase နဲ့ ချိတ်ဆက်ထားလို့ မင်းရဲ့ data တွေက အမြဲတမ်း လုံခြုံနေမှာပါ။",
        "insights_title": "မြင်သာသော အချက်အလက်များ",
        "insights_desc": "Chart တွေ၊ Graph တွေနဲ့ မင်းငွေ ဘယ်ကိုရောက်နေလဲဆိုတာ ရှင်းရှင်းလင်းလင်း သိနိုင်မယ်။",
        "budget_title": "လစဉ် အသုံးစရိတ်",
        "budget_desc": "လအလိုက် Budget သတ်မှတ်ပြီး ပိုမသုံးမိအောင် ထိန်းချုပ်လိုက်ပါ။"
      },
      "auth": {
        "login_tab": "ဝင်မည်",
        "register_tab": "အကောင့်သစ်ဖွင့်မည်",
        "welcome_back": "ပြန်လည်ကြိုဆိုပါတယ်!",
        "create_account": "အကောင့်အသစ်ပြုလုပ်ရန်",
        "final_steps": "နောက်ဆုံးအဆင့်",
        "login_desc": "အချက်အလက်များဖြည့်သွင်းပြီး ဝင်ရောက်ပါ။",
        "register_desc": "အခြေခံအချက်အလက်များမှ စတင်ရအောင်။",
        "final_desc": "သင့်အကြောင်း အနည်းငယ် သိပါရစေ။",
        "full_name": "အမည်အပြည့်အစုံ",
        "email": "အီးမေးလ် လိပ်စာ",
        "password": "စကားဝှက်",
        "career": "အလုပ်အကိုင်",
        "income": "လစဉ်ဝင်ငွေ (ကျပ်)",
        "upload_photo": "ဓာတ်ပုံတင်ရန်",
        "back": "နောက်သို့",
        "sign_in": "ဝင်ရောက်မည်",
        "continue": "ဆက်သွားရန်",
        "complete_setup": "အပြီးသတ်မည်",
        "processing": "လုပ်ဆောင်နေပါသည်..."
      },
      "inputs": {
        "amount_label": "ပမာဏ",
        "amount_placeholder": "ပမာဏ ထည့်ပါ",
        "note_label": "မှတ်စု",
        "note_placeholder": "အကြောင်းအရာ ရေးသားပါ",
        "currency_unit": "ကျပ်"
      },
      "actions": {
        "add_transaction": "စာရင်းသွင်းရန်",
        "update_transaction": "စာရင်းပြင်ဆင်ရန်",
        "saving": "သိမ်းဆည်းနေသည်...",
        "edit": "ပြင်ဆင်ရန်",
        "delete": "ဖျက်ရန်",
        "cancel": "မလုပ်တော့ပါ",
        "confirm": "သေချာသည်",
        "transaction_actions": "လုပ်ဆောင်ချက်များ"

      },
      "success": {
        "login_success": "ဝင်ရောက်မှု အောင်မြင်ပါသည်။",
        "register_success": "အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်။",
        "added": "စာရင်းသွင်းမှု အောင်မြင်ပါသည်။",
        "updated": "ပရိုဖိုင် ပြင်ဆင်ပြီးပါပြီ။",
        "transaction_updated": "စာရင်းပြင်ဆင်မှု အောင်မြင်ပါသည်။",
        "deleted": "ဖျက်သိမ်းမှု အောင်မြင်ပါသည်။",
        "saved": "သိမ်းဆည်းပြီးပါပြီ။"
      },
      "errors": {
        "invalid_credentials": "အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်။",
        "user_exists": "ဤအီးမေးလ်ဖြင့် အကောင့်ဖွင့်ထားပြီးသား ဖြစ်နေပါသည်။",
        "weak_password": "စကားဝှက်သည် အနည်းဆုံး စာလုံး ၆ လုံးရှိရပါမည်။",
        "general_auth_error": "လုပ်ဆောင်မှု မအောင်မြင်ပါ။ ထပ်မံကြိုးစားကြည့်ပါ။",
        "network_error": "အင်တာနက်ချိတ်ဆက်မှု မရှိပါ။ ပြန်လည်စစ်ဆေးပေးပါ။",
        "update_failed": "ပြင်ဆင်ရန် အဆင်မပြေပါ။ ထပ်မံကြိုးစားကြည့်ပါ။",
        "add_failed": "စာရင်းသွင်းရန် အဆင်မပြေပါ။",
        "required_fields": "မသိမ်းဆည်းမီ လိုအပ်သော အချက်အလက်များ အားလုံးကို ဖြည့်စွက်ပေးပါ။"
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