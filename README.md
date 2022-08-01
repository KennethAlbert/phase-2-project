# Book store Application Project
Name:Kenneth Gichuka

Project Name:Book store Application Project

Link:https://book-store-react-project.herokuapp.com/


GitHub:https://github.com/KennethAlbert/phase-2-project


## Available Scripts
run--  ```npm start```   ---to start the react server
run ---  ```npm run server```   ---to start the db.json server

## Technology Used
HTML,CSS,JAVASCRIPT && REAACT



### Core Features

users can:
1.See every book item available in the database(db.json) after the page loads
see the code below:

```
const [books,setBooks] = useState[]);


const url = 'http://localhost:8004/books'

useEffect(() => {
    fetch(url)
    .then(res=>{
      if(res.ok){
        return res.json() }
      else {
        return res.text().then((err) => {
          throw err;
        });
    }})
     .then(data=>{
      setBooks(data)
    })
  }, [])

```
The book items will be stored in the books state variable and passed down via props to child components for future rendering on the UI


2.see every item available in cart
```
const[incart ,setCart]=useState([]);
 const newBook= books.filter(book=>{
   return (book.InCart===true)
  })

useEffect(() => {
   setCart( newBook)
  },[books ])

  ```

we then look for how many items in the book state variable have a boolean value of true on the Incart key,If true we store the return value to the  incart state variable

We then use the useEffect hook to render Items as the return value will be dependant on changes changes in the book variable;

3.Increase or decrease the number of items in the cart
```
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

      </footer>

    </article>
    </>
  );
}
export default InCartBook
```
The  InCartBook component will be responsible for handling the addition and reduction of cart items as it accomodates the handleCapacity && handlCartRemove call back functions which are responsible for the operations,they accept a book item as a parameter and uses that to change respective properties both in state and the database.

An Admin can---
1.Delete items from the database and state:
```
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
```
Through props the Admin component will accept handleDelete call back function from the App component which will then delete the specific item clicked on.

2.The admin can Add items into the database(db.json) and at the same time in state-
see the code below-
```
import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';

function AddBooks({handleBooks}) {

  let navigate = useNavigate();
  const unique_id = uuid();
  const small_id = unique_id.slice(0,5)

  const [newBook, setNewBook] = useState({
  id:"",
  title: "",
  author: "",
  summary:"",
  category:"",
  image:"",
  capacity:"",
  books_sold:parseInt(0),
  price:"",
  InCart:false
  });

  

  function handleBook(e) {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name ]: value,
    });
  }
  function handleForm(e) {
    e.preventDefault();
  
       handleBooks({
      id:small_id,
      title: newBook.title,
      author: newBook.author,
      summary:newBook.summary,
      category:newBook.category,
      image:newBook.image,
      capacity:parseInt(newBook.capacity),
      price:parseInt(newBook.price),
      InCart:false  
        });
      navigate("/")   
  }

  return (

    <main>

 
  
  < div className="title">

    <h2>Add Books</h2>
    </div>

    <form className="NewItem" onSubmit={handleForm}>
      <label>
        Title:
        <input type="text" name="title" onChange={handleBook} onSubmit={handleForm}/>
      </label>
      <label>
        Author:
        <input type="text" name="author" onChange={handleBook}/>
      </label>
      <label>
        Summary:
        <textarea type="text" name="summary" rows="5" cols="33" onChange={handleBook}/>
      </label>
      <label>
        Image:
        <input type="text" name="image" onChange={handleBook}/>
      </label>
      <label>
        Capacity:
        <input type="number" name="capacity" onChange={handleBook}/>
      </label>
      <label>
        Price:
        <input type="number" name="price" onChange={handleBook}/>
      </label>

      <label>
        Category:
        <select name="category" onChange={handleBook}>
          <option value="comedy">comedy</option>
          <option value="thriller">thriller</option>
          <option value="mystery">mystery</option>
          <option value="fantasy">fantasy</option>
          <option value="fiction">fiction</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>

</ main>
  )
}
export default AddBooks
```

## LICENSE

MIT License

Copyright (c) [2017] [James Q Quick]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.