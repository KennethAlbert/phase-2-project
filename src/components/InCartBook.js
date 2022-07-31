import React,{useState} from 'react'

function InCartBook({book,handleCapacity,handleRemoveCapacity,handlCartRemove}) {
 const [readMore, setReadMore] = useState(false);








  return (
    <>
    

    <article className="single-book" key={book.id}>
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

        
        <button className="addToCart-btn" onClick={()=>handleRemoveCapacity(book)} >
          -
        </button>
        <button className="addToCart-btn" >
         {book.sold}
        </button>

        

        <button className="addToCart-btn" onClick={()=>handleCapacity(book)}>
         +
        </button>

        <button className="delete-btn" onClick={()=>handlCartRemove(book)} >
          Remove from Cart
        </button>

        <button className="addToCart-btn" >
          Buy
        </button>

        
      </footer>
    </article>
    </>
  );
}

export default InCartBook