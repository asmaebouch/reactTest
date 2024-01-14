import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React ,{useState} from 'react'
import {
faCircle,
} from "@fortawesome/free-solid-svg-icons";
function Prooducts() {
  const[products,setProducts]=  useState([
        {id:1,name:"computer",price:4300,checked:false},
        {id:2,name:"Printer",price:3200,checked:true},
        {id:3,name:"Smart Phone",price:1200,checked:false}

    ])
    const handleDeleteProduct=(product)=>{
        const newProducts=products.filter(p=>p.id != product.id);
    setProducts(newProducts);
    };
    const handleCheckProduct=(product)=>{
        const newProducts = products.map(p=>{
            if(p.id==product.id){
                p.checked=!p.checked;
            }
            return p;
        })
        setProducts(newProducts);
    };
  return (
    <div>{/* Content Wrapper. Contains page content */}
    <div className="content-wrapper">
    <div className='p-3'>
        <div className='row'>
<div className='col-md-6'>

<div  className='card'>
            <div className='card-body'> 
<table className='table'>
<thead>
   <tr>
    <th> ID</th>
    <th> name</th>
    <th> price</th>
    <th> checked</th>
        </tr> 
</thead>
<tbody>
    {
        products.map(product=>(
<tr  key={product.id} >
    <td>{product.id}</td>
    <td>{product.name}</td>
    <td>{product.price}</td>
    <td>{product.checked}</td>
<td>
    <button onClick={()=>handleCheckProduct(product)}
    className='btn btn-outline-sucess'>
        <FontAwesomeIcon 
        icon={product.checked?faCheckCircle:faCircle}>

        </FontAwesomeIcon>

    </button>
</td>
<td>
    <button onClick={()=>handleDeleteProduct(product)} className='btn btn-outline-danger'>
        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
    </button>
</td>

</tr>

        ))
    }
</tbody>

</table>



</div>
        </div>
        
<table>

    
</table>
            </div>
        </div>
        
        </div>
        </div>
        </div>  )
}

export default Prooducts