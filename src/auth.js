import firebase from './firebase';

export const isAuthenticated = async () => {
    const token = localStorage.getItem('userToken');
    await firebase.isInitialized().then(user => {
        if (user) {
            if (token) {

                return true;
            } else {
                return false;
            }
        }
    });
}


