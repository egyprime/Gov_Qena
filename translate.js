// translate.js - نظام الترجمة التلقائي
console.log("تم تحميل نظام الترجمة التلقائي بنجاح");

let isTranslated = false;
let translatePanelVisible = false;

// قائمة النصوص العربية وترجمتها الإنجليزية
const translatedTexts = {
    // النصوص الأساسية
    "محافظة قنا": "Qena Governorate",
    "مرحباً بكم في البوابة الجغرافية": "Welcome to the Geographic Portal",
    "نظام متكامل لتقديم المعلومات الجغرافية والخدمات الإلكترونية للمواطنين والمستثمرين": "Integrated system for providing geographic information and electronic services to citizens and investors",
    "خريطة الأساس لمحافظة قنا": "Base Map of Qena Governorate",
    "الخريطة الأساسية لمحافظة قنا تشمل الحدود الإدارية للمحافظة والمراكز والقري والشياخات": "The base map of Qena Governorate includes administrative boundaries, centers, villages, and districts",
    "عرض الخريطة": "View Map",
    "الفرص الاستثمارية": "Investment Opportunities",
    "استكشف الفرص الاستثمارية المتاحة في محافظة قنا مع إمكانية التصفية والبحث المتقدم وعرض التفاصيل على الخريطة التفاعلية": "Explore available investment opportunities in Qena Governorate with filtering, advanced search, and interactive map details",
    "استكشف الفرص": "Explore Opportunities",
    "الخدمات والمرافق العامة": "Public Services and Facilities",
    "استعرض مواقع الجهات الحكومية والمرافق العامة في محافظة قنا، لتسهيل وصولك إلى كل ما تحتاجه من خدمات أساسية.": "Browse locations of government entities and public facilities in Qena Governorate to facilitate access to essential services",
    "عرض الخدمات": "View Services",
    "السياحة والآثار": "Tourism and Antiquities",
    "اكتشف المعالم السياحية والأثرية الهامة في محافظة قنا مع معلومات تفصيلية ومواعيد الزيارة": "Discover important tourist and archaeological landmarks in Qena Governorate with detailed information and visiting hours",
    "جولة سياحية": "Tourist Tour",
    "حياة كريمة": "Decent Life Initiative",
    "مشروعات مبادرة حياة كريمة لتطوير القرى والمناطق الريفية": "Projects of the Decent Life Initiative for developing villages and rural areas",
    "عرض التفاصيل": "View Details",
    "نظرة عن قنا": "Overview of Qena",
    "استكشف محافظة قنا من خلال نظرة شاملة على أهم المناطق والخدمات والمشروعات": "Explore Qena Governorate through a comprehensive overview of the most important areas, services, and projects",
    "ابدأ الاستكشاف": "Start Exploration",
    "البوابة الجغرافية لمحافظة قنا": "Geographic Portal of Qena Governorate",
    "نظام معلومات جغرافي متطور لخدمة المواطنين والمستثمرين": "Advanced geographic information system serving citizens and investors",
    "إعداد": "Prepared by",
    "وحدة نظم المعلومات الجغرافية بديوان عام محافظة قنا": "GIS Unit at the General Office of Qena Governorate",
    "المناطق الصناعية": "Industrial Areas",
    "المناطق الحرفية": "Craft Areas",
    "المناطق الزراعية": "Agricultural Areas",
    "مراكز الاستثمار": "Investment Centers",
    "المثلث الذهبي": "Golden Triangle",
    "إغلاق": "Close",
    "© 2025 محافظة قنا - جميع الحقوق محفوظة": "© 2025 Qena Governorate - All rights reserved",
    
    // نصوص إضافية عامة
    "خدماتنا": "Our Services",
    "اتصل بنا": "Contact Us",
    "عنواننا": "Our Address",
    "هاتف": "Phone",
    "البريد الإلكتروني": "Email",
    "الاسم": "Name",
    "رسالتك": "Your Message",
    "إرسال": "Send",
    "مشاريعنا": "Our Projects",
    "فريق العمل": "Our Team",
    "الرئيسية": "Home",
    "عن الشركة": "About Us",
    "المزيد": "More",
    "اقرأ المزيد": "Read More",
    "تحميل المزيد": "Load More",
    "الكل": "All",
    "التفاصيل": "Details",
    "عرض الكل": "View All",
    "التالي": "Next",
    "السابق": "Previous",
    "الأول": "First",
    "الأخير": "Last",
    "بحث": "Search",
    "نتائج البحث": "Search Results",
    " Filter": "Filter",
    "ترتيب حسب": "Sort By",
    "الأحدث": "Newest",
    "الأقدم": "Oldest",
    "التصنيفات": "Categories",
    "التاريخ": "Date",
    "الكاتب": "Author",
    "المشاهدات": "Views",
    "مشاركة": "Share",
    "تعليقات": "Comments",
    " اترك تعليقًا": "Leave a Comment",
    "التعليق": "Comment",
    "إضافة تعليق": "Add Comment",
    "تسجيل الدخول": "Login",
    "تسجيل الخروج": "Logout",
    "إنشاء حساب": "Create Account",
    "كلمة المرور": "Password",
    "تذكرني": "Remember Me",
    "نسيت كلمة المرور": "Forgot Password",
    "التسجيل": "Register",
    "المستخدم": "User",
    "الإعدادات": "Settings",
    "حسابي": "My Account",
    "الملف الشخصي": "Profile",
    "الخصوصية": "Privacy",
    "مساعدة": "Help",
    "الدعم": "Support",
    "الشروط والأحكام": "Terms and Conditions",
    "سياسة الخصوصية": "Privacy Policy",
    "خريطة الموقع": "Site Map",
    "أسئلة شائعة": "FAQ",
    "مركز المساعدة": "Help Center",
    "تواصل معنا": "Contact Us",
    "العنوان": "Address",
    "رقم الهاتف": "Phone Number",
    "ساعات العمل": "Working Hours",
    "من يوم الأحد إلى يوم الخميس": "From Sunday to Thursday",
    "صباحاً": "AM",
    "مساءً": "PM",
    "تابعنا على": "Follow us on",
    "اشترك في النشرة الإخبارية": "Subscribe to Newsletter",
    "اشترك": "Subscribe",
    "بريدك الإلكتروني": "Your Email",
    "جميع الحقوق محفوظة": "All Rights Reserved",
    "تصميم وتطوير": "Designed and Developed by",
    "Made with ❤️": "Made with ❤️"
};

