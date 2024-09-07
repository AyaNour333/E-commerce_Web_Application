import { useAppDispatch , useAppSelector } from '@store/hooks'
import { actGetCategories, categoriesRecordsCleanUp } from '@store/categories/categoriesSlice'
import { useEffect } from 'react'

function useCategories(){
    const dispatch = useAppDispatch()
    const {loading , error , records} = useAppSelector(state => state.categories)
    useEffect(()=>{
        const promise = dispatch(actGetCategories())
        return ()=> {
            dispatch(categoriesRecordsCleanUp())
            promise.abort()
        }
    },[dispatch])
    return {loading , error , records }
}

export default useCategories