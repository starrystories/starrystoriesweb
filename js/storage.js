/**
 * StarryStories Web App - Storage
 * localStorage helpers for persisting user preferences
 */

const STORAGE_KEYS = {
    LANGUAGE: 'starry_language',
    CATEGORY: 'starry_category',
    DEVICE_ID: 'starry_device_id',
    TRIAL_STATUS: 'starry_trial_status'
};

/**
 * Generate a unique device ID
 * @returns {string}
 */
function generateDeviceId() {
    return 'web-' + crypto.randomUUID();
}

/**
 * Get or create device ID
 * @returns {string}
 */
function getDeviceId() {
    let deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (!deviceId) {
        deviceId = generateDeviceId();
        localStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
    }
    return deviceId;
}

/**
 * Save selected language
 * @param {string} language 
 */
function saveLanguage(language) {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
}

/**
 * Get saved language
 * @returns {string|null}
 */
function getLanguage() {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE);
}

/**
 * Save selected category
 * @param {string} category 
 */
function saveCategory(category) {
    localStorage.setItem(STORAGE_KEYS.CATEGORY, category);
}

/**
 * Get saved category
 * @returns {string|null}
 */
function getCategory() {
    return localStorage.getItem(STORAGE_KEYS.CATEGORY);
}

/**
 * Save trial status
 * @param {Object} status 
 */
function saveTrialStatus(status) {
    localStorage.setItem(STORAGE_KEYS.TRIAL_STATUS, JSON.stringify(status));
}

/**
 * Get trial status
 * @returns {Object|null}
 */
function getTrialStatus() {
    const stored = localStorage.getItem(STORAGE_KEYS.TRIAL_STATUS);
    return stored ? JSON.parse(stored) : null;
}

/**
 * Clear all stored data
 */
function clearAll() {
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
}

// Export
window.Storage = {
    getDeviceId,
    saveLanguage,
    getLanguage,
    saveCategory,
    getCategory,
    saveTrialStatus,
    getTrialStatus,
    clearAll,
    KEYS: STORAGE_KEYS
};
