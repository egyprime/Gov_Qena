// translate.js - نظام الترجمة المركزي
console.log("تم تحميل نظام الترجمة بنجاح");

let isTranslated = false;
let translatePanelVisible = false;

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
    
    // التأكد من أن الصفحة تفتح بالعربية أولاً - تم إزالة الترجمة التلقائية
    // لا نقوم بأي ترجمة تلقائية عند تحميل الصفحة
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
    
    // التأكد من أن الزر في مكانه الصحيح
    fixTranslateButtonPosition();
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
        simulateAdvancedTranslation();
        
        if (loader) loader.style.display = 'none';
        const translateBtn = document.getElementById('translateBtn');
        if (translateBtn) translateBtn.classList.add('active');
        isTranslated = true;
        
        localStorage.setItem('translationState', 'en');
        
        // التأكد من أن زر الترجمة يبقى في مكانه بعد الترجمة
        fixTranslateButtonPosition();
        
        // إضافة تأخير إضافي للتأكد من بقاء الزر في مكانه
        setTimeout(fixTranslateButtonPosition, 300);
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
        
        // التأكد من أن زر الترجمة يبقى في مكانه بعد الاستعادة
        setTimeout(fixTranslateButtonPosition, 500);
    }, 1000);
}

// التأكد من أن زر الترجمة يبقى في مكانه الصحيح رغم تغيير الاتجاه
function fixTranslateButtonPosition() {
    const translateBtn = document.getElementById('translateBtn');
    if (translateBtn) {
        translateBtn.style.position = 'fixed';
        translateBtn.style.bottom = '30px';
        translateBtn.style.right = '30px';
        translateBtn.style.left = 'auto'; // إجبار الزر على البقاء على اليمين
        translateBtn.style.zIndex = '9999';
        
        // إجبار التنسيقات رغم تغيير اتجاه الصفحة
        translateBtn.style.setProperty('right', '30px', 'important');
        translateBtn.style.setProperty('left', 'auto', 'important');
    }
    
    const translatePanel = document.getElementById('translatePanel');
    if (translatePanel) {
        translatePanel.style.position = 'fixed';
        translatePanel.style.bottom = '100px';
        translatePanel.style.right = '30px';
        translatePanel.style.left = 'auto';
        translatePanel.style.zIndex = '9998';
        
        // إجبار التنسيقات رغم تغيير اتجاه الصفحة
        translatePanel.style.setProperty('right', '30px', 'important');
        translatePanel.style.setProperty('left', 'auto', 'important');
    }
}

// محاكاة الترجمة المتقدمة (غير حرفية)
function simulateAdvancedTranslation() {
    const elementsToTranslate = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'a', 'li', 'td', 'th',
        '.header-title', '.welcome-title', '.welcome-subtitle',
        '.card-title', '.card-description', '.card-button',
        '.footer-content h4', '.footer-content p', '.credit-title',
        '.credit-info span', '.modal-title', '.modal-description',
        '.overview-title', '.overview-card-title', '.overview-card-description'
    ];
    
    const translatedTexts = {
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
        "© 2025 محافظة قنا - جميع الحقوق محفوظة": "© 2025 Qena Governorate - All rights reserved"
    };
    
    elementsToTranslate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'BUTTON') {
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
        });
    });
    
    // إضافة فئة للجسم للتحكم في التنسيق
    document.body.classList.add('english-version');
    document.documentElement.setAttribute('lang', 'en');
    
    // إضافة تأخير بسيط للتأكد من تطبيق التنسيقات
    setTimeout(() => {
        // التأكد من أن العناصر في المنتصف تبقى في المنتصف
        document.querySelectorAll('.text-center, .center, .align-center').forEach(el => {
            el.style.textAlign = 'center';
            el.style.marginLeft = 'auto';
            el.style.marginRight = 'auto';
        });
        
        // التأكد من أن زر الترجمة يبقى في مكانه الصحيح رغم تغيير الاتجاه
        fixTranslateButtonPosition();
    }, 100);
}

// التأكد من أن زر الترجمة يبقى في مكانه عند تغيير اتجاه الصفحة
function observeDirectionChange() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'dir' || mutation.attributeName === 'class') {
                fixTranslateButtonPosition();
            }
        });
    });
    
    // مراقبة تغييرات في عنصر body
    observer.observe(document.body, { 
        attributes: true,
        attributeFilter: ['dir', 'class']
    });
    
    // مراقبة تغييرات في عنصر html
    observer.observe(document.documentElement, { 
        attributes: true,
        attributeFilter: ['dir', 'lang']
    });
}

// بدء الترجمة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initTranslation);

// التأكد من أن زر الترجمة يبقى في مكانه عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(fixTranslateButtonPosition, 500);
    setTimeout(observeDirectionChange, 1000);
});

// التأكد من أن زر الترجمة يبقى في مكانه عند تغيير حجم النافذة
window.addEventListener('resize', fixTranslateButtonPosition);
