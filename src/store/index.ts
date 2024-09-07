import { combineReducers, configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './categories/categoriesSlice'
import productsSlice from './Products/productsSlice'
import cartSlice from './cart/cartSlice'
import wishlistSlice from './wishlist/wishlistSlice'
import authSlice from './auth/authSlice'
import ordersSlice from './orders/ordersSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    } from "redux-persist";
import storage from 'redux-persist/lib/storage'


const rootPersistConfig = {
    key : "root",
    storage,
    whiteList: ["cart" , "auth"]
}

const authPersistConfig ={
    key : "auth",
    storage,
    whiteList : ["user" , "accessToken"]
}

// determine which one to be saved in cache or not
const cartPersistConfig ={
    key : "cart",
    storage,
    whiteList : ["items"]
}

// const wishlistPersistConfig ={
//     key : "wishlist",
//     storage,
//     whiteList : ["itemsId"]
// }


const persistedCartReducer = persistReducer(cartPersistConfig , cartSlice) 
// const persistedWishlistReducer = persistReducer(wishlistPersistConfig , wishlistSlice) 

const rootReducer = combineReducers({
    categories : categoriesSlice ,
    products : productsSlice,
    cart : persistedCartReducer,
    wishlist : wishlistSlice,
    auth: persistReducer(authPersistConfig , authSlice) ,
    orders: ordersSlice
})

const persistedReducer = persistReducer(rootPersistConfig , rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions : [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
            },
        }),
})


// export const store = configureStore({
//     reducer: {
//         categories : categoriesSlice ,
//         products : productsSlice,
//         cart : cartSlice
//     },
// })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store)
export {store , persistor}

