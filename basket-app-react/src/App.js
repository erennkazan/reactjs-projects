import {useState} from "react";
import { ActionIcon,Badge,Container , SimpleGrid ,List, ThemeIcon,Input,Button,Group,Drawer,Indicator } from '@mantine/core';
import { IconCircleCheck, IconShoppingCart } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustments } from '@tabler/icons-react';
import Card from "./components/Card";
import './App.css';

const storeItems = [
{
  id: 100,
  name: "Fotoğraf Makinası",
  src: "camera",
  price: "20",
},
{
  id: 101,
  name: "Sandalye",
  src: "chair",
  price: "10"
},
{
  id: 102,
  name: "Kulaklık",
  src: "headphone",
  price: "25"
},
{
  id: 103,
  name: "Retro Kamera",
  src: "retrocam",
  price: "25"
},
{
  id: 104,
  name: "Oyuncak Araba",
  src: "toycar",
  price: "25"
},
{
  id: 105,
  name: "Saat",
  src: "watch",
  price: "25"
},
];

function App() {
  const [opened, { open, close }] = useDisclosure(false);
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");

  let filteredItems = storeItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >=0);
let addToBasket = ({id,name}) => {
  let basketIndex =basketItems.findIndex(item => item.id === id)
  if(basketIndex >=0){
    let _basketItems = [...basketItems];
    _basketItems[basketIndex].count +=1;
    setBasketItems(_basketItems);
  }
  else{
    setBasketItems([...basketItems,{id,name, count: 1}]);
  }
  
};
  return (
    <Container>
      <Group align="end">
      <Input.Wrapper label="Arama">
          <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </Input.Wrapper>
        <Button onClick={()=>setSearchValue("")}>Temizle</Button>
        <Indicator label={basketItems.length} color="red" size={"22"}>
        <Button  onClick={open}><IconShoppingCart size="1.1rem" /></Button >
        </Indicator>
      </Group>
        <SimpleGrid cols={3} className="Store">
            {filteredItems.map(({id,name,src}) =>{
              return (
              <Card 
              key={name} 
              name={name} 
              src ={src}
              onAdd={() => addToBasket({id,name})}/>
              );
            })}
        </SimpleGrid>
        
        <Drawer
        opened={opened}
        onClose={close}
        title="Sepetim"
        overlayProps={{ opacity: 0.5, blur: 4 }}>
         <List
            className="List"
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }>
          {basketItems.map(({name, count}, index)=> (
          <List.Item key={index}>
            {name} <Badge>{count}</Badge> 
            </List.Item>
          ))}
        </List>
      </Drawer>
           
      
       
    </Container>
  );
}

export default App;
