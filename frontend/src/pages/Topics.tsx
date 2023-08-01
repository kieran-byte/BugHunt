import Nav from "../components/Navbar";
import styles from "./Topics.module.css";
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useLocalStorage from "../UseLocalStorage";





// const [starsList, setStarsList] = useLocalStorage("starsList", [...Array(5)].map(e => Array(5).fill(0)));
const Topics = () => {

    //const [stars, setStars] = useLocalStorage("stars", [[3,1,2,3,3],[2,1,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
    var stars = JSON.parse(localStorage.getItem("starsList"));
    if (stars == undefined) {
        stars = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    }

    window.localStorage.setItem('starsList', JSON.stringify(stars));
    const syntax = {
        title: "Syntax",
        code: "print('learn syntax')",
        desc: ["Syntax are the rules and structures that govern the construction of valid statements and expressions", "A strong understanding of Python syntax enables programmers to identify and fix common syntax errors efficiently"],
        id: 1,
        google: ["python quote marks", "python indentation", "comments in python", "colons in python", "semicolons python", "python quote marks"]
    }
    
    const variables = {
        title: "Variables",
        code: "learn_topic = 'variables'",
        desc: ["Variables are used to store and manipulate data values in the code, serving as placeholders for information.", "Understanding Python variables includes concepts like declaration, scope, and data types"],
        id: 2,
        google: ["data types python", "python strings", "casting python", "python strings", "python float vs int", "python global variables"]
    }
    
    const loops = {
        title: "Loops",
        code: "for i in range(topics)",
        desc: ["Loops in Python allow us to repeat a set of actions or code block multiple times", "Understanding loops involves knowing the different types, such as 'for' and 'while' loops, which are important when solving complex or repeated problems."],
        id: 3,
        google: ["sequences python", "python iterator", "for loops python", "break statment python", "python float vs int", "range function python"]
    }
    
    const functions = {
        title: "Functions",
        code: "def learn_functions():'",
        desc: ["Coming Soon:", "Debug functions"],
        id: 4,
        google: ["sequences python", "python iterator", "for loops python", "break statment python", "python float vs int", "range function python"]
    }
    
    const logic = {
        title: "OOP",
        code: "class LearnOOP: ",
        desc: ["Coming Soon: ", "Debug Object Oriented Programs (OOP)"],
        id: 5,
        google: ["sequences python", "python iterator", "for loops python", "break statment python", "python float vs int", "range function python"]
    }
    
    
    
    return (

        <div className="min-h-screen h-screen min-w-screen space-b-10 bg-white">
            <Nav />

            <div className="hero h-1/4 bg-[#323842] text-slate-100 mb-10 pt-2">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Select a Topic</h1>
                    <p className="py-6">Each topic gets harder and harder!</p>
                    {/* {starsList.map((item) => <p>{item.toString()}</p>)} */}
                    </div>
                </div>
            </div>
            <div className="h-2/4 justify-centre items-center flex xl:items-start gap-x-4 xl:flex-row flex-col gap-y-4 mx-5 ">

                <LevelCard  dict={syntax}/>
                <LevelCard dict={variables}/>
                <LevelCard dict={loops}/>
                <LevelCard dict={functions}/>
                <LevelCard dict={logic}/>

            </div>

            

        </div>
        
        
    ); 
}

export const LockIcon = () => {

    return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
   </svg>);
}


const LevelCard = (dict) => {
    var props = dict.dict;
    var lockStyle = "";
    var buttonStyle = "";
    var buttonText = <p>Start</p>;
    const navigate = useNavigate();
    var starList = JSON.parse(localStorage.getItem("starsList"));

    const openLevels = () => {
        navigate("/levels", {
            state: {
                props: props
            }
        });
    };


    const handleClick = () => {
        setIsLocked(false);
    }

    

    let levelStarsCount = 0;
    

    for (let stars of starList[props.id-1]) {
        levelStarsCount += stars;
    }

    const [isLocked, setIsLocked] = useLocalStorage(props.title + "Locked", props.id != 1);

    let prevLevelStarsCount = 0;
    if (props.id != 1) {

        for (let stars of starList[props.id-2]) {
            prevLevelStarsCount += stars;
        }

        if (prevLevelStarsCount >= 10) {
            useEffect(() => {
                setIsLocked(false);
            }) 
        }
        else {
            useEffect(() => {
                setIsLocked(true);
            }) 
        }
    }
    else {
        useEffect(() => {
            setIsLocked(false);
        }) 

    }


    if (isLocked) {
        lockStyle = styles.locked;  
        buttonStyle = "btn-disabled";
        buttonText = LockIcon();
      
    }

    
    return (
        <div className={lockStyle + " group object-center transition-height h-1/2 duration-500 ease-in bg-teal-500 card xl:w-1/6 md:w-1/2 sm:w-full shadow-xl basis-1/5 hover:h-[30rem]"}>
            <div className={"card-body " + styles.slateText + lockStyle}>
                <div className="flex flex-row ">
                    <h1 className="card-title text-2xl w-2/3 ">{props.id + ". " + props.title}</h1>
                    <div className="flex flex-row  w-1/3">
                        <div className="w-3/5 mt-0.5 -me-0.5 text-xl ">{levelStarsCount}/15</div>
                        <div className="mask mask-star-2 mt-0.5 bg-orange-400 w-1/5 h-full mx-0"></div>
                    </div>
                     
                </div>

                <Link to="/levels" state ={{id: props.title}}/>
                {/* <button className="btn btn-primary" onClick={handleClick}>handle click</button> */}


                <div className="w-full mt-5 h-[6rem] bg-[#323842] w-1/2 flex justify-center items-center rounded-2xl">
                   <code className="text-info">{"> " + props.code}</code>
                </div>
                
                <div className="flex flex-col justify-center items-centre h-full transistion-opacity duration-300 ease-in opacity-0  group-hover:duration-700 group-hover:opacity-100 gap-y-5">
                    
                    <div className="h-1/3">                
                        <h3 className="list-disc ms-4 space-y-3">
                            <ul>
                                <li>{props.desc[0]}</li>
                                <li>{props.desc[1]}</li>

                            </ul>
                        </h3>
                    </div>       
                    
                    <div className="h=1/3 flex flex-col h-1/2 justify-end w-full ">

                        {isLocked &&   
                            <div className="tooltip w-full " data-tip="Topic Locked! Get 10/15 stars on the previous topic.">
                                <button onClick={openLevels} disabled className={"text-2xl disabled:text-slate-100 disabled:bg-[#323842] w-full btn btn-primary"}>{buttonText}</button>
                            </div>
                        }

                        {!isLocked &&   
                            <button onClick={() => openLevels(dict.title)} className={"w-full btn btn-primary"}>{buttonText}</button>
                        }
                    </div>
                        

                </div>
          
            </div>

            
        </div>
    );
}

export default Topics;