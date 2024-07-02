import { createAsyncThunk,createSlice,createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    activeFilter: 'all',
    filtersLoadingStatus: 'idle'
});


export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters");
    }
);

const filterSlice = createSlice({
    name:'filterSlice',
    initialState,
    reducers:{
        activeFilterChanged:(state,action) => {
            state.activeFilter = action.payload
        }
    },
    extraReducers:(builder) => {
        builder
                .addCase(fetchFilters.pending, (state)=> {state.filtersLoadingStatus = 'loading'})
                .addCase(fetchFilters.fulfilled, (state,action) => {
                    state.filtersLoadingStatus = 'idle'
                    filtersAdapter.setMany(state,action.payload);
                })
                .addCase(fetchFilters.rejected, (state) => {state.filtersLoadingStatus = 'error'})
                .addDefaultCase(()=>{})
    }
})

const {actions,reducer:filterReducer} = filterSlice;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filterReducer)

export const {activeFilterChanged,filtersFetched,filtersFetching,filtersFetchingError} = actions;

export default filterReducer