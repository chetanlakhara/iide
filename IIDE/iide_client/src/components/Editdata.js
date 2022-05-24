import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'


const Editdata = () => {

    

    const navigate = useNavigate("");


    const [inpval, setInp] = useState({
        Author:"",
        Title:"",
        Content:""
      
      })
      
      
      const setdata = (e)=>{
          console.log(e.target.value);
          const {name,value} = e.target;
          setInp((preval)=>{
            return {
              ...preval,
              [name]: value
            }
          })
      }

      const { id } = useParams("");
    console.log(id);



    const getuser = async () => {

        const res = await fetch(`/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setInp(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getuser();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const {Author,Title,Content} = inpval;

        const res2 = await fetch(`/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                Author,Title,Content
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            navigate('/')
        }

    }

    return (
        <div>
            <div className='container'>
                <div className='add_btn'>
                    <NavLink to="/"><button className="btn btn-primary"> All Blog </button></NavLink>
                </div>

                <form className='mt-5'>
                    <div className="mb-3">
                        <label for="author" className="form-label">Author Name</label>
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
                    <button type="submit" onClick={updateuser} className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    )
}

export default Editdata
