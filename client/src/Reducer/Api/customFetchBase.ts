// import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
// import { Mutex } from 'async-mutex'

// const baseUrl = process.env.REACT_APP_API_URL
// console.log('baseUrl', baseUrl)

// const baseQuery = fetchBaseQuery({
//   baseUrl
// })

// const mutex = new Mutex()

// const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
//   await mutex.waitForUnlock()

//   let result = await baseQuery(args, api, extraOptions);
//   if()
// }

// export default customFetchBase
export default () => {}
