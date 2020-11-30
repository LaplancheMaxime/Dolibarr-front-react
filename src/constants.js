const common = {
    SITE_NAME: process.env.REACT_APP_SITE_NAME,
    SITE_DESCRIPTION: process.env.REACT_APP_SITE_DESCRIPTION,
    SITE_LOGO_URL: process.env.REACT_APP_SITE_LOGO_URL,

    MAIL_CONTACT: process.env.REACT_APP_MAIL_CONTACT,
        
    USER_CONTACT: process.env.REACT_APP_USER_CONTACT,
}

const prod = {
    common: common,
    url: {
        DOLIBARR_INSTANCE: process.env.REACT_APP_DOLIBARR_PROD_INSTANCE,
        API_URL: process.env.REACT_APP_API_PROD_ADDRESS,
    }
};

const dev = {
    common: common,
    url: {
        DOLIBARR_INSTANCE: process.env.REACT_APP_DOLIBARR_DEV_INSTANCE,
        API_URL: process.env.REACT_APP_API_DEV_ADDRESS,
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
