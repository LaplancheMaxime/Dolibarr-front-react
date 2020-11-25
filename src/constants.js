const prod = {
    url: {
        API_URL: 'https://dolibarr.maxime-laplanche.fr/api',
    }
};

const dev = {
    url: {
        API_URL: 'http://localhost:8083/api',
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
