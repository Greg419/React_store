// formatPrice: 將數字轉為 人民幣價格 的格式
export const formatPrice = cent => {
    return (cent / 100).toLocaleString('zh', {
        style: 'currency',
        currency: 'CNY'
    });
};

export const formatPrice_TestSecondExport = cent => {
    return (cent / 100).toLocaleString('zh', {
        style: 'currency',
        currency: 'CNY'
    });
};