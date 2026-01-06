/**
 * StarryStories Web App - Data Constants
 * Categories, Languages, and shared data
 */

// Language definitions
const LANGUAGES = {
    english: [
        { code: 'en', name: 'English', nativeName: 'English' }
    ],
    indian: [
        { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
        { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
        { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
        { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
        { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
        { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
        { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' }
    ],
    other: [
        { code: 'es', name: 'Spanish', nativeName: 'Español' },
        { code: 'fr', name: 'French', nativeName: 'Français' },
        { code: 'de', name: 'German', nativeName: 'Deutsch' },
        { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
        { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
    ]
};

// Category definitions
const CATEGORIES = [
    { id: 'children_stories', icon: '📚', label: 'Stories for Kids' },
    { id: 'calm_bedtime', icon: '🌙', label: 'Calm Bedtime' },
    { id: 'fantasy_soft', icon: '✨', label: 'Soft Fantasy' },
    { id: 'animal_friends', icon: '🐰', label: 'Animal Friends' },
    { id: 'family_love', icon: '❤️', label: 'Family Love' },
    { id: 'moral_values', icon: '⭐', label: 'Moral Values' },
    { id: 'self_confidence', icon: '💪', label: 'Self Confidence' },
    { id: 'gratitude_and_kindness', icon: '🙏', label: 'Gratitude & Kindness' },
    { id: 'nature_and_world', icon: '🌿', label: 'Nature & World' },
    { id: 'village_and_home', icon: '🏡', label: 'Village & Home' },
    { id: 'dream_journeys', icon: '🌈', label: 'Dream Journeys' },
    { id: 'christian_stories', icon: '✝️', label: 'Christian Stories' },
    { id: 'hindu_stories', icon: '🕉️', label: 'Hindu Stories' },
    { id: 'islamic_stories', icon: '☪️', label: 'Islamic Stories' },
    { id: 'epic_stories', icon: '🏹', label: 'Epic Stories' }
];

// Categories available for each language type
const NON_ENGLISH_CATEGORIES = ['children_stories', 'christian_stories', 'hindu_stories', 'islamic_stories'];
const INDIAN_LANGUAGE_CODES = ['hi', 'ml', 'ta', 'te', 'kn', 'mr', 'bn'];

/**
 * Get categories for a specific language
 * @param {string} language - Language code
 * @returns {Array}
 */
function getCategoriesForLanguage(language) {
    if (language === 'en') {
        // English: all categories except children_stories
        return CATEGORIES.filter(c => c.id !== 'children_stories');
    }

    // Non-English: limited categories
    let available = CATEGORIES.filter(c => NON_ENGLISH_CATEGORIES.includes(c.id));

    // Add epic stories for Indian languages
    if (INDIAN_LANGUAGE_CODES.includes(language)) {
        const epic = CATEGORIES.find(c => c.id === 'epic_stories');
        if (epic) available.push(epic);
    }

    return available;
}

/**
 * Get all languages as flat array
 * @returns {Array}
 */
function getAllLanguages() {
    return [...LANGUAGES.english, ...LANGUAGES.indian, ...LANGUAGES.other];
}

/**
 * Get language by code
 * @param {string} code 
 * @returns {Object|undefined}
 */
function getLanguageByCode(code) {
    return getAllLanguages().find(l => l.code === code);
}

// Export
window.Data = {
    LANGUAGES,
    CATEGORIES,
    getCategoriesForLanguage,
    getAllLanguages,
    getLanguageByCode,
    INDIAN_LANGUAGE_CODES
};
