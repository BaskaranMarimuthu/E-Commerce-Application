import {createSlice} from "@reduxjs/toolkit"

const productSlice = createSlice({
    name:"product",
    initialState:{
    products:[],
    productCount:0,
    loading:false,
    error:null,
},
reducer:{},
extraReducers:(builders)=>{},
})