// تهيئة الترجمة عند تحميل الصفحة
function initTranslation() {
    // إنشاء زر الترجمة إذا لم يكن موجوداً
    if (!document.getElementById('translateBtn')) {
        createTranslateButton();
    }
    
    // إنشاء لوحة الترجمة إذا لم تكن موجودة
    if (!document.getElementById('translatePanel')) {
        createTranslatePanel();
    }
    
    // إنشاء شاشة التحميل إذا لم تكن موجودة
    if (!document.getElementById('googleTranslateLoader')) {
        createLoader();
    }
    
    // إضافة مستمعي الأحداث
    const translateBtn = document.getElementById('translateBtn');
    if (translateBtn) {
        translateBtn.addEventListener('click', toggleTranslatePanel);
    }
    
    // إضافة مستمعي الأحداث لخيارات الترجمة
    const translateOptions = document.querySelectorAll('.translate-option');
    translateOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            translateOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            if (lang === 'en' && !isTranslated) {
                translatePage();
            } else if (lang === 'ar' && isTranslated) {
                revertTranslation();
            }
            
            // إخفاء لوحة الخيارات بعد الاختيار
            const panel = document.getElementById('translatePanel');
            if (panel) panel.classList.remove('show');
            translatePanelVisible = false;
        });
    });
    
    // إخفاء لوحة الترجمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        const translateBtn = document.getElementById('translateBtn');
        const translatePanel = document.getElementById('translatePanel');
        
        if (translatePanelVisible && translateBtn && translatePanel && 
            !translateBtn.contains(e.target) && !translatePanel.contains(e.target)) {
            translatePanel.classList.remove('show');
            translatePanelVisible = false;
        }
    });
    
    // التحقق من حالة الترجمة المحفوظة
    const translationState = localStorage.getItem('translationState');
    if (translationState === 'en') {
        setTimeout(() => {
            translatePage();
            
            const translateOptions = document.querySelectorAll('.translate-option');
            translateOptions.forEach(option => {
                option.classList.remove('active');
                if (option.getAttribute('data-lang') === 'en') {
                    option.classList.add('active');
                }
            });
        }, 500);
    }
}

// إنشاء زر الترجمة
function createTranslateButton() {
    const translateBtn = document.createElement('div');
    translateBtn.id = 'translateBtn';
    translateBtn.className = 'translate-btn';
    translateBtn.title = 'ترجمة الصفحة';
    translateBtn.innerHTML = '<i class="bi bi-translate"></i>';
    document.body.appendChild(translateBtn);
    console.log("تم إنشاء زر الترجمة");
}

