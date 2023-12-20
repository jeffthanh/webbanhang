const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQ: 'faqs',
    DETAIL_PRODUCT__PID__TITLE: 'san-pham/:pid/:name',
    DETAIL_PRODUCT: 'san-pham',
    CART: 'cart',
    PAYMENT:'payment',
    //admin
    ADMIN: 'admin',
    MANAGE_PRODUCTS: 'manage-products',
    CREATE_PRODUCTS: 'create-products',
    MANAGE_CATEGORY: 'manage-category',
    CREATE_CATEGORY: 'create-category',
    EDIT_CATEGORY: 'edit-category/:id',
    EDIT_PRODUCT: 'edit-product/:id',


    MANAGE_ORDERS: 'manage-orders',
    EDIT_ORDER: 'edit-order/:id',
    DASHBOARD: 'dashboard',

    //member
    MEMBER: 'member',
    PERSONAL: 'personal',
    CHAGEPASSWORD:'chagepassword',
    ORDER:'order',
    EDITINFO:'edit-info',
    GET_ORDER: 'get-order/:id',
    PASSWORDNEW: 'passwordnew'
};

export default path;
