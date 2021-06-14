import React, {useEffect, useState, useRef} from 'react';

function HotspotKidPage() {
  const [gameData, setGameData] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchData() {
      try {
        const id = 1
        const response = await fetch(`${process.env.REACT_APP_API_URL}/hotspot/get?id=${id}`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'patatas-fritas-token': token
          }
        })
        const responseData = await response.json()
        setGameData(responseData)
      } catch(error) {
        console.log(error)
      }
    }
    fetchData()
  },[])

  const contains = (x, y, rect) => {
    return rect.x <= x && x <= rect.x + rect.width &&
      rect.y <= y && y <= rect.y + rect.height;
  }

  const imageClick = (e) => {
    console.dir(e)
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    console.log("Left? : " + x + " ; Top? : " + y + ".");
    console.log(contains(x, y, gameData.rectangle))
  }

  console.log(gameData)

  return (
    <div style={{display: 'flex', marginTop: '10px'}}>
      {gameData.image &&
        <img style={{margin: '0 auto', border: '1px solid black'}} src={gameData.image} alt='image' onClick={imageClick}/>
      }
    </div>
  );
}

export default HotspotKidPage;
