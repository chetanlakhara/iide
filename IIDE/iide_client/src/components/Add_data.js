import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Add_data = () => {

  const navigate = useNavigate("");

  const [inpval, setInp] = useState({
    Author: "",
    Title: "",
    Content: "",

  })


  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInp((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

  const addinpdata = async (e) => {
    e.preventDefault();


    const { Author, Title, Content } = inpval;


    const res = await fetch("/add_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Author, Title, Content
      })
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("error");
      alert("error");
      
    } else {
      alert("data added");
      console.log("data added");
      navigate('/')

    }

  }

  return (
    <div className='container'>
      <div className='add_btn'>
        <NavLink to="/"><button className="btn btn-primary"> All Blog </button></NavLink>
      </div>

      <form className='mt-5'>
        <div className="mb-3">
          <label for="author" className="form-label">Author name</label>
          <input type="text" value={inpval.Author} onChange={setdata} name='Author' className="form-control" />
        </div>
        <div className="mb-3">
          <label for="title" className="form-label">Title</label>
          <input type="string" value={inpval.Title} onChange={setdata} name='Title' className="form-control" />
        </div>
        <div className="mb-3">
          <label for="content" className="form-label">Content</label>
          <input type="string" value={inpval.Content} onChange={setdata} name='Content' className="form-control" />
        </div>
        <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Add_data
