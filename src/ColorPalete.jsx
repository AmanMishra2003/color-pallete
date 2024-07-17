import { useState } from "react"
import { generateColor } from "./utils"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const isValidHexColor = (color) => /^#[0-9A-F]{6}$/i.test(color);

export default function ColorPalete(){
    let [color, setColor ] = useState('#ff0000')
    let [colorSequence, setColorSequence] = useState(generateColor(color))
    let [error, setError] = useState(false)

    const notify_error = () => (
        toast.error("The Given String Cannot Be Parsed Into Color!!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
        })
    );
    
    const notify_success = (text) => {
        navigator.clipboard.writeText(text)
        return toast.success('Color Copied To Clipboard',{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    };
    
    function handleColor(e){
        setColor(e.target.value)
    }
    function handleText(e){
        let value = e.target.value;
        if(value){
            if(isValidHexColor(value)){
                setColor(e.target.value)
                setError(false)
            }else{
                setError(true)
            }
        }
        
    }
    
    function handleSubmit(e){
            e.preventDefault()
            error?notify_error():''
            setColorSequence(generateColor(color))
    }
    
    return(
        <div style={{height:'100vh', width:'100vw'}}>
            <div  style={{display:'flex', margin:'2em 0 2em 1.5em', minWidth:'50%' ,gap:'30px', flexWrap:'wrap', alignItems:'center'}}>
                <h1>Color Generator</h1>
                <form  style={{display:'flex'}} onSubmit={handleSubmit}>
                    <input type="color" name="colorTag" value={color} onChange={handleColor}/>
                    <input type="text" placeholder={color}  onChange={handleText}/>
                    <button type="submit" >Submit</button>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        />
                </form>
            </div>
            <div className="colorPallete">
                {
                    colorSequence.map((ele,i)=>{
                        return <div style={{
                            backgroundColor:ele,
                        }} key={i}>
                            <button 
                                onClick={(e)=>{
                                    notify_success(e.target.innerText)
                                }}
                                style={{
                                    backgroundColor:ele,
                                    border:'none',
                                    fontSize:'minmax(.5rem, 1.25rem)',
                                    margin:'1rem 2rem',
                                    color:`${i>11?'white':'black'}`
                                }}
                            >{ele}</button>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
