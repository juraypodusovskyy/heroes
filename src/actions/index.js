import { heroDeleted } from "../reducers/heroReducer"
// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }

// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const activeFilterChanged = (filter) => (dispatch) => {
//     setTimeout(()=> {
//         dispatch({
//             type: 'ACTIVE_FILTER_CHANGED',
//             payload: filter
//         })
//     },500)
// }

// export const heroCreated = (hero) => {
//     return {
//         type: 'HERO_CREATED',
//         payload: hero
//     }
// }

// export const heroDeleted = (id) => {
//     return {
//         type: 'HERO_DELETED',
//         payload: id
//     }
// }

// export const requestFilter = (request) => (dispatch) => {
//     dispatch(filtersFetching());
//     request("http://localhost:3001/filters")
//         .then(data => dispatch(filtersFetched(data)))
//         .catch(() => dispatch(filtersFetchingError()))
// } 

// export const requestHero = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//         request("http://localhost:3001/heroes")
//             .then(data => dispatch(heroesFetched(data)))
//             .catch(() => dispatch(heroesFetchingError()))
// }


export const deleteHero = (request,id) => (dispatch) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
    .then(data => console.log(data, 'Deleted'))
    .then(dispatch(heroDeleted(id)))
    .catch(err => console.log(err));
}