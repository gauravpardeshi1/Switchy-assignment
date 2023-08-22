import axios from "axios"


export const getGraphData1 = async () => {
    // console.log("call 1")
    try {
        let res = await axios.get(import.meta.env.VITE_APP_GRAPH_1_API)
        return res
    } catch (error) {
        return error
    }
}
export const getGraphData2 = async () => {
    // console.log("call 2")

    try {
        let res = await axios.get(import.meta.env.VITE_APP_GRAPH_2_API)
        return res
    } catch (error) {
        return error
    }
}