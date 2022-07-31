import React,{useState} from 'react'
import { Link} from "react-router-dom";



function Admin({books,handleDelete,handleBooks }) {
    const [readMore, setReadMore] = useState(false);
   
    

    const adminBooks=books.map(book=>{
        return (
          
         
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
        
              
        
                <button className="delete-btn" onClick={()=>{handleDelete(book.id)}}>
                  Remove  From List
                </button>
                
              </footer>
            </article>
            
          );
    
    })
    
  return (
    <>
    <main>
       <div className='cartNav'>
           <div>
          <Link to="addbooks">
           AddBooks
          </Link>
           </div>

          </div>

        <section>
          <div className="title">
            
            <h2>Admin Panel</h2>
          
          </div>
          <div>
          {adminBooks}
          </div>
        </section>
        
        </main>
     
      
        </>
  )
}

export default Admin