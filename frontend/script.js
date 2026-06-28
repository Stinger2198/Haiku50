"use strict";

const API_URL = "/generate";

// ===== Translations =====
const TRANS = {
  uk: {
    "hero.desc": 'Введіть від 3 до 7 слів або фраз — додайте жару кнопкою "50 васабі".',
    "kicker.label": "Хайку",
    "empty.title": "Хайку ще немає",
    "empty.copy": 'Введіть слова і натисніть "Згенерувати"',
    "keywords.heading": "Ключові слова",
    "keywords.placeholder": "сакура, дощ, тиша, поїзд, сутінки",
    "keywords.clear": "Очистити",
    "keywords.count_needed": "Потрібно 3–7",
    "keywords.count_fmt": "{n} із 3–7 ✓",
    "lang.title": "Мова",
    "wasabi.default": "50 васабі",
    "wasabi.more": "Ще васабі!",
    "wasabi.cool": "Остудити",
    "wasabi.heat": "Рівень пекучості: {n}/6",
    "wasabi.max": "🌶 Найгостріше — натисніть знову, щоб остудити",
    "history.heading": "Історія",
    "history.clear": "Очистити",
    "history.empty": "Хайку ще немає",
    "history.count": "{n} збережено",
    "result.loading": "Складаємо рядки…",
    "result.generate": "Згенерувати хайку",
    "result.generating": "Генерується…",
    "info.title": "5·7·5",
    "info.desc": "Хайку — три рядки, один подих. Слова творять образ, васабі задає настрій.",
    "error.min_keywords": "Введіть хоча б 3 ключові слова або фрази",
    "error.max_keywords": "Максимум 7 ключових слів",
    "error.no_lang": "Виберіть мову генерації",
    "error.empty_response": "Порожня відповідь від сервера",
    "error.server_unreachable": "Сервер недоступний — чи запущено бекенд?",
    "wasabi.prefix": "васабі",
    "clear_confirm": "Очистити всю історію?",
    "page.title": "Haiku 50",
  },
  en: {
    "hero.desc": 'Enter 3 to 7 words or short phrases — then add some heat with the "50 wasabi" button.',
    "kicker.label": "Haiku",
    "empty.title": "No haiku yet",
    "empty.copy": 'Enter your words and press "Generate"',
    "keywords.heading": "Keywords",
    "keywords.placeholder": "sakura, rain, silence, train, dusk",
    "keywords.clear": "Clear",
    "keywords.count_needed": "3–7 needed",
    "keywords.count_fmt": "{n} of 3–7 ✓",
    "lang.title": "Language",
    "wasabi.default": "50 wasabi",
    "wasabi.more": "More wasabi!",
    "wasabi.cool": "Cool down",
    "wasabi.heat": "Heat level: {n} / 6",
    "wasabi.max": "🌶 As hot as it gets — tap again to cool down",
    "history.heading": "History",
    "history.clear": "Clear",
    "history.empty": "No haiku yet",
    "history.count": "{n} saved",
    "result.loading": "Composing the lines…",
    "result.generate": "Generate haiku",
    "result.generating": "Generating…",
    "info.title": "5·7·5",
    "info.desc": "A haiku — three lines, one breath. Words set the image, wasabi sets the mood.",
    "error.min_keywords": "Enter at least 3 keywords or short phrases",
    "error.max_keywords": "Maximum 7 keywords allowed",
    "error.no_lang": "Choose a generation language",
    "error.empty_response": "Empty response from server",
    "error.server_unreachable": "Server unreachable — is the backend running?",
    "wasabi.prefix": "wasabi",
    "clear_confirm": "Clear all history?",
    "page.title": "Haiku 50",
  },
  ja: {
    "hero.desc": '3〜7個の単語や短いフレーズを入力 — 「50わさび」ボタンで辛さを調整。',
    "kicker.label": "俳句",
    "empty.title": "まだ俳句がありません",
    "empty.copy": '言葉を入力して「生成」を押してください',
    "keywords.heading": "キーワード",
    "keywords.placeholder": "桜、雨、静けさ、電車、夕暮れ",
    "keywords.clear": "クリア",
    "keywords.count_needed": "3〜7必要",
    "keywords.count_fmt": "{n}/3〜7 ✓",
    "lang.title": "言語",
    "wasabi.default": "50わさび",
    "wasabi.more": "もっとわさび！",
    "wasabi.cool": "クールダウン",
    "wasabi.heat": "辛さレベル：{n}/6",
    "wasabi.max": "🌶 最大の辛さ — もう一度タップでクールダウン",
    "history.heading": "履歴",
    "history.clear": "クリア",
    "history.empty": "まだ俳句がありません",
    "history.count": "{n}件保存",
    "result.loading": "行を紡いでいます…",
    "result.generate": "俳句を生成",
    "result.generating": "生成中…",
    "info.title": "五・七・五",
    "info.desc": "俳句は三行、一息。言葉が絵を描き、わさびがムードを決める。",
    "error.min_keywords": "3つ以上のキーワードまたは短いフレーズを入力してください",
    "error.max_keywords": "最大7つのキーワードまで",
    "error.no_lang": "生成言語を選択してください",
    "error.empty_response": "サーバーからの応答が空です",
    "error.server_unreachable": "サーバーに接続できません — バックエンドは起動していますか？",
    "wasabi.prefix": "わさび",
    "clear_confirm": "履歴をすべて消去しますか？",
    "page.title": "Haiku 50",
  },
  zh: {
    "hero.desc": '输入3到7个单词或短语 — 然后用"50芥末"按钮调节辣度。',
    "kicker.label": "俳句",
    "empty.title": "还没有俳句",
    "empty.copy": '输入词语并按"生成"',
    "keywords.heading": "关键词",
    "keywords.placeholder": "樱花、雨、寂静、列车、黄昏",
    "keywords.clear": "清除",
    "keywords.count_needed": "需要3–7个",
    "keywords.count_fmt": "{n}/3–7 ✓",
    "lang.title": "语言",
    "wasabi.default": "50芥末",
    "wasabi.more": "更多芥末！",
    "wasabi.cool": "降温",
    "wasabi.heat": "辣度：{n}/6",
    "wasabi.max": "🌶 最辣 — 再次点击降温",
    "history.heading": "历史",
    "history.clear": "清除",
    "history.empty": "还没有俳句",
    "history.count": "已保存{n}条",
    "result.loading": "正在构思诗句…",
    "result.generate": "生成俳句",
    "result.generating": "生成中…",
    "info.title": "五·七·五",
    "info.desc": "俳句 — 三行，一呼一吸。词语描绘画面，芥末设定氛围。",
    "error.min_keywords": "请至少输入3个关键词或短语",
    "error.max_keywords": "最多7个关键词",
    "error.no_lang": "请选择生成语言",
    "error.empty_response": "服务器返回空响应",
    "error.server_unreachable": "服务器无法连接 — 后端是否在运行？",
    "wasabi.prefix": "芥末",
    "clear_confirm": "清除所有历史记录？",
    "page.title": "Haiku 50",
  },
  ko: {
    "hero.desc": '3~7개의 단어나 짧은 구문을 입력하세요 — "50 와사비" 버튼으로 매운맛을 조절하세요.',
    "kicker.label": "하이쿠",
    "empty.title": "아직 하이쿠가 없습니다",
    "empty.copy": '단어를 입력하고 "생성"을 누르세요',
    "keywords.heading": "키워드",
    "keywords.placeholder": "벚꽃, 비, 고요, 기차, 황혼",
    "keywords.clear": "지우기",
    "keywords.count_needed": "3~7개 필요",
    "keywords.count_fmt": "{n}/3~7 ✓",
    "lang.title": "언어",
    "wasabi.default": "50 와사비",
    "wasabi.more": "와사비 더!",
    "wasabi.cool": "식히기",
    "wasabi.heat": "매운맛 레벨: {n}/6",
    "wasabi.max": "🌶 최고 매운맛 — 다시 누르면 식혀요",
    "history.heading": "기록",
    "history.clear": "지우기",
    "history.empty": "아직 하이쿠가 없습니다",
    "history.count": "{n}개 저장됨",
    "result.loading": "행을 짜고 있습니다…",
    "result.generate": "하이쿠 생성",
    "result.generating": "생성 중…",
    "info.title": "5·7·5",
    "info.desc": "하이쿠 — 세 줄, 한 숨. 단어가 이미지를 그리고 와사비가 분위기를 만듭니다.",
    "error.min_keywords": "최소 3개의 키워드 또는 짧은 구문을 입력하세요",
    "error.max_keywords": "최대 7개의 키워드까지 허용됩니다",
    "error.no_lang": "생성 언어를 선택하세요",
    "error.empty_response": "서버가 빈 응답을 반환했습니다",
    "error.server_unreachable": "서버에 연결할 수 없습니다 — 백엔드가 실행 중인가요?",
    "wasabi.prefix": "와사비",
    "clear_confirm": "모든 기록을 지우시겠습니까?",
    "page.title": "Haiku 50",
  },
  fr: {
    "hero.desc": 'Entrez 3 à 7 mots ou courtes phrases — puis ajoutez du piquant avec le bouton "50 wasabi".',
    "kicker.label": "Haïku",
    "empty.title": "Pas encore d'haïku",
    "empty.copy": 'Entrez des mots et appuyez sur "Générer"',
    "keywords.heading": "Mots-clés",
    "keywords.placeholder": "sakura, pluie, silence, train, crépuscule",
    "keywords.clear": "Effacer",
    "keywords.count_needed": "3–7 requis",
    "keywords.count_fmt": "{n} sur 3–7 ✓",
    "lang.title": "Langue",
    "wasabi.default": "50 wasabi",
    "wasabi.more": "Encore du wasabi !",
    "wasabi.cool": "Refroidir",
    "wasabi.heat": "Piquant : {n}/6",
    "wasabi.max": "🌶 Maximum — appuyez à nouveau pour refroidir",
    "history.heading": "Historique",
    "history.clear": "Effacer",
    "history.empty": "Pas encore d'haïku",
    "history.count": "{n} sauvegardé(s)",
    "result.loading": "Composition en cours…",
    "result.generate": "Générer l'haïku",
    "result.generating": "Génération…",
    "info.title": "5·7·5",
    "info.desc": "Un haïku — trois vers, un souffle. Les mots créent l'image, le wasabi donne le ton.",
    "error.min_keywords": "Entrez au moins 3 mots-clés ou courtes phrases",
    "error.max_keywords": "Maximum 7 mots-clés autorisés",
    "error.no_lang": "Choisissez une langue de génération",
    "error.empty_response": "Réponse vide du serveur",
    "error.server_unreachable": "Serveur inaccessible — le backend est-il lancé ?",
    "wasabi.prefix": "wasabi",
    "clear_confirm": "Effacer tout l'historique ?",
    "page.title": "Haiku 50",
  },
  de: {
    "hero.desc": 'Geben Sie 3 bis 7 Wörter oder kurze Sätze ein — dann feuern Sie mit dem "50 Wasabi"-Knopf nach.',
    "kicker.label": "Haiku",
    "empty.title": "Noch kein Haiku",
    "empty.copy": 'Wörter eingeben und "Generieren" drücken',
    "keywords.heading": "Schlüsselwörter",
    "keywords.placeholder": "Kirschblüte, Regen, Stille, Zug, Dämmerung",
    "keywords.clear": "Löschen",
    "keywords.count_needed": "3–7 nötig",
    "keywords.count_fmt": "{n} von 3–7 ✓",
    "lang.title": "Sprache",
    "wasabi.default": "50 Wasabi",
    "wasabi.more": "Mehr Wasabi!",
    "wasabi.cool": "Abkühlen",
    "wasabi.heat": "Schärfegrad: {n}/6",
    "wasabi.max": "🌶 Maximal scharf — zum Abkühlen erneut tippen",
    "history.heading": "Verlauf",
    "history.clear": "Löschen",
    "history.empty": "Noch kein Haiku",
    "history.count": "{n} gespeichert",
    "result.loading": "Zeilen werden verfasst…",
    "result.generate": "Haiku generieren",
    "result.generating": "Generiere…",
    "info.title": "5·7·5",
    "info.desc": "Ein Haiku — drei Zeilen, ein Atemzug. Worte formen das Bild, Wasabi die Stimmung.",
    "error.min_keywords": "Geben Sie mindestens 3 Schlüsselwörter oder kurze Sätze ein",
    "error.max_keywords": "Maximal 7 Schlüsselwörter erlaubt",
    "error.no_lang": "Wählen Sie eine Generierungssprache",
    "error.empty_response": "Leere Antwort vom Server",
    "error.server_unreachable": "Server nicht erreichbar — läuft das Backend?",
    "wasabi.prefix": "Wasabi",
    "clear_confirm": "Gesamten Verlauf löschen?",
    "page.title": "Haiku 50",
  },
  es: {
    "hero.desc": 'Ingrese de 3 a 7 palabras o frases cortas — luego agregue picante con el botón "50 wasabi".',
    "kicker.label": "Haiku",
    "empty.title": "Aún no hay haiku",
    "empty.copy": 'Ingrese palabras y presione "Generar"',
    "keywords.heading": "Palabras clave",
    "keywords.placeholder": "sakura, lluvia, silencio, tren, atardecer",
    "keywords.clear": "Limpiar",
    "keywords.count_needed": "Se necesitan 3–7",
    "keywords.count_fmt": "{n} de 3–7 ✓",
    "lang.title": "Idioma",
    "wasabi.default": "50 wasabi",
    "wasabi.more": "¡Más wasabi!",
    "wasabi.cool": "Enfriar",
    "wasabi.heat": "Nivel de picante: {n}/6",
    "wasabi.max": "🌶 Máximo picante — toque de nuevo para enfriar",
    "history.heading": "Historial",
    "history.clear": "Limpiar",
    "history.empty": "Aún no hay haiku",
    "history.count": "{n} guardado(s)",
    "result.loading": "Componiendo los versos…",
    "result.generate": "Generar haiku",
    "result.generating": "Generando…",
    "info.title": "5·7·5",
    "info.desc": "Un haiku — tres versos, un suspiro. Las palabras crean la imagen, el wasabi el ambiente.",
    "error.min_keywords": "Ingrese al menos 3 palabras clave o frases cortas",
    "error.max_keywords": "Máximo 7 palabras clave permitidas",
    "error.no_lang": "Elija un idioma de generación",
    "error.empty_response": "Respuesta vacía del servidor",
    "error.server_unreachable": "Servidor inaccesible — ¿está funcionando el backend?",
    "wasabi.prefix": "wasabi",
    "clear_confirm": "¿Limpiar todo el historial?",
    "page.title": "Haiku 50",
  },
  it: {
    "hero.desc": 'Inserisci da 3 a 7 parole o brevi frasi — poi aggiungi piccantezza con il pulsante "50 wasabi".',
    "kicker.label": "Haiku",
    "empty.title": "Ancora nessun haiku",
    "empty.copy": 'Inserisci le parole e premi "Genera"',
    "keywords.heading": "Parole chiave",
    "keywords.placeholder": "sakura, pioggia, silenzio, treno, crepuscolo",
    "keywords.clear": "Cancella",
    "keywords.count_needed": "Servono 3–7",
    "keywords.count_fmt": "{n} di 3–7 ✓",
    "lang.title": "Lingua",
    "wasabi.default": "50 wasabi",
    "wasabi.more": "Più wasabi!",
    "wasabi.cool": "Raffredda",
    "wasabi.heat": "Piccantezza: {n}/6",
    "wasabi.max": "🌶 Massima piccantezza — tocca di nuovo per raffreddare",
    "history.heading": "Cronologia",
    "history.clear": "Cancella",
    "history.empty": "Ancora nessun haiku",
    "history.count": "{n} salvati",
    "result.loading": "Componendo i versi…",
    "result.generate": "Genera haiku",
    "result.generating": "Generazione…",
    "info.title": "5·7·5",
    "info.desc": "Un haiku — tre versi, un respiro. Le parole creano l'immagine, il wasabi l'atmosfera.",
    "error.min_keywords": "Inserisci almeno 3 parole chiave o brevi frasi",
    "error.max_keywords": "Massimo 7 parole chiave consentite",
    "error.no_lang": "Scegli una lingua di generazione",
    "error.empty_response": "Risposta vuota dal server",
    "error.server_unreachable": "Server irraggiungibile — il backend è in esecuzione?",
    "wasabi.prefix": "wasabi",
    "clear_confirm": "Cancellare tutta la cronologia?",
    "page.title": "Haiku 50",
  },
  pl: {
    "hero.desc": 'Wpisz od 3 do 7 słów lub krótkich fraz — dodaj ostrości przyciskiem "50 wasabi".',
    "kicker.label": "Haiku",
    "empty.title": "Jeszcze nie ma haiku",
    "empty.copy": 'Wpisz słowa i naciśnij "Generuj"',
    "keywords.heading": "Słowa kluczowe",
    "keywords.placeholder": "sakura, deszcz, cisza, pociąg, zmierzch",
    "keywords.clear": "Wyczyść",
    "keywords.count_needed": "Potrzebne 3–7",
    "keywords.count_fmt": "{n} z 3–7 ✓",
    "lang.title": "Język",
    "wasabi.default": "50 wasabi",
    "wasabi.more": "Więcej wasabi!",
    "wasabi.cool": "Schłodź",
    "wasabi.heat": "Poziom ostrości: {n}/6",
    "wasabi.max": "🌶 Maksymalna ostrość — dotknij ponownie, aby schłodzić",
    "history.heading": "Historia",
    "history.clear": "Wyczyść",
    "history.empty": "Jeszcze nie ma haiku",
    "history.count": "Zapisano: {n}",
    "result.loading": "Układanie wersów…",
    "result.generate": "Generuj haiku",
    "result.generating": "Generowanie…",
    "info.title": "5·7·5",
    "info.desc": "Haiku — trzy wersy, jeden oddech. Słowa tworzą obraz, wasabi nadaje nastrój.",
    "error.min_keywords": "Wprowadź co najmniej 3 słowa kluczowe lub krótkie frazy",
    "error.max_keywords": "Maksymalnie 7 słów kluczowych",
    "error.no_lang": "Wybierz język generowania",
    "error.empty_response": "Pusta odpowiedź z serwera",
    "error.server_unreachable": "Serwer nieosiągalny — czy backend jest uruchomiony?",
    "wasabi.prefix": "wasabi",
    "clear_confirm": "Wyczyścić całą historię?",
    "page.title": "Haiku 50",
  },
  pt: {
    "hero.desc": 'Digite de 3 a 7 palavras ou frases curtas — adicione calor com o botão "50 wasabi".',
    "kicker.label": "Haikai",
    "empty.title": "Nenhum haikai ainda",
    "empty.copy": 'Digite palavras e pressione "Gerar"',
    "keywords.heading": "Palavras-chave",
    "keywords.placeholder": "sakura, chuva, silêncio, trem, crepúsculo",
    "keywords.clear": "Limpar",
    "keywords.count_needed": "3–7 necessárias",
    "keywords.count_fmt": "{n} de 3–7 ✓",
    "lang.title": "Idioma",
    "wasabi.default": "50 wasabi",
    "wasabi.more": "Mais wasabi!",
    "wasabi.cool": "Esfriar",
    "wasabi.heat": "Nível de ardência: {n}/6",
    "wasabi.max": "🌶 Máximo — toque novamente para esfriar",
    "history.heading": "Histórico",
    "history.clear": "Limpar",
    "history.empty": "Nenhum haikai ainda",
    "history.count": "{n} salvo(s)",
    "result.loading": "Compondo os versos…",
    "result.generate": "Gerar haikai",
    "result.generating": "Gerando…",
    "info.title": "5·7·5",
    "info.desc": "Um haikai — três versos, uma respiração. As palavras criam a imagem, o wasabi define o clima.",
    "error.min_keywords": "Digite pelo menos 3 palavras-chave ou frases curtas",
    "error.max_keywords": "Máximo de 7 palavras-chave permitidas",
    "error.no_lang": "Escolha um idioma de geração",
    "error.empty_response": "Resposta vazia do servidor",
    "error.server_unreachable": "Servidor inacessível — o backend está funcionando?",
    "wasabi.prefix": "wasabi",
    "clear_confirm": "Limpar todo o histórico?",
    "page.title": "Haiku 50",
  },
  ar: {
    "hero.desc": 'أدخل من 3 إلى 7 كلمات أو عبارات قصيرة — ثم أضف الحرارة بزر "50 واسابي".',
    "kicker.label": "هايكو",
    "empty.title": "لا يوجد هايكو بعد",
    "empty.copy": 'أدخل الكلمات واضغط "توليد"',
    "keywords.heading": "كلمات مفتاحية",
    "keywords.placeholder": "ساكورا، مطر، صمت، قطار، غسق",
    "keywords.clear": "مسح",
    "keywords.count_needed": "3–7 مطلوبة",
    "keywords.count_fmt": "{n} من 3–7 ✓",
    "lang.title": "اللغة",
    "wasabi.default": "50 واسابي",
    "wasabi.more": "المزيد من الوسابي!",
    "wasabi.cool": "تبريد",
    "wasabi.heat": "مستوى الحرارة: {n}/6",
    "wasabi.max": "🌶 أقصى حرارة — اضغط مرة أخرى للتبريد",
    "history.heading": "السجل",
    "history.clear": "مسح",
    "history.empty": "لا يوجد هايكو بعد",
    "history.count": "تم حفظ {n}",
    "result.loading": "نظم الأبيات…",
    "result.generate": "توليد هايكو",
    "result.generating": "جارٍ التوليد…",
    "info.title": "5·7·5",
    "info.desc": "الهايكو — ثلاثة أسطر، نفس واحد. الكلمات ترسم الصورة، الوسابي يضبط المزاج.",
    "error.min_keywords": "أدخل 3 كلمات مفتاحية أو عبارات قصيرة على الأقل",
    "error.max_keywords": "الحد الأقصى 7 كلمات مفتاحية",
    "error.no_lang": "اختر لغة التوليد",
    "error.empty_response": "استجابة فارغة من الخادم",
    "error.server_unreachable": "الخادم غير متاح — هل الخلفية قيد التشغيل؟",
    "wasabi.prefix": "وسابي",
    "clear_confirm": "مسح كل السجل؟",
    "page.title": "Haiku 50",
  },
};

