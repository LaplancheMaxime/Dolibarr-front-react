const prod = {
    url: {
        API_URL: 'https://dolibarr.mltech.fr/api/index.php',
    }
};

const dev = {
    url: {
        API_URL: 'http://localhost:8083/api/index.php',
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
