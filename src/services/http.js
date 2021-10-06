import axios from 'axios';
export async function getCoinDetails(coinId){
    const apiCoinDetailsUrl = '/api/v3/coins/' + coinId;
    try{
    const response =  await axios.get(apiCoinDetailsUrl);
    return response;

    }catch(error){
console.log(error)
    }
}