// ===== Translation helper =====
function t(key, ...args) {
  let str = (TRANS[state.lang] && TRANS[state.lang][key]);
  if (str === undefined) {
    str = TRANS.en[key] || key;
  }
  if (args.length > 0) {
    str = str.replace(/\{(\d+)\}/g, (_, idx) => args[Number(idx)]);
    str = str.replace(/\{n\}/g, args[0]);
  }
  return str;
}

const LANGS = [
  { code: "uk", label: "Ukrainian", native: "Українська" },
  { code: "en", label: "English", native: "English" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "pl", label: "Polish", native: "Polski" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "ar", label: "Arabic", native: "العربية" },
];

const SPICE = [
  "Calm, traditional, contemplative haiku about nature and transience.",
  "A light, quiet sketch with a gentle mood.",
  "Slightly unexpected, with subtle irony.",
  "Playful, with humor and a surprising twist.",
  "Bold and sharp, with an absurd image.",
  "Very spicy, chaotic, grotesque and funny.",
  "Maximum heat: absurd, chaotic, surreal and dark-humored — yet still three lines of haiku.",
];

const state = {
  keywords: "",
  lang: "",
  spice: 0,
  resultState: "empty",
  errorMsg: "",
  lines: [],
  doneLang: "",
  doneSpice: "",
  history: [],
};

