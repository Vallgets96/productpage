import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import img1 from "../img/lucky.png";

const Container = styled.div`
  height: 100%;
  width: 100%;
  font-family: Arial, sans-serif;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const Image = styled.img`
  height: 80px;
  width: 160px;
  color: #427d9d;
  font-weight: 500;
`;

const Category = styled.h5`
  color:black;
  font-size: 15px;
  
`;

const CategoryButton = styled.button`
  height: 100%;
  margin: 5px;
  background-color:white;
  color: black;
  border: none;
  padding: 20px;
  padding-top:0px;
  padding-bottom:0px;
  font-size:18px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:active {
    background-color: white;
    border-bottom : 2px solid red ;
  }

  @media(max-width:320px){
    padding:1px;
    font-size:14px;

  }
  @media(max-width:378px){
    
    font-size:17px;

  }
`;
const LineContainer = styled.div`
       display:flex
       align-items:center;
       justify-items:center` 

const Line = styled.hr`
      `


const ButtonContainer = styled.div`
  padding: 10px;
  padding-top:0px;
  padding-bottom:0px;
  display: flex;
  justify-content: center;
  align-items: center;
  

`;

const SortDropdown = styled.select`
  background-color: white;
  color: black;
  border: 2px solid black;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin:10px;

  &:hover {
    outline-color:black;
    color: black;
  }
`;

const SortOption = styled.option`
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: black;
    color: white;
    outline-color:black;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
  
`;
const Text = styled.div`
  font-weight:400;
  margin-top:40px`

const ProductBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #bcbaba;
  padding: 10px;
  height: 270px;
  width: 270px;
  cursor: pointer;
  background-color:#ffffff;
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    transform: scale(1.05);
    
  }
`;

const ProductImage = styled.img`
  height: 150px;
  width: 150px;
  margin-top:20px

`;

const TotalProducts = styled.div`
  text-align: left;
  margin-top: 20px;
  font-size: 20px;
  color: blue;
  margin-bottom: 20px;
  padding-left : 9%  ;

 
  
`;

function Main({ button, setButton }) {
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [total, setTotal] = useState(false);
  const [sortOption, setSortOption] = useState("Sort By");
  const [filterClicked, setFilterClicked] = useState(false);

  useEffect(() => {
    axios("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleFilter = (category) => {
    const filtered = products.filter((data) => category === data.category);
    setFilteredItems(filtered);
    setTotal(true);
    setFilterClicked(true);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    const sorted = [...filteredItems];
    if (e.target.value === "priceLowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (e.target.value === "priceHighToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredItems(sorted);
  };

  return (
    <Container>
      <ImageContainer>
        <Image src={img1}></Image>
      </ImageContainer>
      <LineContainer><Line></Line></LineContainer>
      <ButtonContainer>
        
        <Category src></Category>
        {button.map((data, i) => (
          <CategoryButton key={i} onClick={() => handleFilter(data.category)}>
            {data.name}
            
          </CategoryButton>
          
        ))}
        
        
      </ButtonContainer>
      <LineContainer><Line></Line></LineContainer>
      
      {filterClicked && (
        <ButtonContainer>
          <Category>Sort by Price</Category>

          <SortDropdown value={sortOption} onChange={handleSortChange}>
            <SortOption value="Sort By" disabled>
              Sort By
            </SortOption>
            <SortOption value="priceLowToHigh">Price low to high</SortOption>
            <SortOption value="priceHighToLow">Price high to low</SortOption>
          </SortDropdown>
        </ButtonContainer>
      )}
      <TotalProducts>
         {total ? filteredItems.length : products.length} Results
      </TotalProducts>
      <ProductContainer>
        {total
          ? filteredItems.map((data) => (
              <ProductBox key={data.id}>
                <ProductImage src={data.image} />
                <Text>{data.title}</Text>
                <div style={{}}>
                  <p>Price: ${data.price}</p>
                  
                </div>
              </ProductBox>
            ))
          : products.map((data) => (
              <ProductBox key={data.id}>
                <ProductImage src={data.image} />
                <Text>{data.title}</Text>
                <div style={{  }}>
                  <p>Price: ${data.price}</p>
                  
                </div>
              </ProductBox>
            ))}
      </ProductContainer>
    </Container>
  );
}

export default Main;
