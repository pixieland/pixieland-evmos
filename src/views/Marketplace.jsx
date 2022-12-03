import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

export default function Marketplace({ ethaddress, contractNFT }) {
  const [pixies, setPixies] = useState([]);
  const [urls, setURLS] = useState([]);

  useEffect(() => {
    const getNFTs = async () => {
      try{
        const ps = await contractNFT.fetchItemsListed();
        console.log(ps);
        setPixies(ps);

        let newurls = [];
        for(let i = 0; i < ps.length; i++) {
          const url = await contractNFT.tokenURI(i + 1);
          newurls.push(url);
        }
        setURLS(newurls);
      }
      catch(err) {
        console.error(err);
      }
    }
    if(contractNFT) getNFTs();
  }, [contractNFT])
  
  const buyNFT = async (tokenId, price) => {
    try{
      const transaction = await contractNFT.createMarketSale(tokenId, { value: price, gasLimit: 1e6});
      const tx = await transaction.wait();
      console.log(tx);
    }
    catch(err) {
      console.error(err);
    }
  }
  return (
    <div className="container">
      <h1>Marketplace</h1>
     
      <div className='row mt-3'>
        {pixies.map((p, i) => (
          <div className='col-3' key={i}>
            <div className="card">
              <img src={urls[i]} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">#{p.tokenId.toString()}</h5>
                <button className="btn btn-danger" onClick={() => buyNFT(p.tokenId.toString(), p.price.toString())}>
                  Buy for {p.price.toString() / 10 ** 18} EVMOS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      
    </div>
  )
}