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
      [name]: value,
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
<div className="title">
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
</main>
  )
}

export default AddBooks