import axios from 'axios';

export const Post = async (Url, Data) => {
 
    const result = await axios.post(
        Url,
        Data
    );
    return result;

}
//
export const Get = async (Url) => {
    const result = await axios.get(Url);
    return result;
}
