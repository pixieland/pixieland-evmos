import React, { useEffect, useState } from 'react'
import { Link } from 'wouter';
import { ethers } from 'ethers'

export default function Marketplace({ ethaddress, contractNFT }) {
  const [pixies, setPixies] = useState([]);
  const [urls, setURLS] = useState([]);
  
  useEffect(() => {
    const getNFTs = async () => {
      try{
        const ps = await contractNFT.fetchMyNFTs();
        console.log(ps);
        setPixies(ps);

        let newurls = [];
        for(let i = 0; i < ps.length; i++) {
          const url = await contractNFT.tokenURI(ps[i].tokenId.toString());
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

  return (
    <div className="container">
      <h1>Choose your Pixie</h1>
     
      <div className='row mt-3'>
        {pixies.map((p, i) => (
          <div className='col-3' key={i}>
            <div className="card">
              <img src={urls[i]} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">#{p.tokenId.toString()}</h5>
                <Link className="btn btn-danger btn-lg" aria-current="page" href="/pixiland">
                  Select Pixie
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      
    </div>
  )
}