import React,{useState,useContext,useEffect} from 'react';
import Row from './Row';
import {ThemeContext,LocaleContext} from './context';
export default function Greeting(props){
    //how does it know which state variable correspont which state call?
    // answer is : react relase on the order of this calls.
    //there is rule you need follow when you use hooks. And the rule is that, you cannot call hook insade a condition it has 
    // to be at top level of your component
    // This is not correct way to use hooks : 
    // if(props.condition ){
    //     const [name,setName]= useState('Emre');
    // }
   
    // const [surname,setSurname]= useState('Cavunt');
    const name = useFormInput('Emre');
    const surname = useFormInput('Cavunt');
    const theme = useContext(ThemeContext);
    const locale=useContext(LocaleContext);
    const width=useWindowWith();
    useDocumentTitle(name.value + ' ' + surname.value);
    
  
    // function handleSurnameChange(e){
    //     setSurname(e.target.value);
    // }
    return(
       <section className={theme}>
           <Row label="Name">
            {/* <input
                value={name}
                onChange={handleNameChange}
            /> */}
            <input
                {...name}
            />
           </Row> 
           <Row label="Surname">
            <input
                {...surname}
            />
           </Row>
           <Row label="Language">
           {locale}
           </Row>
           <Row label="Width">
           {width}
           </Row>
       </section>
    );
    }

function useFormInput(initialValue){
    const [value,setValue]= useState(initialValue);
    function handleChange(e){
        setValue(e.target.value);
    }
    return {
        value,
        onChange:handleChange
    };
}

function useDocumentTitle(title){
    // componentDidMount after componentDidUpdate
    useEffect(()=>{
        document.title = title;
    });
}

 //CustomHook it always start with use
function useWindowWith(){
    const [width,setWidth] = useState(window.innerWidth);
    useEffect(()=>{
        const handleResize  =() => setWidth(window.innerWidth);
        window.addEventListener('resize',handleResize);
        return() =>{
        window.removeEventListener('resize',handleResize);
        }
    });
    return width;
}
