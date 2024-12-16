const apiUrl = 'http://localhost:5513/api'

export const ApiEndpoint = {
Auth:{
Register: `${apiUrl}/users/register`,
Login: `${apiUrl}/users/login`,
Me: `${apiUrl}/users/me`,
},
};

export const LocalStorage = {
    token : 'USER_TOKEN',
};