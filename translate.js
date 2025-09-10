// translate.js - نظام الترجمة التلقائي
console.log("تم تحميل نظام الترجمة التلقائي بنجاح");

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
    
    // استعادة حالة الترجمة السابقة إذا كانت موجودة
    const savedTranslationState = localStorage.getItem('translationState');
    if (savedTranslationState === 'en') {
        // تفعيل خيار الإنجليزية
        const enOption = document.querySelector('.translate-option[data-lang="en"]');
        if (enOption) {
            document.querySelectorAll('.translate-option').forEach(opt => opt.classList.remove('active'));
            enOption.classList.add('active');
            translatePage();
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

// ترجمة الصفحة باستخدام API
function translatePage() {
    const loader = document.getElementById('googleTranslateLoader');
    const loaderText = document.getElementById('loaderText');
    
    if (loader && loaderText) {
        loaderText.textContent = "جاري الترجمة باستخدام نظام متقدم...";
        loader.style.display = 'flex';
    }
    
    // استخدام API للترجمة
    translateAllText()
        .then(() => {
            if (loader) loader.style.display = 'none';
            const translateBtn = document.getElementById('translateBtn');
            if (translateBtn) translateBtn.classList.add('active');
            isTranslated = true;
            
            localStorage.setItem('translationState', 'en');
        })
        .catch(error => {
            console.error("خطأ في الترجمة:", error);
            if (loader) loader.style.display = 'none';
            alert("عذرًا، حدث خطأ أثناء الترجمة. يرجى المحاولة مرة أخرى.");
        });
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

// ترجمة جميع النصوص باستخدام API
async function translateAllText() {
    try {
        // جمع جميع النصوص العربية في الصفحة
        const textElements = getTextElements();
        const textsToTranslate = extractArabicTexts(textElements);
        
        if (textsToTranslate.length === 0) {
            console.log("لا توجد نصوص عربية للترجمة");
            return;
        }
        
        // ترجمة النصوص باستخدام API
        const translatedTexts = await translateTexts(textsToTranslate);
        
        // استبدال النصوص المترجمة
        applyTranslations(textElements, translatedTexts);
        
        // إضافة فئة للجسم للتحكم في التنسيق
        document.body.classList.add('english-version');
        document.documentElement.setAttribute('lang', 'en');
        
    } catch (error) {
        console.error("خطأ في ترجمة النصوص:", error);
        throw error;
    }
}

// جمع عناصر النص من الصفحة
function getTextElements() {
    const selectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'a', 'li', 'td', 'th',
        'button', 'label', 'figcaption', 'blockquote',
        '[class*="title"]', '[class*="name"]', '[class*="label"]',
        '[class*="text"]', '[class*="desc"]', '[class*="content"]'
    ];
    
    const elements = [];
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            // استبعاد العناصر المخفية والعناصر التي تحتوي على مدخلات
            if (el.offsetParent !== null && 
                !el.querySelector('input, textarea, select') &&
                el.textContent.trim().length > 0) {
                elements.push(el);
            }
        });
    });
    
    return elements;
}

// استخراج النصوص العربية من العناصر
function extractArabicTexts(elements) {
    const arabicTexts = [];
    const arabicRegex = /[\u0600-\u06FF]/;
    
    elements.forEach(el => {
        const text = el.textContent.trim();
        if (text && arabicRegex.test(text)) {
            arabicTexts.push({
                element: el,
                text: text
            });
        }
    });
    
    return arabicTexts;
}

// ترجمة النصوص باستخدام API
async function translateTexts(texts) {
    // استخدام API مجاني للترجمة (مثال: MyMemory API)
    const apiUrl = 'https://api.mymemory.translated.net/get';
    const translatedTexts = [];
    
    for (const item of texts) {
        try {
            const response = await fetch(`${apiUrl}?q=${encodeURIComponent(item.text)}&langpair=ar|en`);
            const data = await response.json();
            
            if (data.responseStatus === 200) {
                translatedTexts.push({
                    element: item.element,
                    translatedText: data.responseData.translatedText
                });
            } else {
                translatedTexts.push({
                    element: item.element,
                    translatedText: item.text // الاحتفاظ بالنص الأصلي في حالة الفشل
                });
            }
            
            // تأخير بين الطلبات لتجنب تجاوز حد API
            await new Promise(resolve => setTimeout(resolve, 100));
            
        } catch (error) {
            console.error(`خطأ في ترجمة النص: ${item.text}`, error);
            translatedTexts.push({
                element: item.element,
                translatedText: item.text // الاحتفاظ بالنص الأصلي في حالة الخطأ
            });
        }
    }
    
    return translatedTexts;
}

// تطبيق الترجمات على العناصر
function applyTranslations(textElements, translatedTexts) {
    translatedTexts.forEach(item => {
        if (item.element && item.translatedText) {
            item.element.textContent = item.translatedText;
            
            // الحفاظ على السمات المهمة مثل title و placeholder
            if (item.element.title) {
                item.element.setAttribute('data-original-title', item.element.title);
                item.element.removeAttribute('title');
            }
            
            if (item.element.placeholder) {
                item.element.setAttribute('data-original-placeholder', item.element.placeholder);
                item.element.removeAttribute('placeholder');
            }
        }
    });
}

// بدء الترجمة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initTranslation);
