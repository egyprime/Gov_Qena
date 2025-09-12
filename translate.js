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
    
    // تحديث حالة خيارات الترجمة
    updateTranslateOptions();
    
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
        <div class="translate-option" data-lang="ar">
            <i class="bi bi-translate"></i>
            <span>العربية</span>
        </div>
        <div class="translate-option" data-lang="en">
            <i class="bi bi-globe"></i>
            <span>English</span>
        </div>
        <div class="translation-quality">
            <small>Translated by Ali Allam</small>
        </div>
    `;
    document.body.appendChild(translatePanel);
    
    // إضافة مستمعي الأحداث لخيارات الترجمة
    const translateOptions = document.querySelectorAll('.translate-option');
    translateOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
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
}

// تحديث خيارات الترجمة بناءً على الحالة الحالية
function updateTranslateOptions() {
    const arOption = document.querySelector('.translate-option[data-lang="ar"]');
    const enOption = document.querySelector('.translate-option[data-lang="en"]');
    
    if (arOption && enOption) {
        if (isTranslated) {
            arOption.classList.remove('active');
            enOption.classList.add('active');
        } else {
            arOption.classList.add('active');
            enOption.classList.remove('active');
        }
    }
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
        
        // تحديث خيارات الترجمة
        updateTranslateOptions();
        
        localStorage.setItem('translationState', 'en');
    }, 500);
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
    }, 500);
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
        '.overview-title', '.overview-card-title', '.overview-card-description',
        'button', 'label', 'div[title]', 'a[title]'
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
        "بحث": "Search",
        "تصفية": "Filter",
        "تفاصيل": "Details",
        "عرض الكل": "Show All",
        "© 2025 محافظة قنا - جميع الحقوق محفوظة": "© 2025 Qena Governorate - All rights reserved",
        "خريطة الأساس - محافظة قنا": "Base Map - Qena Governorate",
        "الرجوع للصفحة السابقة": "Back to Previous Page",
        "اسم الموقع": "Location Name",
        "عدد المدن": "Number of Cities",
        "عدد الوحدات المحلية": "Number of Local Units",
        "عدد القرى التوابع": "Number of Affiliated Villages",
        "عدد كفور ونجوع وعزب": "Number of Hamlets & Small Villages",
        "ابو تشت": "Abu Tesht",
        "فرشوط": "Farshut",
        "نجع حمادى": "Nag Hammadi",
        "دشنا": "Deshna",
        "الوقف": "Al Waqf",
        "قنا": "Qena",
        "فقط": "Faqous",
        "قوص": "Qus",
        "نقادة": "Naqada",
        "إجمالى المحافظة": "Governorate Total",
        "جميع الحقوق محفوظة © 2025": "All Rights Reserved © 2025",
        "اعداد: وحدة نظم المعلومات الجغرافية بديوان عام محافظة قنا": "Prepared by: GIS Unit - Qena Governorate",
        "تم تحميل ${url} بنجاح": "Successfully loaded ${url}",
        "تعذر تحميل ملف ${url}. يرجى التحقق من وجود الملف.": "Failed to load file ${url}. Please check if the file exists.",
        "خطأ HTTP! الحالة: ${response.status}": "HTTP Error! Status: ${response.status}",
        "حدود القرى": "Villages Boundaries",
        "🏛️ حدود المحافظة": "🏛️ Governorate Boundaries",
        "🏙️ حدود المراكز": "🏙️ Markaz Boundaries",
        "🏡 حدود القرى والشياخات": "🏡 Villages and Sheyakhas Boundaries",
        "التقسيم الإداري لمحافظة قنا": "Administrative Division of Qena Governorate",
        "🛰️ صور الأقمار الصناعية": "🛰️ Satellite Imagery",
        "🗺️ الخريطة الطبوغرافية": "🗺️ Topographic Map",
        "🌆 هجين (شارع + قمر صناعي)": "🌆 Hybrid (Street + Satellite)",
        "👆 تحكم في الخريطة": "👆 Map Control",
        "👆 تحكم في طبقات البيانات": "👆 Data Layers Control",
        "جاري تحميل بيانات الخريطة...": "Loading map data...",
        "طبقات الخريطة:": "Map Layers:",
        "🌍 خريطة محافظة قنا": "🌍 Qena Governorate Map",
        "مفتاح الخريطة": "Map Legend",
        "حدود المحافظة": "Governorate Boundaries",
        "حدود المراكز": "Markaz Boundaries",
        "الفرص الاستثمارية - محافظة قنا": "Investment Opportunities - Qena Governorate",
        "وحدة نظم المعلومات الجغرافية": "Geographic Information Systems Unit",
        "عن محافظة قنا": "About Qena Governorate",
        "كيفية الاستثمار": "How to Invest",
        "الأسئلة الشائعة": "Frequently Asked Questions",
        "تواصل معنا": "Contact Us",
        "الرئيسية": "Home",
        "فرص استثمارية مميزة في محافظة قنا": "Featured Investment Opportunities in Qena Governorate",
        "اكتشف أفضل الفرص الاستثمارية المتاحة في أراضي محافظة قنا واستثمر في مستقبل مزدهر": "Discover the best available investment opportunities in Qena Governorate and invest in a prosperous future",
        "استعرض الفرص الاستثمارية": "Explore Investment Opportunities",
        "لماذا تختار الاستثمار في قنا؟": "Why Choose to Invest in Qena?",
        "محافظة واعدة بفرص استثمارية متنوعة مع إمكانيات كبيرة للنمو والازدهار": "A promising governorate with diverse investment opportunities and great potential for growth and prosperity",
        "موقع استراتيجي": "Strategic Location",
        "موقع مميز في صعيد مصر يربط بين شمال وجنوب البلاد، مع إمكانيات لوجستية كبيرة": "A prime location in Upper Egypt connecting north and south, with significant logistical capabilities",
        "فرص متنوعة": "Diverse Opportunities",
        "فرص استثمارية في مجالات متعددة تشمل الزراعة، السياحة، الصناعة، والخدمات": "Investment opportunities in multiple fields including agriculture, tourism, industry, and services",
        "فرص استثمارية جاهزة": "Ready Investment Opportunities",
        "بيئة استثمارية آمنة مع دعم حكومي كامل وتسهيلات للمستثمرين": "A secure investment environment with full government support and facilities for investors",
        "كيفية الاستثمار في محافظة قنا": "How to Invest in Qena Governorate",
        "4 خطوات بسيطة تفصلك عن بدء رحلتك الاستثمارية": "4 simple steps to start your investment journey",
        "التواصل مع الوحدة": "Contact the Unit",
        "قم بزيارة مقرها للتعرف على الفرص المتاحة": "Visit our office to learn about available opportunities",
        "اختر فرصتك": "Choose Your Opportunity",
        "تصفح الفرص الاستثمارية المتاحة واختر ما يناسب أهدافك الاستثمارية": "Browse available investment opportunities and select the one that fits your investment goals",
        "استثمر": "Invest",
        "استثمر في الفرصة التي تناسبك": "Invest in the opportunity that suits you",
        "ابدأ مشروعك": "Start Your Project",
        "احصل على كافة التصاريح والتراخيص اللازمة وابدأ مشروعك الاستثماري": "Obtain all necessary permits and licenses and start your investment project",
        "الفرص الاستثمارية المتاحة": "Available Investment Opportunities",
        "اكتشف أفضل الفرص الاستثمارية في محافظة قنا": "Discover the Best Investment Opportunities in Qena Governorate",
        "جميع الفرص": "All Opportunities",
        "فرص خدمية": "Service Opportunities",
        "فرص سياحية": "Tourism Opportunities",
        "فرص زراعية": "Agricultural Opportunities",
        "فرص صناعية": "Industrial Opportunities",
        "ابدأ رحلتك الاستثمارية اليوم": "Start Your Investment Journey Today",
        "انضم إلى المستثمرين في محافظة قنا واستفد من الفرص الاستثمارية الحصرية": "Join Qena Governorate's investors and benefit from exclusive investment opportunities",
        "ما هي إجراءات الاستثمار في أراضي محافظة قنا؟": "What are the investment procedures in Qena Governorate?",
        "يمكنك التوجه إلى ديوان عام محافظة قنا لمعرفة كافة التفاصيل.": "Visit the Qena Governorate General Office for all details.",
        "هل تتوفر دعم فني للمستثمرين?": "Is technical support available for investors?",
        "نعم، توفر المحافظة دعمًا فنيًا كاملاً للمستثمرين من خلال مكاتب الاستثمار المتخصصة .": "Yes, the governorate provides full technical support for investors through specialized investment offices.",
        "عن محافظة قنا": "About Qena Governorate",
        "محافظة قنا من المحافظات المصرية الواعدة بالعديد من الفرص الاستثمارية في مختلف المجالات، وتتميز بموقعها الاستراتيجي وثرواتها الطبيعية.": "Qena Governorate is one of Egypt's promising governorates with numerous investment opportunities in various fields, distinguished by its strategic location and natural resources.",
        "تقع محافظة قنا في صعيد مصر وتمتد على ضفاف نهر النيل، وتضم العديد من المعالم الأثرية والسياحية الهامة. تشتهر المحافظة بالزراعة والصناعات المرتبطة بها، بالإضافة إلى وجود فرص استثمارية واعدة في مجالات السياحة والخدمات.": "Qena Governorate is located in Upper Egypt along the Nile River, featuring numerous important historical and tourist landmarks. It is renowned for agriculture and related industries, as well as promising investment opportunities in tourism and services.",
        "كيفية الاستثمار": "How to Invest",
        "للاستثمار في محافظة قنا، يرجى اتباع الخطوات التالية:": "To invest in Qena Governorate, please follow these steps:",
        "التواصل مع وحدة الأستثمار بديوان عام محافظة قنا": "Contact the Investment Unit at Qena Governorate General Office",
        "اختيار الفرصة الاستثمارية المناسبة من القائمة المتاحة": "Select the appropriate investment opportunity from the available list",
        "تعبئة نموذج طلب الاستثمار وتقديم الأوراق المطلوبة": "Fill out the investment application form and submit the required documents",
        "انتظار الموافقة على الطلب من الجهات المختصة": "Wait for application approval from relevant authorities",
        "بدء تنفيذ المشروع بعد الحصول على الموافقات اللازمة": "Start project implementation after obtaining necessary approvals",
        "للمزيد من المعلومات، يمكنكم التواصل معنا عبر النموذج المتاح في قسم \"تواصل معنا\".": "For more information, contact us via the form available in the 'Contact Us' section.",
        "التوجه الي ديوان عام محافظة قنا": "Visit the Qena Governorate General Office",
        "اذهب إلى الموقع على الخريطة": "Go to the Location on the Map",
        "عن الوحدة": "About the Unit",
        "وحدة نظم المعلومات الجغرافية التابعة لمحافظة قنا تهدف إلى توفير معلومات جغرافية دقيقة لدعم اتخاذ القرار.": "The Geographic Information Systems Unit of Qena Governorate aims to provide accurate geographic information to support decision-making.",
        "روابط سريعة": "Quick Links",
        "الرئيسية": "Home",
        "عن محافظة قنا": "About Qena Governorate",
        "كيفية الاستثمار": "How to Invest",
        "الأسئلة الشائعة": "Frequently Asked Questions",
        "الفرص الاستثمارية": "Investment Opportunities",
        "مدينة ترفيهية": "Entertainment City",
        "محطة تربية دواجن": "Poultry Breeding Station",
        "أرض استصلاح زراعي": "Agricultural Reclamation Land",
        "فندق سياحي وملحق": "Tourist Hotel and Annex",
        "معلومات الاتصال": "Contact Information",
        "ديوان عام محافظة قنا": "Qena Governorate General Office",
        "© 2025 وحدة نظم المعلومات الجغرافية - محافظة قنا. جميع الحقوق محفوظة": "© 2025 Geographic Information Systems Unit - Qena Governorate. All rights reserved.",
        "المساحة": "Area: ",
        "خط الطول: ${coords.longitude}": "Longitude: ",
        "خط العرض: ": "Latitude: ",
        "هذه الفرصة متاحة": "This opportunity is available",
        "خريطة الفرص": "Opportunity Map",
        " م²": " m²",
        "اقامة مول تجاري": "Establish a Commercial Mall",
        "ارض فضاء بالترعة المضرانية": "Open Land at Al-Mudarana Canal",
        "اقامة محطة وقود سيارات وخدمات": "Establish a Car Fuel Station and Services",
        "مول تجاري او مجمع طبي": "Commercial Mall or Medical Complex",
        "نشاط اداري وتجاري": "Administrative and Commercial Activity",
        "حديقة المساكن": "Residential Park",
        "مرسي نجع حمادي السياحي": "Naj' Hammadi Tourist Marina",
        "اقامة فندق سياحي - 2": "Establish a Tourist Hotel - 2",
        "النادي الاجتماعي ومسرح": "Social Club and Theater",
        "فندق سياحي": "Tourist Hotel",
        "معمل التفريغ الجديد": "New Discharge Plant",
        "محطة تسمين العجول": "Cattle Fattening Station",
        "المنطقة الحرافية بالترامسة": "Al-Tramsa Artisanal Zone",
        "مزرعة 390 فدان شيخ علي": "Sheikh Ali 390-Feddan Farm",
        "منتجع سياحي": "Tourist Resort",
        "مشروع خدمات طرق": "Road Services Project",
        "مشروعات انتاج داجني": "Poultry Production Projects",
        "محافظة قنا - مركز نجع حمادي": "Qena Governorate - Naj' Hammadi Center",
        "محافظة قنا - مركز قنا": "Qena Governorate - Qena Center",
        "مصر - محافظة قنا": "Egypt - Qena Governorate",
        "مول تجاري": "Commercial Mall",
        "مدارس خاصة": "Private Schools",
        "محطة تموين سيارات": "Car Fuel Station",
        "مول تجاري او مجمع طبي": "Commercial Mall or Medical Complex",
        "نشاط تجاري خدمي": "Commercial Service Activity",
        "مدينة ترفيهية": "Entertainment City",
        "مرسي سياحي": "Tourist Marina",
        "فندق سياحي": "Tourist Hotel",
        "فندق سياحي ملحق به مول تجار": "Tourist Hotel with Commercial Mall",
        "محطة تربية دواجن": "Poultry Breeding Station",
        "محطة تسمين عجول": "Cattle Fattening Station",
        "المنطقة الحرفية بالترامسة": "Al-Tramsa Craft Zone",
        "استصلاح زراعي 390 فدان": "Agricultural Reclamation 390 Feddan",
        "مشروعات انتاج داجني": "Poultry Production Projects",
        "منتجع سياحي": "Tourist Resort",
        "مشروع خدمات طرق": "Road Services Project",
        "خدمي": "Service",
        "سياحي": "Tourism",
        "زراعي": "Agricultural",
        "صناعي": "Industrial",
        "اقامة مول تجاري": "Establish a Commercial Mall",
        "ارض فضاء بالترعة المضرانية": "Open Land at Al-Mudarana Canal",
        "اقامة محطة وقود سيارات وخدمات": "Establish a Car Fuel Station and Services",
        "مول تجاري او مجمع طبي": "Commercial Mall or Medical Complex",
        "نشاط اداري وتجاري": "Administrative and Commercial Activity",
        "حديقة المساكن": "Residential Park",
        "مرسي نجع حمادي السياحي": "Naj' Hammadi Tourist Marina",
        "اقامة فندق سياحي - 2": "Establish a Tourist Hotel - 2",
        "النادي الاجتماعي ومسرح": "Social Club and Theater",
        "فندق سياحي": "Tourist Hotel",
        "معمل التفريغ الجديد": "New Discharge Plant",
        "محطة تسمين العجول": "Cattle Fattening Station",
        "المنطقة الحرافية بالترامسة": "Al-Tramsa Artisanal Zone",
        "مزرعة 390 فدان شيخ علي": "Sheikh Ali 390-Feddan Farm",
        "منتجع سياحي": "Tourist Resort",
        "مشروع خدمات طرق": "Road Services Project",
        "مشروعات انتاج داجني": "Poultry Production Projects",
        "محافظة قنا - مركز نجع حمادي": "Qena Governorate - Naj' Hammadi Center",
        "محافظة قنا - مركز قنا": "Qena Governorate - Qena Center",
        "مصر - محافظة قنا": "Egypt - Qena Governorate",
        "مدينة ترفيهية": "Entertainment City",
        "مدارس خاصة": "Private Schools",
        "محطة تموين سيارات": "Car Fuel Station",
        "نشاط تجاري خدمي": "Commercial Service Activity",
        "مرسي سياحي": "Tourist Marina",
        "فندق سياحي ملحق به مول تجار": "Tourist Hotel with Commercial Mall",
        "استصلاح زراعي 390 فدان": "Agricultural Reclamation 390 Feddan"
    };
    
    elementsToTranslate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // معالجة الحقول النصية
                if (element.placeholder && translatedTexts[element.placeholder]) {
                    element.placeholder = translatedTexts[element.placeholder];
                }
                return;
            }
            
            // معالجة النصوص العادية
            const originalText = element.textContent.trim();
            if (originalText && translatedTexts[originalText]) {
                element.textContent = translatedTexts[originalText];
            }
            
            // معالجة عناوين العناصر
            if (element.title && translatedTexts[element.title]) {
                element.title = translatedTexts[element.title];
            }
            
            // معالجة نصوص الأزرار
            if (element.tagName === 'BUTTON' && originalText && translatedTexts[originalText]) {
                element.textContent = translatedTexts[originalText];
            }
        });
    });
    
    // إضافة فئة للجسم للتحكم في التنسيق
    document.body.classList.add('english-version');
    document.documentElement.setAttribute('lang', 'en');
}

// بدء الترجمة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initTranslation);













