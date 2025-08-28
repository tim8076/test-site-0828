import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Box, Typography } from '@mui/material';
import TheChart from './components/TheChart';
const apiPath = 'https://openapi.kcg.gov.tw/Api/Service/Get/d7c3f828-5622-4c84-b232-48c26f20ee94';

function App() {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);
  
  const [peopleData, setPeopleData] = useState([]);
  const categoryData = [
    ['人口數0至14歲'],
    ['人口數15至64歲'],
    ['人口數65歲以上'],
  ];
  peopleData.forEach(person => {
    Object.keys(person).forEach(key => {
      const value = person[key];
      categoryData.forEach(category => {
        if (key === category[0]) {
          category.push(parseInt(value));
        }
      })
    })
  })

  useEffect(() => {
    (async function () {
      const res = await fetch(apiPath);
      const data = await res.json();
      setPeopleData(data.data.slice(-10));
    })();
  }, [])

  return (
    <Container sx={{ py: 5 }}>
      <Typography component="h2"
        variant='h3'
        sx={{ mb: 3 }}>
        第一題
      </Typography>
      <ButtonGroup
        orientation="vertical"
        variant="outlined"
        aria-label="vertical button group"
        sx={{ mb: 4 }}
      >
        <Button disabled={disabled} onClick={() => setCount(count + 1)}>
          CLICK: {count}
        </Button>
        <Button onClick={() => setCount(0)}>CLEAR</Button>
        <Button onClick={() => setDisabled(!disabled)}>
          {disabled ? "ABLE" : "DISABLE"}
        </Button>
      </ButtonGroup>
      <Typography component="h2"
        variant='h3'
        sx={{ mb: 3 }}>
        第二題: 高雄市人口資料
      </Typography>
      <TheChart categoryData={categoryData}
       data={peopleData}/>
    </Container>
  )
}

export default App