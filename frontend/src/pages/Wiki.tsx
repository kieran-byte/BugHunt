import React, { useRef, useState, useEffect} from 'react';
import {
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCol,
  IonRow,
  IonApp,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import Button from '../components/Button.tsx'
import styles from './Wiki.module.css'
import Nav from "../components/Navbar";
import comment from '../images/comments.png'
import multiComment from '../images/multiComment.png'
import semiColon from '../images/semiColon.png'
import indent from '../images/indent.png'
import loopRange from '../images/loopRange.png'
import rangeStep from '../images/rangeStep.png'
import whileRange from '../images/whileRange.png'
import whileTrue from '../images/whileTrue.png'
import Conditional from '../images/conditionals.png'
import arrays from '../images/arrays.png'
import functionImg from '../images/function.png'
import functionUse from '../images/functionUse.png'


const Forum = () => {
  const syntaxRef = useRef(null);
  const variablesRef = useRef(null);
  const loopsRef = useRef(null);
  const conditionalsRef = useRef(null);
  const arraysRef = useRef(null);
  const functionsRef = useRef(null);

  const menuButtonClick = () =>{
    window.open('http://localhost:5173/', '_self');
  };


  const handleScroll = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return(

    <IonApp className={styles.hideBar} >
      <IonGrid className={styles.color}>
        <IonRow>
            <IonCol size-md="1.5" size-xs="4" class={styles.fixedColumn}>
              <IonToolbar class={styles.row}>


              <IonRow >            
              <Button class={styles.button} onClick={() => handleScroll(syntaxRef)}>Syntax</Button>     
              </IonRow>

              <IonRow>
              <Button class={styles.button} onClick={() => handleScroll(variablesRef)}>Variables</Button>
              </IonRow>

              <IonRow>
              <Button class={styles.button} onClick={() => handleScroll(loopsRef)}>Loops</Button>
              </IonRow>

              <IonRow>
              <Button class={styles.button} onClick={() => handleScroll(conditionalsRef)}>Conditionals</Button>
              </IonRow>

               <IonRow>
               <Button class={styles.button} onClick={() => handleScroll(arraysRef)}>Arrays</Button>
               </IonRow>

              <IonRow>
              <Button class={styles.button} onClick={() => handleScroll(functionsRef)}>Functions</Button>
              </IonRow>


            </IonToolbar>
            </IonCol>
            
            
            <IonCol>

              <IonRow className={styles.titleText}>
              <p > Welcome to our Wikipedia!</p>
              </IonRow>
                
              
              <br/>
              <p className={styles.centerText}>
                This is wiki information 
                for all of the topics we are going to be teaching
              </p>
              <br />

              <div>
                <IonTitle className={styles.sectionTitle} ref={syntaxRef}>
                  Syntax
                </IonTitle>
                
                <IonRow>
                  <IonCol>
                  <h2 className={styles.sectionSubHeader}>
                    Comments
                  </h2>
                  <IonRow>
                    <IonCol className={styles.imageCenter}>
                    <img src={comment}  style={{ width: 587, height: 174 }} ></img>
                    </IonCol>
                    <IonCol className={styles.imageCenter}>
                    <img src={multiComment} style={{ width: 587, height: 174 }}  ></img>
                    </IonCol>
                   
                  </IonRow>
                  <p className={styles.centerText}>
                    In Python, you can add comments to your code using the # (Hash) symbol. Comments will not run like other code and are useful for adding explanations or disabling lines of code.
                    To do a multiline comment, place triple quotes ("""") at the beginning of the comment and triple qutoes at the end of the comment.
                  </p>
                  </IonCol>
                </IonRow>
                
                <IonRow>
                  <IonCol>
                  <h2 className={styles.sectionSubHeader}>
                  Variables
                  </h2>
                  <IonRow>
                    <IonCol className={styles.imageCenter}>
                    <img src={semiColon}  style={{ width: 456, height: 111 }} ></img>
                    </IonCol>
                  </IonRow>

                  <p className={styles.centerText}>
                    Variables are used to store data in Python. You don't need to declare the type explicitly, python infers it automatically. Semicolons are not required after variable declarations or line ends as in most other langauges. However, they can be placed.
                  </p>
                  </IonCol>
                </IonRow>


                <IonRow>
                  <IonCol>
                  <h2 className={styles.sectionSubHeader}>
                  Indents
                  </h2>
                  <IonRow>
                    <IonCol className={styles.imageCenter}>
                    <img src={indent}  style={{ width: 455, height: 154 }} ></img>
                    </IonCol>
                  </IonRow>
                  <p className={styles.centerText}>
                  Instead of using semicolons like many other software languages. Python uses indents instead. For example these indents are required after conditional statements, loops and function decalrations.
                 </p>
                  </IonCol>
                </IonRow>


                


                <IonTitle className={styles.sectionTitle} ref={variablesRef}>
                  Variables
                </IonTitle>

                <p className={styles.centerText}>
                In Python, variables are used to store and manipulate data. 
                A variable is like a container that holds a value, 
                and you can give it a name to refer to that value later in your code.
                </p> <br/>

                <h2 className={styles.sectionSubHeader}>Variable Naming Conventions</h2>
                  <IonList lines="none" className={styles.bulletList}>
                    <IonLabel>
                      <ul>
                      <li>Variable names can contain letters (a-z, A-Z), digits (0-9), and underscores (_).</li>
                      <li>Variable names must start with a letter or an underscore, they cannot start with a digit</li>
                      <li>Variable names are case-sensitive, so myVar and myvar are different variables.</li>
                      <li>Avoid using Python keywords as variable names as variable names are case-sensitive, so myVar and myvar are different variables.</li>
                      </ul>
                    </IonLabel>
                  </IonList>
                  <br/>


                <h2 className={styles.sectionSubHeader}> Variable Assignments</h2>
                <p> To assign a value to a variable, you can use the = operator. For example: <br/>
                
                <IonList lines="none" className={styles.bulletList}>
                    <IonLabel>
                      <ul>
                        <li>message = "Hello, world!"</li>
                        <li> x = 10</li>
                      </ul>
                    </IonLabel>
                </IonList>

                In this example, we assigned the value 10 to the variable x, 
                and the string "Hello, world!" to the variable message.
                </p><br/>

                <h2 className={styles.sectionSubHeader}> Variable Data Types</h2>
                <p>
                Python is a dynamically typed language, which means you don't need to explicitly declare the type of a variable. The type of a variable is determined based on the value assigned to it. Some commonly used data types in Python include:
                </p>
                <br/>

                <IonList  className={styles.bulletList}>
                    <IonLabel>
                      <ul>
                        <li>Numeric Types: int (integer), float (floating-point number), complex (complex number) </li>
                        <li>String Type: str (array of characters)</li>
                        <li>Boolean Type: bool (either True or False)</li>
                        <li>Array Types: can contain numberic and string types </li>
                    </ul>
                  </IonLabel>
                </IonList>
                <br/>

                <h2 className={styles.sectionSubHeader}> Variable Usage</h2>

                <p>
                You can use variables in various ways, such as performing calculations, 
                storing user input, or keeping track of program state. You can assign new values to variables at any point in your code. 
                The variable will store the latest assigned value. 
                </p>
                <br/>

                <IonTitle className={styles.sectionTitle} ref={loopsRef}>
                  Loops
                </IonTitle>

                <IonRow>
                  <IonCol>
                  <h2 className={styles.sectionSubHeader}>
                  For Loops
                  </h2>
                  <IonRow>
                    <IonCol className={styles.imageCenter}>
                    <img src={loopRange}  style={{ width: 587, height: 160 }} ></img>
                    </IonCol>
                    <IonCol className={styles.imageCenter}>
                    <img src={rangeStep} style={{ width: 587, height: 160 }}  ></img>
                    </IonCol>   
                  </IonRow>
                  <p className={styles.centerText}>
                  The for loop iterates over a sequence (such as a list, tuple, string, or range) or any other iterable object.
                  This can iterate over a range of numbers (1,5) or a range of numbers with given step size. range(0,10,2).
                 </p>
                  </IonCol>
                </IonRow>


                <IonRow>
                  <IonCol>
                  <h2 className={styles.sectionSubHeader}>
                  While Loops
                  </h2>
                  <IonRow>
                    <IonCol className={styles.imageCenter}>
                    <img src={whileRange}  style={{ width: 587, height: 174 }} ></img>
                    </IonCol>
                    <IonCol className={styles.imageCenter}>
                    <img src={whileTrue} style={{ width: 587, height: 174 }}  ></img>
                    </IonCol>
                   
                  </IonRow>
                  <p className={styles.centerText}>
                  The while loop repeatedly executes a block of code as long as a certain condition is true.
                  This can while True, or while a variable meets a certain condition, e.g count lesser than 5.
                 </p>
                  </IonCol>
                </IonRow>


                <IonTitle className={styles.sectionTitle} ref={conditionalsRef}>
                  Conditionals
                </IonTitle>
                <IonRow>
                    
                    
                   
                  </IonRow>
                <p className={styles.centerText}>In Python, conditionals are used to control the flow of execution based on certain conditions. 
                  They allow you to make decisions and execute different blocks of code based on whether a condition is true or false.
                  There are three main types of conditionals in python: "if", "if else" and "else" statements. 
                  </p>

                <IonRow>
                  <IonCol>
                  <h2 className={styles.sectionSubHeader}>
                  If statements
                  </h2>
                  <p className={styles.centerText}> An "if" statement allows a certain block of code to be executed if the given condition is true. </p>
                  </IonCol>
                </IonRow>


                <IonRow>
                  <IonCol>
                  <h2 className={styles.sectionSubHeader}>
                  Else statements
                  </h2>
                  <p className={styles.centerText}> The "else" statement follows an "if" statement and allows you to execute one block of code if a condition is true, and a different block of code if the condition is false. </p>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                  <h2 className={styles.sectionSubHeader}>
                  If else statements
                  </h2>
                  <p className={styles.centerText}> In between the "if" statement and "else" statement, there is an "if else" statement. This allows you to check multiple conditions and execute different blocks of code based on which condition is true. </p>
                  </IonCol>
                </IonRow>

                <br/>
                <p className={styles.centerText}>
                These conditionals allow you to make decisions in your code based on various conditions, which helps in creating dynamic and flexible programs.
                </p>
                <IonCol className={styles.imageCenter}>
                  <img src={Conditional}  style={{ width: 600, height: 300 }} ></img>
                </IonCol>
                <br />


                <IonTitle className={styles.sectionTitle} ref={arraysRef}>
                  Arrays
                </IonTitle>

                <p className={styles.centerText}>In Python, an array is a data structure that can store a collection of elements of the same type. 
                  Arrays are used to organize and manipulate a group of related values under a single variable name. 
                  Arrays can be implemented using the built-in list type. Unlike some other programming languages, Python lists are dynamic and can store elements of different types.
                  Each element in an array is assigned an index, starting from 0 for the first element and each index can be used to access individual elements in the array. 
                  Each array element can also be modified by assigning new values to specific indices. 
                  </p>

                <IonRow>
                  <IonCol>
                  <h2 className={styles.sectionSubHeader}>
                  Array Operations
                  </h2>
                  <p> Python arrays are versatile and provide several built-in functions and methods for manipulating and working with them. For example: <br/> </p>
                  <IonCol className={styles.imageCenter}>
                    <img src={arrays}  style={{ width: 600, height: 200 }} ></img>
                  </IonCol>
                  <IonList  className={styles.bulletList}>
                    <IonLabel>
                      <ul>
                        <li>'len()' function: Gets the length of the array</li>
                        <li>'append()' function: Adds elements to the end of the array</li>
                        <li>'remove()' function: Removes a specified element from the array </li>
                        <li>'sort()' function: Sorts elements in the array in ascending order. (works for both string and integer arrays)</li>
                      </ul>
                    </IonLabel>
                  </IonList>
                  
                  <br/>

                  </IonCol>
                </IonRow>

                <p>
                Arrays in Python provide a convenient way to work with collections of related data and perform various operations on them efficiently.
                </p>
                <br />

                <IonTitle className={styles.sectionTitle} ref={functionsRef}>
                  Functions
                </IonTitle>

                <p className={styles.centerText}>In Python, functions are blocks of reusable code that perform a specific task. 
                  They allow you to break down your program into smaller, more manageable pieces, making your code more organized, modular, and easier to read and maintain. 
                  Functions are defined using the def keyword, followed by the function name, parentheses (), and a colon : to indicate the start of the function block. 
                  </p>

                <IonRow>
                  <IonCol>
                  <h2 className={styles.sectionSubHeader}>
                  Function Components
                  </h2>
                  <p> These are the basic components of a function: <br/> </p>
                  <IonRow>
                    <IonCol className={styles.imageCenter}>
                      <img src={functionImg} style={{ width: 587, height: 174 }}  ></img>
                    </IonCol>
                    <IonCol className={styles.imageCenter}>
                      <img src={functionUse} style={{ width: 587, height: 174 }}  ></img>
                    </IonCol>
                  </IonRow>
                  
                  <IonList  className={styles.bulletList}>
                    <IonLabel>
                      <ul>
                        <li>Function Name: This is the identifier for the function and should follow Python's naming conventions. 
                          It is best to choose a descriptive name that reflects the purpose of the function.</li>

                        <li>Parameters: These are optional inputs that can be passed to the function. They allow you to provide data to the function for it to work with. 
                          Parameters are placed within the parentheses '()', and multiple parameters can be separated by commas.</li>

                        <li>Function Body:  It is the block of code inside the function that is executed when the function is called. 
                          It should be indented to indicate that it belongs to the function.</li>

                        <li>Return Statement: This is optional and is used to specify the value that the function should return when it is called. 
                          If a return statement is not provided, the function will return 'None' by default.</li>
                      </ul>
                    </IonLabel>
                  </IonList>
                  <br/>

                  <p>
                  Functions can be called multiple times, and you can reuse them throughout your code. 
                  They allow you to encapsulate specific logic, promote code reuse, and make your code more modular and maintainable.
                  </p>

                  </IonCol>
                </IonRow>
                
              </div>
            </IonCol>


            </IonRow>
        </IonGrid>

      
    </IonApp>

  );
};

export default Forum;
