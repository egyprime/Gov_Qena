// translate.js - نظام الترجمة المركزي
console.log("تم تحميل نظام الترجمة بنجاح");

let isTranslated = false;
let translatePanelVisible = false;

// قائمة النصوص المترجمة (يجب أن تحتوي على جميع النصوص في جميع الصفحات)
const translatedTexts = {
    // النصوص الحالية
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
    
    // النصوص المضافة حديثاً
    " الرجوع للصفحة السابقة": " Back to the previous page",
    " خريطة الأساس - محافظة قنا": " Base Map - Qena Governorate",
    " تحكم في الخريطة": " Control the Map",
    " طبقات الخريطة:": " Map Layers:",
    " صور الأقمار الصناعية": " Satellite Images",
    " الخريطة الطبوغرافية": " Topographic Map",
    " هجين (شارع + قمر صناعي)": " Hybrid (Street + Satellite)",
    " تحكم في طبقات البيانات": " Control Data Layers",
    " حدود المحافظة": " Governorate Boundaries",
    " حدود المراكز": " Markaz Boundaries",
    " حدود القرى والشياخات": " Village and Shiakha Boundaries",
    " التقسيم الإداري لمحافظة قنا": " Administrative Division of Qena Governorate",
    " م": " No.",
    " اسم الموقع": " Location Name",
    " عدد المدن": " Number of Cities",
    " عدد الوحدات المحلية": " Number of Local Units",
    " عدد القرى التوابع": " Number of Subordinate Villages",
    " عدد كفور ونجوع وعزب": " Number of Hamlets and Small Settlements",
    " ابو تشت": " Abu Tesht",
    " فرشوط": " Farshut",
    " نجع حمادى": " Nag Hammadi",
    " دشنا": " Deshna",
    " الوقف": " Al Waqf",
    " قنا": " Qena",
    " فقط": " Faqous",
    " قوص": " Qus",
    " نقادة": " Naqada",
    " إجمالى المحافظة": " Governorate Total",
    " جميع الحقوق محفوظة © 2025": " All Rights Reserved © 2025",
    " اعداد: وحدة نظم المعلومات الجغرافية بديوان عام محافظة قنا": " Prepared by: GIS Unit, General Office of Qena Governorate",
    " حدود محافظة قنا": " Qena Governorate Boundaries",
    " مراكز محافظة قنا": " Markaz of Qena Governorate",
    " قرية في قنا": " Village in Qena"
};

// تهيئة الترجمة عند تحميل الصفحة
function initTranslation() {
    // التحقق من حالة الترجمة المخزنة
    const savedState = localStorage.getItem('translationState');
    isTranslated = savedState === 'en';
    
    // إنشاء عناصر واجهة الترجمة إذا لم تكن موجودة
    if (!document.getElementById('translateBtn')) {
        createTranslateButton();
    }
    
    if (!document.getElementById('translatePanel')) {
        createTranslatePanel();
    }
    
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
    
    // تطبيق الترجمة إذا كانت مفعلة مسبقاً
    if (isTranslated) {
        applyTranslation();
        const translateBtn = document.getElementById('translateBtn');
        if (translateBtn) translateBtn.classList.add('active');
        
        const enOption = document.querySelector('.translate-option[data-lang="en"]');
        const arOption = document.querySelector('.translate-option[data-lang="ar"]');
        if (enOption && arOption) {
            enOption.classList.add('active');
            arOption.classList.remove('active');
        }
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
    
    // إضافة أنماط زر الترجمة
    if (!document.querySelector('#translateStyles')) {
        const styles = document.createElement('style');
        styles.id = 'translateStyles';
        styles.textContent = `
            .translate-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #1a3a8f 0%, #2a56b6 100%);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                transition: all 0.3s ease;
                font-size: 24px;
            }
            
            .translate-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            }
            
            .translate-btn.active {
                background: linear-gradient(135deg, #2a56b6 0%, #3a76e0 100%);
            }
            
            .translate-panel {
                position: fixed;
                bottom: 80px;
                right: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
                padding: 15px;
                z-index: 9999;
                width: 280px;
                opacity: 0;
                transform: translateY(10px);
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .translate-panel.show {
                opacity: 1;
                transform: translateY(0);
                visibility: visible;
            }
            
            .translate-option {
                display: flex;
                align-items: center;
                padding: 12px;
                margin-bottom: 8px;
                border-radius: 8px;
                cursor: pointer;
                transition: background 0.2s ease;
            }
            
            .translate-option:hover {
                background: #f5f7fa;
            }
            
            .translate-option.active {
                background: #e8effb;
                color: #2a56b6;
                font-weight: bold;
            }
            
            .translate-option i {
                margin-right: 10px;
                font-size: 18px;
            }
            
            .translation-quality {
                margin-top: 10px;
                padding-top: 10px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 12px;
                text-align: center;
            }
            
            .google-translate-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.95);
                display: none;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 10001;
            }
            
            .spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #f3f3f3;
                border-top: 5px solid #2a56b6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .english-version * {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
            }
        `;
        document.head.appendChild(styles);
    }
    
    console.log("تم إنشاء زر الترجمة");
}

// إنشاء لوحة الترجمة
function createTranslatePanel() {
    const translatePanel = document.createElement('div');
    translatePanel.id = 'translatePanel';
    translatePanel.className = 'translate-panel';
    translatePanel.innerHTML = `
        <div class="translate-option ${isTranslated ? '' : 'active'}" data-lang="ar">
            <i class="bi bi-translate"></i>
            <span>العربية (اللغة الأصلية)</span>
        </div>
        <div class="translate-option ${isTranslated ? 'active' : ''}" data-lang="en">
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
        applyTranslation();
        
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

// تطبيق الترجمة على الصفحة
function applyTranslation() {
    const elementsToTranslate = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'a', 'li', 'td', 'th',
        '.header-title', '.welcome-title', '.welcome-subtitle',
        '.card-title', '.card-description', '.card-button',
        '.footer-content h4', '.footer-content p', '.credit-title',
        '.credit-info span', '.modal-title', '.modal-description',
        '.overview-title', '.overview-card-title', '.overview-card-description',
        'label', 'figcaption', 'strong', 'b', 'i', 'em'
    ];
    
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
            
            // ترجمة قيمة الزر
            if (element.tagName === 'INPUT' && element.type === 'button' && translatedTexts[element.value]) {
                element.value = translatedTexts[element.value];
            }
        });
    });
    
    // إضافة فئة للجسم للتحكم في التنسيق - بدون تغيير الاتجاه
    document.body.classList.add('english-version');
    document.documentElement.setAttribute('lang', 'en');
}

// بدء الترجمة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initTranslation);

// دالة مساعدة للتحقق من وجود النص في الصفحة قبل الترجمة
function isTextInPage(text) {
    return document.body.textContent.includes(text);
}
