import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context=createContext();

const ContextProvider= (props) =>{

    const [input , setinput]=useState(" ");
    const [recentprompt ,setrecentprompt]=useState(" ");
    const [prevprompt , setprevprompt]=useState([]);
    const [showresult , setshowresult]=useState(false);
    const [loading , setloading]=useState(false);
    const [resultdata , setresultdata]=useState(" ");
    const [history, setHistory] = useState([]);

    const delayPara = (index , nextWord) => {
        setTimeout(function(){
            setresultdata(prev=>prev+nextWord)
        },75 * index)
    }

    const onSent = async (prompt)=>{
        setresultdata(" ");
        setinput(true);
        setloading(true);
        setshowresult(true);
        setrecentprompt(input);
        setprevprompt(prev=>[...prev , input])
        setHistory([...history, { prompt: input, result: 'Simulated result data...' }]);
        const response=await run(input);
        let responseArray=response.split("**");
        let newArray=" ";
        for(let i=0 ;i <responseArray.length;i++)
        {
            if(i===0 || i%2!==1){
                newArray += responseArray[i];
            }
            else{
                newArray += "<b>"+responseArray[i]+"</b>";
            }
        }
        // setresultdata(newArray);
        let newResponse2=newArray.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for(let i=0 ; i<newResponseArray.length;i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i , nextWord+" ");
        }
        setloading(false);
        setinput(" ");
    }



    const contextValue={
        prevprompt,
        setprevprompt,
        onSent,
        setrecentprompt,
        recentprompt,
        showresult,
        loading,
        resultdata,
        input,
        setinput,
        history,
        setHistory

    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;