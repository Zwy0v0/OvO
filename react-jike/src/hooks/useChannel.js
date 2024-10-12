import {useState,useEffect} from 'react'
import { getChannelAPI } from '@/apis/article'

function useChannel() {
    //获取频道列表
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChannelAPI()
            setChannelList(res.data.data.channels)
        }
        getChannelList()
    }, [])
    return {channelList}
}

export { useChannel }