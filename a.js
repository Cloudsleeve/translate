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

// 匹配文本中的英文短语，并替换成土耳其语的翻译
const translatedText = text.replace(/[a-zA-Z\s.℃]+/g, match => {
    // 检查匹配到的短语是否在translationData中有对应的翻译，如果有则返回翻译，否则返回原文
    return translationData[match.trim()] || match;
});

console.log(translatedText);
