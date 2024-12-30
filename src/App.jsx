import React, { useEffect, useState } from "react";
import userService from "./appwrite/Users";

const App = () => {
  const [users, setusers] = useState([]);
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [hello, sethello] = useState('hello')

  async function fetchAllUsers() {
    let allUsers = await userService.getAllUsers()
    setusers(allUsers.documents)
  }

  useEffect(() => {
    fetchAllUsers()
  },[])

  function handleChange(e) {
    let { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let user = await userService.createUser({
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
      });
      if(user) {
        setformdata({...formdata,name: '',email: '',password: ''})
        fetchAllUsers()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  async function handleDeleteUser(id) {
    if(!id) {
      return 
    }
    try {
      await userService.deleteUser(id)
      fetchAllUsers()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white p-10">
      <h1 className="text-3xl font-semibold mb-4">Create Data</h1>
      {hello}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={formdata.name}
          className="px-3 py-2 bg-zinc-700 outline-none mr-4"
          type="text"
          placeholder="name"
          name="name"
        />
        <input
          onChange={handleChange}
          value={formdata.email}
          className="px-3 py-2 bg-zinc-700 outline-none mr-4"
          type="email"
          placeholder="email"
          name="email"
        />
        <input
          onChange={handleChange}
          value={formdata.password}
          className="px-3 py-2 bg-zinc-700 outline-none mr-4"
          type="password"
          placeholder="password"
          name="password"
        />
        <button className="px-3 py-2 bg-blue-600 rounded-lg" type="submit">
          Create
        </button>
      </form>

      <div className="mt-5 flex gap-5 flex-wrap">
        {
          users && users.map((user,index) => (
            <div key={user?.$id} className="px-3 py-2 bg-zinc-700 w-fit">
              <h2>{user.name}</h2>
              <h2>{user.email}</h2>
              <span onClick={() => handleDeleteUser(user?.$id)} className="text-red-500 cursor-pointer">Delete</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default App;