// إنشاء لوحة الترجمة
function createTranslatePanel() {
    const translatePanel = document.createElement('div');
    translatePanel.id = 'translatePanel';
    translatePanel.className = 'translate-panel';
    translatePanel.innerHTML = `
        <div class="translate-option active" data-lang="ar">
            <i class="bi bi-translate"></i>
            <span>العربية (اللغة الأصلية)</span>
        </div>
        <div class="translate-option" data-lang="en">
            <i class="bi bi-globe"></i>
            <span>English (Translated)</span>
        </div>
        <div class="translation-quality">
            <small>جودة الترجمة: متقدمة (غير حرفية)</small>
        </div>
    `;
    document.body.appendChild(translatePanel);
}

// إنشاء شاشة التحميل
function createLoader() {
    const loader = document.createElement('div');
    loader.id = 'googleTranslateLoader';
    loader.className = 'google-translate-loader';
    loader.innerHTML = `
        <div class="spinner"></div>
        <p id="loaderText">جاري تحميل نظام الترجمة المتقدم...</p>
    `;
    document.body.appendChild(loader);
}

// تبديل عرض لوحة الترجمة
function toggleTranslatePanel(e) {
    if (e) e.stopPropagation();
    const translatePanel = document.getElementById('translatePanel');
    translatePanelVisible = !translatePanelVisible;
    if (translatePanelVisible && translatePanel) {
        translatePanel.classList.add('show');
    } else if (translatePanel) {
        translatePanel.classList.remove('show');
    }
}

// ترجمة الصفحة
function translatePage() {
    const loader = document.getElementById('googleTranslateLoader');
    const loaderText = document.getElementById('loaderText');
    
    if (loader && loaderText) {
        loaderText.textContent = "جاري الترجمة باستخدام نظام متقدم...";
        loader.style.display = 'flex';
    }
    
    setTimeout(() => {
        translateAllText();
        
        if (loader) loader.style.display = 'none';
        const translateBtn = document.getElementById('translateBtn');
        if (translateBtn) translateBtn.classList.add('active');
        isTranslated = true;
        
        localStorage.setItem('translationState', 'en');
    }, 1500);
}

// استعادة الترجمة الأصلية
function revertTranslation() {
    const loader = document.getElementById('googleTranslateLoader');
    const loaderText = document.getElementById('loaderText');
    
    if (loader && loaderText) {
        loaderText.textContent = "جاري استعادة اللغة الأصلية...";
        loader.style.display = 'flex';
    }
    
    setTimeout(() => {
        location.reload();
        localStorage.setItem('translationState', 'ar');
    }, 1000);
}

// ترجمة كل النصوص في الصفحة
function translateAllText() {
    // ترجمة النصوص المعرفة مسبقاً
    translateDefinedTexts();
    
    // ترجمة النصوص الأخرى تلقائياً
    autoTranslateOtherTexts();
    
    // إضافة فئة للجسم للتحكم في التنسيق
    document.body.classList.add('english-version');
    document.documentElement.setAttribute('lang', 'en');
}

// ترجمة النصوص المعرفة مسبقاً
function translateDefinedTexts() {
    const elementsToTranslate = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'a', 'li', 'td', 'th',
        '.header-title', '.welcome-title', '.welcome-subtitle',
        '.card-title', '.card-description', '.card-button',
        '.footer-content h4', '.footer-content p', '.credit-title',
        '.credit-info span', '.modal-title', '.modal-description',
        '.overview-title', '.overview-card-title', '.overview-card-description',
        'button', 'label', 'figcaption', 'blockquote', 'q', 'cite'
    ];
    
    elementsToTranslate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                return;
            }
            
            const originalText = element.textContent.trim();
            if (translatedTexts[originalText]) {
                element.textContent = translatedTexts[originalText];
            }
            
            if (element.title && translatedTexts[element.title]) {
                element.title = translatedTexts[element.title];
            }
            
            if (element.placeholder && translatedTexts[element.placeholder]) {
                element.placeholder = translatedTexts[element.placeholder];
            }
            
            if (element.alt && translatedTexts[element.alt]) {
                element.alt = translatedTexts[element.alt];
            }
        });
    });
}

// ترجمة النصوص الأخرى تلقائياً
function autoTranslateOtherTexts() {
    // ترجمة النصوص في عناصر أخرى
    const otherElements = document.querySelectorAll('div, section, article, header, footer, aside, nav, main');
    
    otherElements.forEach(element => {
        if (element.children.length === 0 && element.textContent.trim() !== '') {
            const originalText = element.textContent.trim();
            if (translatedTexts[originalText]) {
                element.textContent = translatedTexts[originalText];
            }
        }
    });
    
    // ترجمة نصوص أزرار الإدخال
    const inputButtons = document.querySelectorAll('input[type="button"], input[type="submit"]');
    inputButtons.forEach(input => {
        if (input.value && translatedTexts[input.value]) {
            input.value = translatedTexts[input.value];
        }
    });
}

// بدء الترجمة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initTranslation);
