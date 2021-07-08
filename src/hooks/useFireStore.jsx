import { useEffect, useState } from 'react'
import { db } from '../firebase/config'

const useFireStore = (collection, conditions) => {

    const [data, setData] = useState([])
    
    useEffect(() => {
        let queryRef = db.collection(collection).orderBy('createdAt')
        
        if (conditions) {
            if (!conditions.compareValue || !conditions.compareValue.length) {
                setData([])
                return
            }
            queryRef = queryRef.where(conditions.fieldName, conditions.operator, conditions.compareValue)
        }
        
        
        const unSubrice = queryRef.onSnapshot(snapshot => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setData(documents)
        })

        return unSubrice
    }, [collection, conditions])


    return data
}

export default useFireStore

