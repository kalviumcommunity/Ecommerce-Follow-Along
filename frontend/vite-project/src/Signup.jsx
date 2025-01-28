import { useState } from 'react'

const Signup = () => {
    const [form,setForm] = useState({
        name:"",
        email:"",
        password:""
    });

    const handleNameChange = (e)=>{
        setForm({
            ...form,name:e.target.value
        })
    };

    const handleEmailChange = (e)=>{
        setForm({
            ...form,email:e.target.value
        })
    };

    const handlePasswordChange = (e)=>{
        setForm({
            ...form,password:e.target.value
        })
    };

    const handleSubmit =  async (e)=>{
        e.preventDefault();

        if (!form.email.includes('@')){
            alert("Please Enter a Valid Email Address")
        };

        if (form.password.length<8 || form.password.length>16){
            alert("Enter a password within a range of 8-16 Characters")
        };

        let payload = {
            name : form.name,
            email : form.email,
            password : form.password
        }

        await fetch("http://localhost:8080/Signup",{
            method : "POST",
            headers : {"Content-Type":"application-json"},
            body : JSON.stringify(payload)
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            alert("Hurray! Sign-up succesfully")
        }).catch((err)=>{
            console.log(err)
        })

        
    }
    
    return (
        
        <div className='bg-green-300 w-[30rem] '>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
            <label htmlFor="">Name</label>
            <input type="text" value={form.name} onChange={handleNameChange}/>
            <label htmlFor="">Email</label>
            <input type="email" value={form.email} onChange={handleEmailChange}/>
            <label htmlFor="">Password</label>
            <input type="password" value={form.password} onChange={handlePasswordChange}/>

            <button type='submit' className='bg-green-800 hover:bg-green-700 rounded p-1 text-white m-3'>Submit</button>
        </form>
        </div>
        
        )
    }

export default Signup;