const els = {};

function labelOf(code) {
  const lang = LANGS.find((item) => item.code === code);
  return lang ? lang.label : "";
}

function nativeOf(code) {
  const lang = LANGS.find((item) => item.code === code);
  return lang ? lang.native : "";
}

function cap(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

function phrases() {
  return state.keywords
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

// ===== Translate static UI =====
function translateUI() {
  document.documentElement.lang = state.lang || "en";
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  els.pageTitle.textContent = t("page.title");
  els.heroDesc.textContent = t("hero.desc");
  els.kickerLabel.textContent = t("kicker.label");
  els.keywordsHeading.textContent = t("keywords.heading");
  els.keywords.placeholder = t("keywords.placeholder");
  els.clearKeywords.textContent = t("keywords.clear");
  els.langTitle.textContent = t("lang.title");
  els.historyHeading.textContent = t("history.heading");
  els.historyClear.textContent = t("history.clear");
  els.infoTitle.textContent = t("info.title");
  els.infoDesc.textContent = t("info.desc");
}

// ===== RENDER =====
function renderEmpty() {
  els.resultStage.innerHTML = `
    <div class="empty-state">
      <div class="empty-ring"></div>
      <div class="empty-title">${t("empty.title")}</div>
      <div class="empty-copy">${t("empty.copy")}</div>
    </div>`;
  els.doneMeta.classList.add("is-hidden");
}

function renderLoading() {
  els.resultStage.innerHTML = `
    <div class="loader">
      <div class="loader-ring"></div>
      <div class="loader-text">${t("result.loading")}</div>
    </div>`;
  els.doneMeta.classList.add("is-hidden");
}

function renderError() {
  els.resultStage.innerHTML = `
    <div class="error-state">
      <div class="error-icon">!</div>
      <div class="error-text">${state.errorMsg}</div>
    </div>`;
  els.doneMeta.classList.add("is-hidden");
}

function renderDone() {
  els.resultStage.innerHTML = '<div class="done-state"></div>';
  const wrap = els.resultStage.querySelector(".done-state");
  state.lines.forEach((line) => {
    const item = document.createElement("div");
    item.className = "haiku-line";
    item.textContent = line;
    wrap.append(item);
  });
  els.doneMeta.innerHTML = "";
  const lang = document.createElement("span");
  lang.textContent = state.doneLang;
  const spice = document.createElement("span");
  spice.textContent = state.doneSpice;
  els.doneMeta.append(lang, spice);
  els.doneMeta.classList.remove("is-hidden");
}

function renderResult() {
  if (state.resultState === "loading") renderLoading();
  else if (state.resultState === "error") renderError();
  else if (state.resultState === "done") renderDone();
  else renderEmpty();
}

function renderKeywords() {
  if (els.keywords.value !== state.keywords) {
    els.keywords.value = state.keywords;
  }
  const count = phrases().length;
  els.countLabel.textContent =
    count === 0
      ? t("keywords.count_needed")
      : (count >= 3 && count <= 7)
        ? t("keywords.count_fmt", count)
        : count + " / 3–7";
  els.clearKeywords.disabled = count === 0;
}

function renderLanguage() {
  els.langGrid.innerHTML = "";
  LANGS.forEach((lang) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-btn";
    btn.classList.toggle("is-selected", state.lang === lang.code);
    btn.innerHTML = `${lang.label} <span class="lang-native">${lang.native}</span>`;
    btn.addEventListener("click", () => {
      state.lang = lang.code;
      render();
    });
    els.langGrid.append(btn);
  });
}

function renderWasabi() {
  els.wasabiDots.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement("span");
    dot.className = "wasabi-dot";
    dot.classList.toggle("is-active", i < state.spice);
    dot.classList.toggle("is-max", state.spice === 6 && i < 6);
    els.wasabiDots.append(dot);
  }
  els.spiceLabel.textContent = t("wasabi.heat", state.spice);
  els.spiceLabel.classList.toggle("is-active", state.spice > 0);
  els.spiceLabel.classList.toggle("is-max", state.spice === 6);
  els.spiceMax.classList.toggle("is-hidden", state.spice !== 6);
  els.spiceMax.textContent = t("wasabi.max");
  els.wasabiButton.classList.toggle("is-max", state.spice === 6);
  let btnText;
  if (state.spice === 0) {
    btnText = t("wasabi.default");
  } else if (state.spice === 6) {
    btnText = t("wasabi.cool");
  } else {
    btnText = t("wasabi.more");
  }
  els.wasabiBtnText.textContent = btnText;
}

