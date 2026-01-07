/**
 * StarryStories Web App - API Service
 * Backend communication with Basic Auth
 */

// Use Cloud Run Proxy for HTTPS
const API_BASE_URL = 'https://starry-proxy-aza7qtijlq-el.a.run.app';

// Encoded credentials (not secure, just obfuscated)
const _e = (s) => atob(s).split('').reverse().join('');
const _c = {
    u: 'cmVzdXNlaXJvdHN5cnJhdHM=', // reversed + base64
    p: 'T1pLaEtHR1hkd3NPSGpOSDBkZFM3WkhzeXE3WU1xelg=' // reversed + base64
};

const API_CREDENTIALS = {
    username: _e(_c.u),
    password: _e(_c.p)
};

// Generate auth header
const authHeader = 'Basic ' + btoa(`${API_CREDENTIALS.username}:${API_CREDENTIALS.password}`);

function getAuthHeaders(includeContentType = true) {
    const headers = {
        'Authorization': authHeader
    };
    if (includeContentType) {
        headers['Content-Type'] = 'application/json';
    }
    return headers;
}

/**
 * Fetch stories for a category
 * @param {string} language - Language code (en, hi, ml, etc.)
 * @param {string} category - Category ID
 * @param {string[]} excludeTitles - Titles to exclude
 * @returns {Promise<{stories: Array, hasMore: boolean}>}
 */
async function getStories(language, category, excludeTitles = []) {
    const timestamp = Date.now();
    let url = `${API_BASE_URL}/stories?language=${language}&category=${category}&_t=${timestamp}`;

    if (excludeTitles.length > 0) {
        url += `&exclude=${encodeURIComponent(JSON.stringify(excludeTitles))}`;
    }

    console.log(`🌐 GET ${url}`);

    const response = await fetch(url, {
        headers: {
            ...getAuthHeaders(false), // No Content-Type for GET
            'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            console.error('🔒 Auth Failed:', response.statusText);
        }
        throw new Error(`Failed to fetch stories: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Play a story - get audio and content
 * @param {Object} story - Story object
 * @param {string} language - Language code
 * @param {number} duration - 5 or 10 minutes
 * @param {string} voice - 'male' or 'female'
 * @param {string} childName - Optional child name for personalization
 * @returns {Promise<{audioUrl: string, storyText: string, images: Array}>}
 */
async function playStory(story, language, duration = 5, voice = 'female', childName = '') {
    const endpoint = `${API_BASE_URL}/story/play`;
    const payload = {
        storyId: story.storyId,
        language,
        duration,
        voice,
        originalTitle: story.originalTitle,
        sourceUrl: story.sourceUrl,
        contentLanguage: story.contentLanguage,
        estimatedWordCount: story.estimatedWordCount
    };

    // Add child name if provided
    if (childName) {
        payload.childName = childName;
    }

    console.log(`🌐 POST ${endpoint}`, payload);

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: getAuthHeaders(true),
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error('Failed to play story');
    }

    return response.json();
}

/**
 * Device login - register device for trial
 * @param {string} deviceId - Unique device ID
 * @returns {Promise<Object>}
 */
async function deviceLogin(deviceId) {
    const endpoint = `${API_BASE_URL}/auth/device-login`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: getAuthHeaders(true),
        body: JSON.stringify({ deviceId })
    });

    if (!response.ok) {
        throw new Error('Device login failed');
    }

    return response.json();
}

// Export for use in other modules
window.API = {
    getStories,
    playStory,
    deviceLogin,
    BASE_URL: API_BASE_URL
};
