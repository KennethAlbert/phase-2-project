import React, { useState } from 'react';

const Book = ({book,handleAddCart,handlDelete}) => {
  const [readMore, setReadMore] = useState(false);
 

 
  return (
    <article className="single-book">
      <img src={book.image} alt={book.title} />
      <footer>
        <div className="book-info">
          <h4>{book.title}</h4>
          <h4 className="book-price">${book.price}</h4>
        </div>
        
        <p>
          {readMore ? book.summary : `${book.summary.substring(0, 200)}...`}
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? 'show less' : '  read more'}
          </button>
        </p>

        
        <button className="addToCart-btn" onClick={()=>handleAddCart(book)}>
          Add To Cart
        </button>

        <button className="delete-btn" onClick={()=>handlDelete(book)}>
          Hide
        </button>
        
        </footer>
    </article>
  );
};

export default Book;