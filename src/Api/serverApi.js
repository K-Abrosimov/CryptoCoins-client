import axios from 'axios'



const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})
instance.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config


    if (error.response.status === 401 && error.config && !error.config._isRetry) {

        originalRequest._isRetry = true;
        try {
            const response = await axios.get('http://localhost:5000/Api/refresh', { withCredentials: true })
            localStorage.setItem('token', response.data.acsessToken)
            return instance.request(originalRequest)
        } catch (e) {
            console.log('User not authorized')
        }
    }
    throw error
})

export const authApi = {
    registration: (email, password) => {
        return instance.post('/registration', { email, password }).then(response => response)
    },
    login: (email, password) => {
        return instance.post('/login', { email, password }).then(response => response)
    },
    logout: () => {
        return instance.post('/logout').then(response => response)
    },
    sendActivayionLink: () => {
        return instance.get('/sendlink').then(response => response)
    }
}

export const profileApi = {
    getProfile: () => {
        return instance.get('/profile').then(response => response)
    },
    updateProfile: (payload) => {
        return instance.post('/profile/update', { payload }).then(response => response)
    },
    uploadProfileImage: (image) => {
        const file = new FormData()
        file.append('photo', image)
        return instance.post('/profile/image', file, { headers: { 'Content-Type': 'multipart/form-data' } }).then(responce => responce)
    },
    updateProfileStatus: (status) => {
        return instance.post('/profile/status', { status }).then(response => response)
    },


}

export const paymentApi = {
    createCheckoutSession: (priceId) => {
        return instance.post('/create-checkout-session', { priceId }).then(response => response)
    }
}

export const investmentsApi = {
    getInvestData: () => {
        return instance.get('/investment').then(responce => responce)
    }
}

export const adminApi = {
    checkAcsess: () => {

        return instance.get('/acsess').then(responce => {
            return responce
        })
    },
    addInfo: (investInfo) => {
        return instance.post('/addinfo', { investInfo }).then(responce => {
            return responce
        })
    },

    getInfo: () => {
        return instance.get('/getinfo').then(responce => {
            return responce
        })
    },
    updateInfo: (investInfo) => {
        return instance.post('/updateinfo', { investInfo }).then(responce => {
            return responce
        })
    },
    deleteInfo: (id) => {
        return instance.post('deleteinfo', { id }).then(responce => responce)
    }
}

export const investApi = {
    getInvestData: () => {
        return instance.get('/investment').then(responce => responce)
    }
}

export const supportApi = {

    getConversation: () => {
    
        return instance.get('/conversation').then(response => {
            debugger
            return response
        })
    },
    getMassages: (conversataionId) => {

        return instance.get('/message/' + conversataionId).then(response => {

            return response
        }
        )
    },
    sendMessage: (message) => {
        return instance.post('/message', message).then(response => response)
    }
}

export const userApi = {
    getUsers: () => {
        return instance.get('/users').then(response => {
            return response
        })
    },
    getUserById: (userId) => {
        return instance.get('/profile/' + userId).then(response => response)
    }
}