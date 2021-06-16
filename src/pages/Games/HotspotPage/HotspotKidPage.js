import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Typography from "@material-ui/core/Typography";

function HotspotKidPage() {
  const [gameData, setGameData] = useState({})
  const [gameOutcome, setGameOutcome] = useState(null)

  const {exerciseId} = useSelector((state) => state.exercise);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/hotspot/get?id=${exerciseId}`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'patatas-fritas-token': token
          }
        })
        const responseData = await response.json()
        setGameData(responseData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, []);

  const contains = (x, y, rect) => {
    return rect.x <= x && x <= rect.x + rect.width &&
      rect.y <= y && y <= rect.y + rect.height;
  };

  async function sendScore() {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/calculate_score?numberOfGoodAnswers=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'patatas-fritas-token': token
        }
      });
      const responseData = await response.json()
      console.log(responseData)
    } catch (error) {
      console.log(error)
    }
  }

  const imageClick = (e) => {
    console.dir(e)
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    console.log("Left? : " + x + " ; Top? : " + y + ".");
    console.log(contains(x, y, gameData.rectangle));
    if (contains(x, y, gameData.rectangle)) {
      setGameOutcome('Nyertél!')
      sendScore()
    } else {
      setGameOutcome('Vesztettél!')
    }
  }

  console.log(gameData)

  return (
    <>
      <Typography variant={'h3'} color={"primary"} align="center" style={{ margin: '3vh' }}>Képes szójáték</Typography>
      <div style={{ display: 'flex', margin: '3vh' }}>
        {gameData.image &&
        <Typography variant={'h5'} style={{ margin: '0 auto' }}>Let's click on the tail of the pig! If you succeed, your pet will get a gourmet lunch today!</Typography>
        }
      </div>
      <div style={{ display: 'flex', marginTop: '2vh' }}>
        {gameData.image &&
        <img style={{ margin: '0 auto', border: '1px solid black' }} src={gameData.image} alt='image'
             onClick={imageClick}/>
        }
      </div>
      <div style={{ display: 'flex', margin: '5vh' }}>
        {gameOutcome &&
        <Typography variant={'h3'} color={"secondary"} style={{ margin: '0 auto' }}>{gameOutcome}</Typography>
        }
      </div>
  </>
  );
}

export default HotspotKidPage;
