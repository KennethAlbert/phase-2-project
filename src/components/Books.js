import Book from './Book';
import React, { useState } from "react";
import { Link} from "react-router-dom";
import {BsCart2 }from  'react-icons/bs';
import Filter from './Filter';

const Books = ({ books,handleAddCart,handlDelete,incart }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterName, setfilterName] = useState("");
  


  const itemsToDisplay = books.filter((book) => {

    if (selectedCategory === "All") return true;
     return book.category ===selectedCategory ;
  }).filter(item => {
    if(filterName === ''){
      return true
    } else {
      const name = item.title.toUpperCase()
      return name.includes(filterName.toUpperCase())
    }
  });

  function handleSearchChange(event) {
    setfilterName(event.target.value)
  }


  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value)
  }

  const cartItems=incart===[]?0:incart.reduce((a,b)=>a+b.sold,0)
  
  return (
    <>
    <div className="cartNav" id="booksCart">
     <div><Link to="/incart"><BsCart2/> Cart:{cartItems}</Link></div> 
      </div>
    <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange}/>
    <main>
    <section>
      <div className="title">
        
        <h2>BOOK STORE</h2>
      
      </div>
      <div>
       {itemsToDisplay.map(book=>{
        return  <Book key={book.id} book={book} handleAddCart={handleAddCart} handlDelete={handlDelete} />
       })}
      </div>
    </section>
    </main>
    </>
  );
};

export default Books;