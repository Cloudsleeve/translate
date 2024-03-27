const text = `<div>Super Fast. Super Light.<br>Airflow Speed<p>Super Fast. Super Light. Super Smooth.</p></div>57℃ Intelligent Constant Temperature`;
const translationData = {
    "Super Fast. Super Light.": "Süper Hızlı. Süper Hafif.",
    "Airflow Speed": "Hava Akışı Hızı",
    "Super Fast. Super Light. Super Smooth.": "Süper Hızlı. Süper Hafif. Süper Pürüzsüz.",
    "57℃ Intelligent": "57℃ Akıllı",
    "Constant Temperature": "Sabit Sıcaklık",
    "High-Speed Hair Dryer": "Yüksek Hızlı Kremleme Makinesi",
    "57℃ Intelligent Constant Temperature": "57℃ Akıllı Sabit Sıcaklık"
};

function translateTextToTurkish(data, translations) {
    // 按照从长到短的顺序处理翻译项，避免短词匹配影响长复合词
    const sortedTranslations = Object.entries(translations).sort((a, b) => b[0].length - a[0].length);

    for (const [englishWord, turkishTranslation] of sortedTranslations) {
        if (data.includes(englishWord)) {
            data = data.replace(new RegExp(englishWord, 'g'), turkishTranslation);
        }
    }
    return data;
}

// 使用翻译数据替换文本中的英文短语
const translatedText = translateTextToTurkish(text, translationData);
console.log(translatedText);
