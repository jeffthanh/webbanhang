import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const localStorageData = window.localStorage.getItem('persist:shop/user');

  if (localStorageData && typeof localStorageData === 'string') {
      const parsedData = JSON.parse(localStorageData);
      let accessToken = parsedData.token;
  
      // Loại bỏ ngoặc kép từ mã token nếu có
      accessToken = accessToken.replace(/"/g, '');
  
      if (accessToken) {
          // Thêm token vào header của yêu cầu
          config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
  }
  

    return config;
}, function (error) {
    // Xử lý lỗi yêu cầu
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Xử lý phản hồi thành công
    return response.data;
}, function (error) {
    // Xử lý lỗi phản hồi
    return error.request;
});

export default instance;