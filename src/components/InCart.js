import React from 'react'
import InCartBook from './InCartBook';
import { useNavigate } from "react-router-dom";

function InCart({books,handleCapacity,handleRemoveCapacity,handlCartRemove,setCart}) {

  let navigate = useNavigate();

  function handleReset(){
    books.map(book=>{
     return fetch(`http://localhost:8004/books/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          sold:0,
          InCart:false
           })})
      
    })
    navigate("/")
   
    
    }

    
 const bookList = books.map(book=>{
  return <InCartBook key={book.id} book={book} handleCapacity={handleCapacity} handlCartRemove={handlCartRemove} handleRemoveCapacity={handleRemoveCapacity} />
 })

  const cartItems=books===[]?0:books.reduce((a,b)=>a+b.sold,0)

  const totalPrice=books===[]?0:books.reduce((a,c)=> a+ c.price *c.sold,0)
 
  


    return (
      
        <main>
          <div className="cartNav" id="inCart">
       <div>
      <h5>Total Price:$ {totalPrice}</h5>
       </div>
       <div>
        <h5>Total Items:{cartItems} books</h5>
       </div>
       <div onClick={handleReset}>
         Buy
        </div>
      </div>
        <section>
          <div className="title">
            
            <h2>In Cart</h2>
          
          </div>
          <div>
          
          {bookList}
  
          
          </div>
        </section>
        </main>
      
      );
}

export default InCart