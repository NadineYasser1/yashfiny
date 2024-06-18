import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const translations = {
  en: {
    brand_name: 'Yashfiny',
    greeting: 'Hello',
    goodbye: 'Goodbye',
    other_lang: 'العربية',
    login_assistant: 'Login As Assistant',
    phone_numb_or_email: 'Email',
    password: 'Password',
    login: 'Login',
    forgot_pass: 'Forgot password',
    forgot_pass_ques: 'Forgot your password?',
    forgot_pass_text: 'Enter your email or phone number and we will send you a link to change your password.',
    dont_have_account_ques: "Don't have an account? ",
    signup: 'Sign Up',
    fname: "First Name",
    lname: "Last Name",
    email: "Email",
    signup_text: "You are one step closer to accessing your account...",
    have_account_ques: "Have an account? ",
    identification: "Identification",
    national_id_or_passport: "National ID or Passport Number",
    bdate: "Date Of Birth",
    confirm: 'Confirm',
    cancel: 'Cancel',
    male: 'Male',
    female: 'Female',
    gender: 'Gender',
    address: 'Address',
    address_placeholder: 'Street, Apartment Number, Floor Number',
    city: 'City',
    country: 'Country',
    phone: 'Phone',
    continue: 'Continue',
    pricing: 'Pricing',
    diseases_treated: 'Main Diseases Treated',
    will_you_handle_apts: 'Will you handle your own appointments?',
    yes: 'Yes',
    no_assistant_handles: 'No, My Assistant Will handle my appointments',
    select_type: 'Select Type',
    diseases: 'Diseases',
    one_last_step: 'One last step...',
    payment_method: 'Payment Method',
    select_payment_method: 'Select Payment Method',
    bank_account: 'Bank Account',
    instapay: 'InstaPay',
    phone_wallet: 'Phone Wallet',
    instapay_mail: 'InstaPay Email',
    phone_number: 'Phone Number',
    bank_acc_no: 'Bank Account Number',
    medical_license: 'Medical License',
    academic_deg: 'Academic Degree',
    certificates: 'Certificates',
    working_hours: 'Working Hours',
    upload_academic_deg: 'Upload Academic Degree',
    upload_medical_license: 'Upload Medical License',
    upload_certificates: 'Upload Certificates',
    examination: 'Examination',
    consultation: 'Consultation',
    clinic: 'Clinic',
    video: 'Video',
    add_working_hours: 'Add Working Hours',
    you_can_edit_workinghrs_txt: 'You can edit your availability anytime',
    done: 'Done',
    cancel: 'Cancel',
    no_time_slots_selected: "No time slots selected today.",
    time_slot_alert: 'Please add slot start and end time.',
    from: 'From',
    to: 'To',
    edit_slot: 'Edit Slot',
    update: 'Update',
    save: 'Save',
    day: 'Day',
    week: 'Week',
    month: 'Month',
    single: 'Single',
    group: 'Group',
    select_start_time: 'Add start time',
    select_end_time: 'Add end time',
    home: "Home",
    awaiting_approval_signup_text: 'Our moderator will check your data then you would be notified by Email once you have been approved',
    account_created: 'Account Created!',
    groups: 'Groups',
    articles: 'Articles',
    contact_us: 'Contact Us',
    messages: 'Messages',
    appointments: 'Appointments',
    patients: 'Patients',
    requests: 'Requests',
    calls: 'Calls',
    signout: 'Sign Out',
    yashfiny: 'Yashfiny',
    edit_profile: 'Edit Profile',
    search_home: 'Patient Name or Unique patient ID',
    create_new_patient: 'Create New Patient',
    recents: 'Recents',
    promotion: 'Promotion',
    assistants: 'Assistants',
    availability: 'Availability',
    monthly_earnings: 'Monthly Earnings',
    more_than_l_month: 'More than last month',
    upcoming_apts: 'Upcoming Appointments',
    view_all: 'View All',
    yrs: 'Yrs',
    id: 'ID',
    error: 'Error',
    new_patient: 'New Patient',
    full_name: 'Full Name',
    addr_placeholder: 'Home Address',
    disease: 'Disease',
    patient_history: 'Patient History',
    add: 'Add',
    disease_missing_alert: 'Please choose a disease first!',
    specialization: 'Specialization',
    subspeciality: 'subspeciality',
    no_new_msgs: 'You have no new messages from our system moderators.',
    see_more: 'See more',
    see_less: 'See less',
    contact_us_text: 'Write your message and Yashfiny’s team will get back to you.',
    send: 'Send',
    slot_type: 'Slot type',
    slot_location: 'Slot location',
    individual: 'Individual',
    select_location: 'Select location',
    modal_slot_alert: 'Please select slot type and location.',
    avail_alert_note: 'Please add, update and delete your available slots to the days of the current week only and the slots you add will be replicated for the whole month!',
    avail_alert_title: 'A note from us',
    coming_soon: 'Coming Soon!',
    coming_soon_alert_text: 'Our developers are working on this feature, please check back again later!',
    ok: 'OK',
    error: 'Error',
    error_selecting_doc: "An error occurred while selecting document. Please try again later.",
    all: 'All',
    no_upcoming_apts: 'You have no upcoming appointments...',
    attended: 'Attended',
    cancelled: 'Cancelled',
    no_income_for_chosen_filters: 'No income for chosen filters...',
    total: 'Total',
    add_more: 'Add more',
    type: 'Type',
    method: 'Method',
    cancel_alert_title: 'Cancel Appointment',
    cancel_alert_ques: 'Are you sure you want to cancel this appointment?',
    filter_by: 'Filter By',
    type: 'Type',
    location: 'Location',
    upcoming: 'Upcoming',
    visited: 'Visited',
    clear: 'Clear',
    apply: 'Apply',
    status: 'Status',
    video_requests: 'Video Requests',
    clinic_requests: 'Clinic Requests',
    special_requests: 'Special Requests',
    clinic_apt_reqs: 'Clinic Appointment Requests',
    video_apt_reqs: 'Video Appointment Requests',
    special_apt_reqs: 'Special Appointment Requests',
    symptoms: 'Symptoms',
    current_complaint: 'Current Complaint',
    accept: 'Accept',
    decline: 'Decline',
    income: 'Income',
    activities: 'Activities',
    promotions: 'Promotions',
    time_left_till_apt: 'Time left until appointment',
    hours: 'Hours',
    mins: 'Mins',
    start_appointment: 'Start Appointment',
    patient_details: 'Patient Details',
    not_my_speciality: 'I specialize in a different area of medicine. Consult with another specialist',
    slot_not_available: 'I am no longer available during the slot you have requested.',
    group_apts_reserved: 'Please note that group sessions are currently reserved for previous patients.',
    send_quick_message_instead: 'Do you want to send a quick message to the patient?',
    select_message: 'Select a message to send',
    no: 'No',
    yashfiny_asks_you: 'Yashfiny asks',
    years: 'Years',
    months: 'Months',
    days: 'Days',
    age: 'Age',
    co_history: 'CO & History',
    visits: 'Visits',
    ix: 'IX',
    rx: 'RX',
    chronic_disease: 'Chronic Disease',
    allergies: 'Allergies',
    no_history_to_show: 'No history to show.',
    morning: 'Morning',
    noon: 'Noon',
    evening: 'Evening',
    night: 'Night',
    add_new_drug: 'Add New Drug',
    add_drug: 'Add Drug',
    add_visit_results: 'Add Visit Results',
    diagnosis: 'Diagnosis',
    advices: 'Advices',
    summary: 'Summary',
    preliminary: 'Preliminary',
    final: 'Final',
    search_reqs: 'Search By Patient Name',
    name: 'Name',
    instructions: 'Instructions',
    dosage: 'Dosage',
    time: 'Time',
    days: 'Days',
    weeks: 'Weeks',
    months: 'Months',
    years: 'Years',
    drug_name: 'Drug Name',
    duration: 'Duration',
    success: 'Success',
    data_updated_successfully: 'Data updated successfully!',
    saved: "Saved!",
    drug_saved: 'Drug added successfully!'
  },
  ar: {
    login_assistant: 'تسجيل الدخول كمساعد ',
    brand_name: 'يشفيني',
    greeting: 'مرحبا',
    goodbye: 'مع السلامة',
    other_lang: 'English',
    yashfiny: 'يشفيني',
    phone_numb_or_email: "البريد الإلكتروني أو رقم الهاتف",
    password: "كلمة المرور",
    login: "تسجيل الدخول",
    forgot_pass: "نسيت كلمة المرور",
    forgot_pass_ques: "هل نسيت كلمة المرور؟",
    forgot_pass_text: "أدخل بريدك الإلكتروني أو رقم هاتفك وسنرسل لك رابطًا لتغيير كلمة المرور الخاصة بك.",
    dont_have_account_ques: "ليس لديك حساب؟ ",
    signup: "سجل",
    fname: "الاسم الأول",
    lname: "الاسم الأخير",
    email: "البريد الإلكتروني",
    signup_text: "أنت على بُعد خطوة واحدة من الوصول إلى حسابك...",
    have_account_ques: "هل لديك حساب؟ ",
    identification: "التعريف",
    national_id_or_passport: "الهوية الوطنية أو رقم جواز السفر",
    bdate: "تاريخ الميلاد",
    confirm: "تأكيد",
    cancel: "إلغاء",
    male: "ذكر",
    female: "أنثى",
    gender: "الجنس",
    address: "العنوان",
    address_placeholder: "الشارع، رقم الشقة، رقم الطابق",
    city: "المدينة",
    country: "البلد",
    phone: "الهاتف",
    continue: "متابعة",
    pricing: "التسعير",
    diseases_treated: "الأمراض الرئيسية المعالجة",
    will_you_handle_apts: "هل ستتعامل مع مواعيدك الخاصة؟",
    yes: "نعم",
    no_assistant_handles: "لا، سيتولى مساعدي مواعيدي",
    select_type: "حدد النوع",
    diseases: "الأمراض",
    one_last_step: "خطوة واحدة أخيرة...",
    payment_method: "طريقة الدفع",
    select_payment_method: "اختر طريقة الدفع",
    bank_account: "الحساب البنكي",
    instapay: "إنستاباي",
    phone_wallet: "محفظة الهاتف",
    instapay_mail: "بريد إنستاباي",
    phone_number: "رقم الهاتف",
    bank_acc_no: "رقم الحساب البنكي",
    medical_license: "الرخصة الطبية",
    academic_deg: "الدرجة الأكاديمية",
    certificates: "الشهادات",
    working_hours: "ساعات العمل",
    upload_academic_deg: "تحميل الدرجة الأكاديمية",
    upload_medical_license: "تحميل الرخصة الطبية",
    upload_certificates: "تحميل الشهادات",
    examination: "فحص",
    consultation: "استشارة",
    clinic: "عيادة",
    video: "فيديو",
    add_working_hours: "إضافة ساعات العمل",
    you_can_edit_workinghrs_txt: "يمكنك تحرير توافرك في أي وقت",
    done: "تم",
    cancel: "إلغاء",
    no_time_slots_selected: "لم يتم تحديد فترات زمنية اليوم.",
    time_slot_alert: "يرجى إضافة وقت بداية ونهاية للفترة الزمنية.",
    from: "من",
    to: "إلى",
    edit_slot: "تعديل الفترة",
    update: "تحديث",
    save: "حفظ",
    day: "يوم",
    week: "أسبوع",
    month: "شهر",
    single: "فردي",
    group: "مجموعة",
    select_start_time: "إضافة وقت البدء",
    select_end_time: "إضافة وقت الانتهاء",
    home: "الرئيسية",
    awaiting_approval_signup_text: "سيراجع مشرفنا بياناتك، ثم سيتم إعلامك بالبريد الإلكتروني بمجرد الموافقة عليك",
    account_created: "تم إنشاء الحساب!",
    groups: "المجموعات",
    articles: "المقالات",
    contact_us: "اتصل بنا",
    messages: "الرسائل",
    appointments: "المواعيد",
    patients: "المرضى",
    requests: "الطلبات",
    calls: "المكالمات",
    signout: "تسجيل الخروج",
    yashfiny: "يشفيني",
    edit_profile: "تعديل الملف الشخصي",
    search_home: "اسم المريض أو معرف المريض الفريد",
    create_new_patient: "إنشاء مريض جديد",
    recents: "التحديثات",
    assistants: "المساعدين",
    availability: "التوفر",
    monthly_earnings: "الأرباح الشهرية",
    more_than_l_month: "أكثر من الشهر الماضي",
    upcoming_apts: "المواعيد القادمة",
    view_all: "عرض الكل",
    yrs: "سنوات",
    id: "الهوية",
    error: "خطأ",
    new_patient: "مريض جديد",
    full_name: "الاسم الكامل",
    addr_placeholder: "عنوان المنزل",
    disease: "المرض",
    patient_history: "تاريخ المريض",
    add: "إضافة",
    disease_missing_alert: "يرجى اختيار مرض أولاً!",
    specialization: "التخصص",
    subspeciality: "التخصص الفرعي",
    no_new_msgs: "ليس لديك رسائل جديدة من مشرفي النظام.",
    see_more: "عرض المزيد",
    see_less: "عرض أقل",
    contact_us_text: "اكتب رسالتك وسيتواصل معك فريق يشفيني.",
    send: "إرسال",
    slot_type: "نوع الفترة",
    slot_location: "موقع الفترة",
    individual: "فردي",
    select_location: "اختر الموقع",
    modal_slot_alert: "يرجى اختيار نوع وموقع الفترة.",
    avail_alert_note: "يرجى إضافة وتحديث وحذف فتراتك المتاحة لأيام الأسبوع الحالي فقط، وسيتم تكرار الفترات التي تضيفها للشهر بأكمله!",
    avail_alert_title: "ملاحظة منا",
    coming_soon: "قريباً!",
    coming_soon_alert_text: "مطورو النظام يعملون على هذه الميزة، يرجى التحقق مرة أخرى لاحقاً!",
    ok: "موافق",
    error: "خطأ",
    error_selecting_doc: "حدث خطأ أثناء تحديد المستند. يرجى المحاولة مرة أخرى لاحقًا.",
    all: "الكل",
    no_upcoming_apts: "ليس لديك مواعيد قادمة...",
    attended: "حضر",
    cancelled: "أُلغي",
    no_income_for_chosen_filters: "لا يوجد دخل للفلاتر المختارة...",
    total: "الإجمالي",
    add_more: "أضف المزيد",
    type: "النوع",
    method: "الطريقة",
    cancel_alert_title: "إلغاء الموعد",
    cancel_alert_ques: "هل أنت متأكد أنك تريد إلغاء هذا الموعد؟",
    filter_by: "تصفية حسب",
    type: "النوع",
    location: "الموقع",
    upcoming: "القادم",
    visited: "تمت الزيارة",
    clear: "مسح",
    apply: "تطبيق",
    status: "الحالة",
    video_requests: "طلبات الفيديو",
    clinic_requests: "طلبات العيادة",
    special_requests: "الطلبات الخاصة",
    clinic_apt_reqs: "طلبات مواعيد العيادة",
    video_apt_reqs: "طلبات مواعيد الفيديو",
    special_apt_reqs: "طلبات المواعيد الخاصة",
    symptoms: "الأعراض",
    current_complaint: "الشكوى الحالية",
    accept: "قبول",
    decline: "رفض",
    income: "الدخل",
    activities: "الأنشطة",
    promotions: "الترويج",
    time_left_till_apt: "الوقت المتبقي حتى الموعد",
    hours: "ساعات",
    mins: "دقائق",
    start_appointment: "بدء الموعد",
    patient_details: "تفاصيل المريض",
    not_my_speciality: "أختص في مجال آخر من الطب. استشر أخصائيًا آخر",
    slot_not_available: "لم أعد متاحًا في الفترة الزمنية التي طلبتها.",
    group_apts_reserved: "يرجى ملاحظة أن الجلسات الجماعية مخصصة حاليًا للمرضى السابقين.",
    send_quick_message_instead: "هل تريد إرسال رسالة سريعة إلى المريض؟",
    select_message: "اختر رسالة لإرسالها",
    no: "لا",
    yashfiny_asks_you: "يشفيني يسألك",
    years: "سنوات",
    months: "أشهر",
    days: "أيام",
    age: "العمر",
    co_history: "شكوى المريض و التاريخ المرضى",
    visits: "الزيارات",
    ix: "فحوصات طبية",
    rx: "العلاج",
    chronic_disease: "الأمراض المزمنة",
    allergies: "الحساسية",
    no_history_to_show: "لا يوجد تاريخ لعرضه.",
    morning: "صباح",
    noon: "ظهيرة",
    evening: "مساء",
    night: "ليل",
    add_new_drug: "إضافة دواء جديد",
    add_drug: "إضافة دواء",
    add_visit_results: "إضافة نتائج الزيارة",
    diagnosis: "التشخيص",
    advices: "النصائح",
    summary: "الملخص",
    preliminary: "تمهيدي",
    final: "نهائي",
    search_reqs: "بحث حسب اسم المريض",
    promotion: "عرض",
    name: 'الاسم',
    instructions: 'التعليمات',
    dosage: 'الجرعة',
    time: 'الوقت',
    days: 'أيام',
    weeks: 'أسابيع',
    months: 'شهور',
    years: 'سنوات',
    drug_name: 'اسم الدواء',
    duration: 'المدة',
    success: 'نجاح',
    data_updated_successfully: 'تم تحديث البيانات بنجاح!',
    saved: "تم الحفظ!",
    drug_saved: 'تمت إضافة الدواء بنجاح!'

  }
}
const i18n = new I18n(translations);
i18n.locale = Localization.getLocales()[0].languageCode;
//i18n.locale = 'ar'
i18n.enableFallback = true;


export default i18n;
