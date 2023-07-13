import axios from 'axios';

export const getList = async () => {
    const response = await axios.get('https://hp-api.onrender.com/api/characters');
    if(response?.data){
        return response?.data;
    }
};