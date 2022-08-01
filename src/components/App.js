import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";
import Books from './Books'
import InCart from './InCart';
import AddBooks from './AddBooks';
import Admin from './Admin';



const url = 'https://voltaic-glittery-fold.glitch.me/books'



function App() {



 const [books, setBooks] = useState([]);
 const[incart,setCart]=useState([]);
  
  
 const newBook= books.filter(book=>{
   return (book.InCart===true)
  })
    
  
  useEffect(() => {
   setCart( newBook)
  },[books])
  

  
 

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


  
function handleBooks(book){
 fetch('https://voltaic-glittery-fold.glitch.me/books', {
method: 'POST', 
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(book),
})
    const newBookList = [book,
      ...books]
    setBooks( newBookList)

   }

   
  
  function handleDelete(id) {
    const newBook=books.filter(book=>book.id!==id);
    setBooks(newBook)
    fetch('https://voltaic-glittery-fold.glitch.me/books/' + id, {
    method: 'DELETE',
})
   }


 function handleUpdate(id,key,value){
  fetch(`https://voltaic-glittery-fold.glitch.me/books/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      [key]:value
    })})
    .then((response) => response.json())
    .then((json) =>{
          setBooks({
           ...books,
           [key]:value
          })})
 
        }

   
   
   function handleAddCart(book){
   if(incart.some(cart=>cart.id===book.id)===false){
   if(book.InCart===false ){
      
      return fetch(`https://voltaic-glittery-fold.glitch.me/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        InCart: !book.InCart,
        sold:1
      })})
      .then((response) => response.json())
      .then((json) =>{
        setCart({
          book,
        ...incart
      })
      });
    }}
   
    if(incart.some(cart=>cart.id===book.id)===true) {
      if(book.InCart===true && book.capacity>=book.sold ){
      return fetch(`https://voltaic-glittery-fold.glitch.me/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        sold:book.sold++
      })}).then((response) => response.json())
      .then((json)=>setCart(incart.map((x) =>x.id === book.id ? { ...book, sold: json.sold ++ } : x)))
    }}
   }

   
   function handleCapacity(book){
    const exist = incart.find((x) => x.id === book.id);
    if (exist && book.capacity>book.sold) {
       return fetch(`https://voltaic-glittery-fold.glitch.me/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        sold:book.sold+1
      })}).then((response) => response.json())
      .then( setCart(incart.map((x) =>x.id === book.id ? { ...exist, sold: exist.sold  + 1} : x)))
      
    } 
  }

  
  function handleRemoveCapacity(book){
    const exist = incart.find((x) => x.id === book.id);
    if (exist && book.sold>1 ) {
       return fetch(`https://voltaic-glittery-fold.glitch.me/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        sold:book.sold-1
      })}).then((response) => response.json())
      .then( setCart(incart.map((x) =>x.id === book.id ? { ...exist, sold: exist.sold-1} : x)))
      
    } 
  } 
function handlCartRemove(book){
  setCart(incart.filter((cart)=>cart.id!==book.id))
  fetch(`https://voltaic-glittery-fold.glitch.me/books/${book.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      sold:0,
      InCart:false
       })})
}


function handlDelete(book) {
  setBooks(books.filter(b=>b.id!==book.id))
}
   


  
  return (
    <> 
      <Router>
       <nav className="cartNav">
        <div><Link to="/">Home</Link></div>
        
        <div><Link to="/admin">Admin</Link></div>
       </nav>
      <Routes>
        <Route  exact path="/" element={<Books books={books} handlDelete={handlDelete} incart={incart} handleAddCart={handleAddCart}/>} />
        <Route path="/incart" element={<InCart books={incart} setCart={setCart} handleCapacity={handleCapacity} handlCartRemove={handlCartRemove} handleRemoveCapacity={handleRemoveCapacity} />} />
        <Route path="/admin/addbooks" element={<AddBooks handleBooks={handleBooks} />}/>
        <Route path="/admin/*" element={<Admin books={books} handleBooks={handleBooks} handleDelete={handleDelete} handleUpdate={handleUpdate}/>} />
      </Routes>
      </Router>
    </>
  )
}

export default App