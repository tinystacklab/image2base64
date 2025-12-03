export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const urlToBase64 = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        return await fileToBase64(blob);
    } catch (error) {
        console.error('Error converting URL to base64:', error);
        throw error;
    }
};

export const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Unsupported file type. Please upload JPG, PNG, GIF, WEBP, or SVG.' };
    }
    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
        return { valid: false, error: 'File size too large. Maximum size is 10MB.' };
    }
    return { valid: true };
};
