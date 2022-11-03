import React, { useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup'
import './App.css';

import Input from './components/Form/Input';

const initialData = {
}


function App() {
  const formRef = useRef(null);

  
  async function handleSubmit(data, {reset}){
    try{
      //
      const schema = Yup.object().shape({
        name: Yup.string().required('o nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
         phoneNumber: Yup.string()
          .required('apenas numeros') 
      });
  
      await schema.validate(data,{
          abortEarly: false,
      })  
  
      console.log(data);
  
      formRef.current.setErrors({});
  
      reset();
      } catch(err){
        if(err instanceof Yup.ValidationError){
          const errorMessage ={};
  
          err.inner.forEach(error =>{
            errorMessage[error.path] = error.message;
          })
  
          formRef.current.setErrors(errorMessage);

          console.log(data);
        }
      }
    }
 

  useEffect(()=> {
    setTimeout(()=>{
      formRef.current.getData({
        name: 'Gabriel Gomes',
        email:'programador@rethink.dev',
        idade:'25',
        profissão:'Programador',
        telefone:'(31)9-9999-9999',
        dataDePreenchimento:'19/10/2022',

      })
      
    },2000);
  }, [])


  return (
    <div className="App">
      <h1>Formulario Detran</h1>

      <Form ref={formRef}  initialData={initialData} onSubmit={handleSubmit}>
        <Input type="name"  name="name" label="Nome" />
        <Input type="number"  label="Idade" name="idade"/>
        <Input type="name" label="Profissão" name="profissão"/>
        <Input type="email" label="E-mail" name="email"/>
        <Input type="string" label="Telefone" name="telefone"/>
        <Input type="data" label="Data de Preenchimento" name="data de preenchimento"/>
        
      
        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
