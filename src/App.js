import './App.css';
import React , {useState} from 'react';
import ToDo from './Todo';
import { useEffect } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import IconButton from '@mui/material/IconButton';


const getlocalitems=()=>{

  let list=JSON.parse(localStorage.getItem('key'));
 
  if(list){
    console.log('list is : ', list,list.type);
      return list;
  }

  return [];
}


function App() {

  let [item , setItemfn] = useState("");
  let [allItem , setAllItem] = useState(getlocalitems());   //allItem intitally empty array
  let [toggleSubmit, setToggle]=useState(true);
  let [isEditItem, setIsEditItem]=useState(null);


  const change = (event) =>{
    setItemfn(event.target.value)
  }

  const clicked = () =>
  {
    // console.log("item",item);
    if(item!=="" && toggleSubmit)
    {
          setAllItem((oldItem) =>{
            let curItem = item;
            
            setItemfn("")        //so that gets cleared from input box..only in array now to be shown below
            return [curItem,...oldItem]; 
          }
        )
    }

    else if(item!=="" && !toggleSubmit){

          setAllItem(
            allItem.map((elem,id)=>{
                if(id===isEditItem){
                  return [item]
                }
                return elem;
            })
          )
            
          setToggle(true);
          setItemfn("");
          setIsEditItem(null);
    }

  }

   
  const deletItem = (id) =>{
    setAllItem((oldItem) =>{
      const newItem= oldItem.filter((arr , ind)=>{return ind !== id})

      return [...newItem];

    })
  }

  const editItem =(id)=>{
    let newEditItem= allItem.find((elem,ind)=>{
      return ind===id
    })

    console.log(newEditItem);
    setToggle(false);
    setItemfn(newEditItem);
    setIsEditItem(id);
  }


  // console.log(allItem);

  useEffect(()=>{
 getlocalitems();
      localStorage.setItem('key', JSON.stringify(allItem) )
  },[allItem]

  
  );





  return (
    <>
      <div className = "box">
        <div className='box1'>

          <h1>ToDo List</h1>
          
          <div className='input'>

            <input type='input' placeholder='Add Task' onChange={change} value={item}></input>            {/* task inputted */}
             {/* + button (after input text) */}
             {
                  toggleSubmit ? (
                      <button className='button' onClick={clicked}>+</button>
                  ) : (
                      <IconButton aria-label="delete" size="large" onClick={clicked} >
                          <EditNoteIcon fontSize="large" style={{color:"#03FC20"}} />
                      </IconButton>
                  )
              }


          </div>
          
          <ol className='List'>
          {
            allItem.length>0 && (
            allItem.map((curitem , ind) =>
              {
                return(
                <ToDo key = {ind} id = {ind} onselect1 = {deletItem} onselect2 = {editItem} text = {curitem} />
                      )
              })
              )
          }

          </ol>

        </div>
      </div>
    </>
  );
}

export default App;
