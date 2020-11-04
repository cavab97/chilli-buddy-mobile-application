import { auth } from "../../marslab-library-react-native/utils/helper";

export const { providers } = auth;

export function initialize(config){
    auth.initialize(config)
}

export function login(provider, info) {
    return new Promise(async (resolve, reject) => {
        auth.login(provider, info)
            .then(user => {
                resolve( user );
            })
            .catch(( error ) => {
                reject(error );
            });
    });
}

export function logout() {
    return new Promise(async (resolve, reject) => {
        auth.logout()
            .then(({status}) => {
                resolve({status});
            })
            .catch(( error ) => {
                reject( error );
            });
    });
}

export function isAuthenticated(onIdTokenChanged) {
    auth.isAuthenticated(onIdTokenChanged);
}

export function resetPassword(email) {
    return new Promise(async (resolve, reject) => {
        auth.resetPassword(email)
            .then(({status}) => {
                resolve({status});
            })
            .catch(( error ) => {
                reject( error );
            });
    });
}
