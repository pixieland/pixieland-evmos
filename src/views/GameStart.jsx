import React, { useEffect, useState } from 'react'
import { Link } from 'wouter';
import { ethers } from 'ethers'

export default function Marketplace({ ethaddress, contractNFT }) {
  const [pixies, setPixies] = useState([]);
  const [urls, setURLS] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getNFTs = async () => {
      try{
        setLoading(true);
        const ps = await contractNFT.fetchMyNFTs();
        console.log(ps);
        setPixies(ps);

        let newurls = [];
        for(let i = 0; i < ps.length; i++) {
          const url = await contractNFT.tokenURI(ps[i].tokenId.toString());
          newurls.push(url);
        }
        setURLS(newurls);
        setLoading(false);
      }
      catch(err) {
        console.error(err);
        setLoading(false);
      }
    }
    if(contractNFT) getNFTs();
  }, [contractNFT])

  return (
    <div className="container">
      <h1>Choose your Pixie</h1>
     
      {!loading ?<div className='row mt-3'>
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
      :  <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
}
    {!pixies.length && <p>No Pixie. You can buy pixie from marketplace</p>}
    </div>
  )
}