function renderHistory() {
  els.historyCount.textContent = state.history.length > 0
    ? t("history.count", state.history.length)
    : "";
  els.historyEmpty.classList.toggle("is-hidden", state.history.length > 0);
  els.historyEmpty.textContent = t("history.empty");
  els.historyList.classList.toggle("is-hidden", state.history.length === 0);
  els.historyList.innerHTML = "";
  if (state.history.length === 0) return;

  const maxShow = 20;
  state.history.slice(0, maxShow).forEach((item) => {
    const card = document.createElement("div");
    card.className = "history-item";
    card.title = t("keywords.heading") + " + " + t("lang.title");

    const lines = document.createElement("div");
    lines.className = "history-lines";
    item.lines.forEach((line) => {
      const row = document.createElement("div");
      row.textContent = line;
      lines.append(row);
    });

    const tags = document.createElement("div");
    tags.className = "history-tags";
    const lang = document.createElement("span");
    lang.textContent = item.langLabel;
    const spice = document.createElement("span");
    spice.textContent = t("wasabi.prefix") + " " + item.spice;
    const time = document.createElement("span");
    time.textContent = item.timeLabel;
    tags.append(lang, spice, time);

    card.append(lines, tags);
    card.addEventListener("click", () => {
      state.keywords = item.originalKeywords || "";
      state.lang = item.langCode || "";
      render();
    });
    els.historyList.append(card);
  });
}

