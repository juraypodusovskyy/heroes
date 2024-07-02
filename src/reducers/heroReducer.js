import { createAsyncThunk, createSlice,createEntityAdapter } from "@reduxjs/toolkit"
import { useHttp } from "../hooks/http.hook"

const heroAdapter = createEntityAdapter() 

const initialState = heroAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})

export const fetchHero = createAsyncThunk(
    'fetch/fetchHero',
     async (id) => {
     const {request} = useHttp()
        return await request("http://localhost:3001/heroes")
    }
)

const heroesSlice = createSlice({
    name:'heroes',
    initialState,
    reducers:{
        heroCreated:(state,action) => {
            heroAdapter.addOne(state,action.payload)
            // state.heroes.push(action.payload)
        },
        heroDeleted:(state,action) => {
            // state.heroes.filter(value => value.id !== action.payload)
            heroAdapter.removeOne(state,action.payload)
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchHero.pending,(state) => { state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHero.fulfilled,(state,action) => {
                state.heroesLoadingStatus = 'idle';
                heroAdapter.setAll(state,action.payload);
            })
            .addCase(fetchHero.rejected,(state) => { state.heroesLoadingStatus = 'error'})
            .addDefaultCase(()=>{})
    }
})

export const {selectAll} = heroAdapter.getSelectors(state => state.heroReducer);


const {actions,reducer:heroesReducer} = heroesSlice;

export default heroesReducer;

export const {heroesFetching,heroesFetched,heroesFetchingError,heroCreated,heroDeleted} = actions;