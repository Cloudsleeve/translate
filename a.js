const originalData = {
    "header": "Super Fast. Super Light.",
    "title": "<div>Airflow Speed</div>",
    "subtitle": "Super Fast. Super Light. Super Smooth.",
    "text": "57℃ Intelligent<br>Constant Temperature"
};

const translationData = {
    "Super Fast. Super Light.": "Süper Hızlı. Süper Hafif.",
    "Airflow Speed": "Hava Akışı Hızı",
    "Super Fast. Super Light. Super Smooth.": "Süper Hızlı. Süper Hafif. Süper Pürüzsüz.",
    "57℃ Intelligent": "57℃ Akıllı",
    "Constant Temperature": "Sabit Sıcaklık"
};

// 将所有翻译数据键转换为小写以便忽略大小写进行匹配
const caseInsensitiveTranslationData = {};
for (const key in translationData) {
    caseInsensitiveTranslationData[key.toLowerCase()] = translationData[key];
}

// 通用翻译函数
function translateHTML(originalData, translationData) {
    const translatedData = {};

    for (const key in originalData) {
        let translatedValue = originalData[key];

        // 使用正则表达式将字符串中的文本进行翻译
        translatedValue = translatedValue.replace(/([^<]+)|(<[^>]+>)/g, (match, text, tag) => {
            // 如果是 HTML 标签，则直接返回，否则进行翻译
            if (tag) return match;
            return caseInsensitiveTranslationData[text.toLowerCase()] || text;
        });

        translatedData[key] = translatedValue;
    }

    return translatedData;
}

// 翻译原始数据
const translatedResult = translateHTML(originalData, translationData);

// 输出结果
console.log(JSON.stringify(translatedResult, null, 2));