function renderGenerateButton() {
  const loading = state.resultState === "loading";
  els.generateButton.textContent = loading ? t("result.generating") : t("result.generate");
  els.generateButton.disabled = loading;
}

function render() {
  translateUI();
  renderResult();
  renderKeywords();
  renderLanguage();
  renderWasabi();
  renderHistory();
  renderGenerateButton();
}

// ===== GENERATE =====
async function generate() {
  if (state.resultState === "loading") return;

  const parts = phrases();
  if (parts.length < 3) {
    state.resultState = "error";
    state.errorMsg = t("error.min_keywords");
    render();
    return;
  }
  if (parts.length > 7) {
    state.resultState = "error";
    state.errorMsg = t("error.max_keywords");
    render();
    return;
  }
  if (!state.lang) {
    state.resultState = "error";
    state.errorMsg = t("error.no_lang");
    render();
    return;
  }

  const langName = labelOf(state.lang);
  const spice = state.spice;
  state.resultState = "loading";
  state.errorMsg = "";
  render();

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keywords: state.keywords,
        language: state.lang,
        spiceLevel: spice,
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      state.resultState = "error";
      state.errorMsg = data.error || t("error.empty_response");
      render();
      return;
    }

    const lines = (data.lines || data.haiku.split("\n")).filter(Boolean).slice(0, 3);
    if (lines.length === 0) {
      state.resultState = "error";
      state.errorMsg = t("error.empty_response");
      render();
      return;
    }

    const date = new Date();
    const timeLabel =
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0");
    const item = {
      id: Date.now(),
      lines,
      langLabel: langName,
      langCode: state.lang,
      originalKeywords: state.keywords,
      spice,
      timeLabel,
    };

    // Save to localStorage (max 100)
    const history = [item, ...state.history].slice(0, 100);
    try {
      localStorage.setItem("haiku50_history", JSON.stringify(history));
    } catch (_) {}

    state.resultState = "done";
    state.lines = lines;
    state.doneLang = langName;
    state.doneSpice = t("wasabi.prefix") + " " + spice;
    state.history = history;
    render();
  } catch (err) {
    state.resultState = "error";
    state.errorMsg = t("error.server_unreachable");
    render();
  }
}

