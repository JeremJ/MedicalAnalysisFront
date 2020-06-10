const CONFIG = {
    FRONTEND: 'http://localhost:3000',
    HOST: 'http://localhost:8081',
    KEYCLOAK: 'http://localhost:8019/'
};

export const LOGOUT = `${CONFIG.KEYCLOAK}auth/realms/MedicalAnalysis/protocol/openid-connect/logout?redirect_uri=${CONFIG.FRONTEND}`;

export default CONFIG;