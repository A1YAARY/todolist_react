import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Navbar from './components/Navbar'

function App() {
  const [Todos, setTodos] = useState([])
  const [todo, settodo] = useState("")
const [showFinished, setshowFinished] = useState("true")

const fetchData = async () => {
    try {
      const payload = {

        email: "m@gmail.com",
        password: "1"
        
      }
      const response = await axios.post("/api/users/login", payload);
    } catch (error) {
      console.log("error occured",error)
    }
}


  const saveTols = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }

  useEffect(() => {
    let todosString = localStorage.getItem("Todos")
    if (todosString) {
      let todos = JSON.parse(todosString)
      setTodos(Todos)
    }
  }, [])



  const handleadd = () => {
    fetchData();
    if (todo.length > 3) {
      setTodos([...Todos, { id: uuidv4(), todo, iscompleted: false }])
      console.log(Todos)
      settodo("")
      saveTols();
    }
    else {
      alert("character should be more than 3")
    }

  }
  const handleedit = (e, id) => {
    const t = Todos.filter(i => i.id === id)
    console.log("t is", t[0].todo)
    settodo(t[0].todo)

    let newTodos = Todos.filter(item => {
      return (item.id !== id);
    }
    )
    setTodos(newTodos)
    saveTols();

  }
  const handledelete = (e, id) => {

    let newTodos = Todos.filter(item => {
      return (item.id !== id);
    }
    )
    setTodos(newTodos)
    saveTols();
  }

  const handlechange = (e) => {
    settodo(e.target.value)


  }

  const handlecheckbox = (e) => {
    let id = e.target.name
    // console.log("e.targetis ",e.target.name)
    let index = Todos.findIndex(i => {
      return i.id === id
    })
    console.log("id is ", index)

    let newTodos = [...Todos]
    console.log("new todos is", newTodos[index])
    newTodos[index].iscompleted = !newTodos[index].iscompleted
    setTodos(newTodos)
    // console.log(setTodos)
    saveTols();

    
  }
  const toggle = (e) => {
    setshowFinished(!showFinished)
  }
  


  return (
    <>
  
      <div className="mx-auto "><Navbar /></div>
      <div className="flex justify-center my-3  ">
        <div className="max-[500px]:w-[95%] max-[500px]: flex flex-col max-[500px]: h-[95vh] w-[40%] max-[500px]:justify-start rounded-xl  gap-3 justify-center bg-blue-200">
          <div className="itask w-[100%] flex flex-row  my-3 font-bold text-xl justify-center">
            <h1> iTask -Manage your Todos at one place </h1>
          </div>
          <div className="add flex flex-row justify-start font-bold text-xl px-5  " >
            <h1>Add a Todo </h1>
          </div>
          <div className="input flex flex-row px-3 gap-3 ">
            <input type="text" className='w-[80%] rounded-xl p-2' value={todo} onChange={handlechange} />
            <button className='bg-violet-700 rounded-xl w-[15%]' onClick={handleadd}> Add</button>
          </div>
          <div className="show gap-2">
            <input type="checkbox" onChange={(e)=>{toggle(e)}}  className='mx-2' />
            <span className=' mx-3'>Show Finished</span>
          </div>
          <div className="line bg-black w-[80%] h-[1px] mx-9"></div>
          <div className="todos flex flex-row justify-start font-bold text-xl px-5">
            <h1>Your Todos</h1>
          </div >
          <div className='flex flex-row justify-start mx-5'>
            {Todos.length === 0 && <div> No todos to display</div>}
          </div>

          {Todos.map((item) => {
            return ((showFinished|| !item.iscompleted)&& (
              <div className="input flex flex-row px-3 gap-3 max-[500px]:w-10%" key={item.id}  >
                <input type="checkbox" name={item.id} onClick={(e) => { handlecheckbox(e) }} />

                <div className={item.iscompleted ? "line-through" : ""}  >
                  <div className="flex flex-row w-[20vw] flex-wrap max-[500px]:w-[100%] ">{item.todo} </div>
                  {/* {console.log("Todosis ",Todos)}
          {console.log("todo is ",todo.id)} */}
                </div>
                <button className='bg-violet-700 rounded-xl w-[9%]  max-[500px]:w-10%' onClick={(e) => { handleedit(e, item.id) }}>
                  <div className='flex flex-row  justify-center'><FaEdit /></div>
                </button>
                <button className='bg-violet-700 rounded-xl w-[9%]  max-[500px]:w-10%' onClick={(e) => { handledelete(e, item.id) }}> 
                <div className='flex flex-row  justify-center h-12px'>
                <RiDeleteBin5Line />
                </div>
                
                </button>
               
              </div>

            ))
          }
          )}

          <div className="h-[55vh]"></div>

        </div>
      </div>



    </>
  )
}

export default App
