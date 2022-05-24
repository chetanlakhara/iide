import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";






const Home = () => {


  const [getuserdata, setuserdata] = useState([]);
  console.log(getuserdata)

  

    const getdata = async () => {

      const res = await fetch("/getdata", {
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
          setuserdata(data)
          console.log("get data");

      }
  }

  useEffect(() => {
      getdata();
  }, [])

  const deleteuser = async (id) => {

      const res2 = await fetch(`/deleteuser/${id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          }
      });

      const deletedata = await res2.json();
      console.log(deletedata);

      if (res2.status === 422 || !deletedata) {
          console.log("error");
      } else {
          console.log("user deleted");
          
          getdata();
      }

  }

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-2">
          <NavLink to="/add_data" className="btn btn-primary"> Add Data </NavLink>
        </div>


        <div class="card">
  <div class="card-body">
    All Blog
  </div>
</div>
        <table class="table">
          <thead>
            <tr class="table-dark">
              <th scope="col">Id</th>
              <th scope="col">Author</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>



            </tr>
          </thead>
          <tbody>

            {
              getuserdata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{element.Author}</td>
                      <td>{element.Title}</td>
                      <td>{element.Content}</td>
                      <td>
                        <NavLink to={`/Edit/${element._id}`}><button className="btn btn-success"><i class="bi bi-pencil-fill"></i></button></NavLink>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={()=>deleteuser(element._id)}  ><i class="bi bi-trash-fill"></i></button>
                      </td>
                    </tr>
                  </>
                )
              })



            }
          </tbody>
        </table>
      </div>
    </div>
  )





}

export default Home;