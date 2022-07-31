import React from 'react'
import InCartBook from './InCartBook';

function InCart({books,handleCapacity,handleRemoveCapacity,handlCartRemove}) {




 const bookList = books.map(book=>{
  return <InCartBook key={book.id} book={book} handleCapacity={handleCapacity} handlCartRemove={handlCartRemove} handleRemoveCapacity={handleRemoveCapacity} />
 })

  const cartItems=books.reduce((a,b)=>a+b.sold,0)
  const totalPrice= books.reduce((a,c)=> a+ c.price *c.sold,0)
 



    return (
      
        <main>
          <div className="cartNav" id="inCart">
       <div>
      <h5>Total Price:$ {totalPrice}</h5>
       </div>
       <div>
        <h5>Total Items:{cartItems} books</h5>
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