// ===== HISTORY LOAD =====
function loadHistory() {
  try {
    const raw = localStorage.getItem("haiku50_history");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) state.history = parsed.slice(0, 100);
    }
  } catch (_) {}
}

function clearHistory() {
  if (!confirm(t("clear_confirm"))) return;
  state.history = [];
  try { localStorage.removeItem("haiku50_history"); } catch (_) {}
  render();
}

// ===== BIND =====
function bindElements() {
  els.pageTitle = document.getElementById("page-title");
  els.heroDesc = document.getElementById("hero-desc");
  els.kickerLabel = document.getElementById("kicker-label");
  els.keywordsHeading = document.getElementById("keywords-heading");
  els.langTitle = document.getElementById("lang-title");
  els.historyHeading = document.getElementById("history-heading");
  els.historyClear = document.getElementById("history-clear");
  els.infoTitle = document.getElementById("info-title");
  els.infoDesc = document.getElementById("info-desc");

  els.resultStage = document.getElementById("result-stage");
  els.doneMeta = document.getElementById("done-meta");
  els.keywords = document.getElementById("keywords");
  els.countLabel = document.getElementById("count-label");
  els.clearKeywords = document.getElementById("clear-keywords");
  els.langGrid = document.getElementById("lang-grid");
  els.wasabiButton = document.getElementById("wasabi-button");
  els.wasabiBtnText = document.getElementById("wasabi-btn-text");
  els.wasabiDots = document.getElementById("wasabi-dots");
  els.spiceLabel = document.getElementById("spice-label");
  els.spiceMax = document.getElementById("spice-max");
  els.historyCount = document.getElementById("history-count");
  els.historyEmpty = document.getElementById("history-empty");
  els.historyList = document.getElementById("history-list");
  els.generateButton = document.getElementById("generate-button");
}

function bindEvents() {
  els.keywords.addEventListener("input", (e) => {
    state.keywords = e.target.value;
    renderKeywords();
  });

  els.clearKeywords.addEventListener("click", () => {
    state.keywords = "";
    els.keywords.value = "";
    renderKeywords();
  });

  els.wasabiButton.addEventListener("click", () => {
    if (state.spice === 6) {
      state.spice = 0;
    } else {
      state.spice = state.spice + 1;
    }
    renderWasabi();
  });

  els.generateButton.addEventListener("click", generate);

  if (els.historyClear) {
    els.historyClear.addEventListener("click", clearHistory);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  loadHistory();
  bindEvents();
  render();
});
