import { Container, Grid,Stack,Button, Input, Textarea } from '@mantine/core';
import './App.css';
import Card from "./components/Card";
import { useState } from 'react';
let arr = [
  {
    id: 1,
    title:"Dağ1",
    par:"Açıklama 1",
  },
  {
    id: 2,
    title:"Dağ2",
    par:"Açıklama2",
  },
  {
    id: 3,
    title:"Dağ3",
    par:"Açıklama3",
  },
  {
    id: 4,
    title:"Dağ4",
    par:"Açıklama4",
  }
];
const theMountain ={  
    id: 4,
    title:"Dağ4",
    par:"Açıklama4",
  
};

let {id , par} = theMountain;
console.log(par);

const App = () => {
  const [title,setTitle] = useState("");
  const [paragraf,setParagraf] = useState("");
  const [list,setList] = useState(arr);
  const [val,setVal] = useState(11);
  const click = () => {
    setTitle("");
    setParagraf("");
    setList([
      ...list,
      {
        id: 5,
        title,
        par:paragraf,  
      },
    ]);
  }
  return (
    <Container>
      <h1>Kart oluşturma programı</h1>
      <Stack>
      <Input.Wrapper label="Başlık">
      <Input placeholder="Başlık yazınız" 
      value={title} 
      onChange={(e) =>setTitle(e.target.value)}></Input>
      </Input.Wrapper>  
     <Textarea
      placeholder="Açıklama yazınız"
      label="Açıklama"
      value={paragraf}
      onChange={(e)=>setParagraf(e.target.value)}
    />
      <Button onClick={click}>Oluştur</Button>
      </Stack>
      <h2>Kartlar:</h2>
      <Grid>
      {list.map(({par,title},i) => (
        <Grid.Col span={4} key={`index{${i}}`} >
          <Card  par={par} title={title} val={val}  index={i} click={()=>{
            let copyList = [...list];
            copyList.splice(i,1);
            setList(copyList);
            console.log("dışardan tıklanıldı.");
          }}/>
        </Grid.Col>
      ))}
          </Grid>
     
    </Container>
  );
}

export default App;
