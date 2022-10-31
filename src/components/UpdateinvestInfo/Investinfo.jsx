import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { adminApi } from "../../Api/serverApi";
import Modal from "../Modal/Modal";
import './InvestInfo.css'


const Investinfo = () => {

    const [isInfoLoaded,setIsInfoLoaded] = useState(false)
    const [info, setInfo] = useState([])

    useEffect(() => {

if(!isInfoLoaded){ 
        adminApi.getInfo().then(responce => {
            setInfo(responce.data.investInfo)
            setIsInfoLoaded(true)          
        }).catch(e => {
            console.log(e)
        })
    }
    },[isInfoLoaded])

    let investInfo = info.reverse().map((i,key) => <Updateinfo  setIsInfoLoaded={setIsInfoLoaded} key={key} id={i._id} date={i.date} coin_name={i.coin_name}
        invest_period={i.invest_period} open_order={i.open_order} recommendation={i.recommendation}
        new_order={i.new_order} target_line={i.target_line} stop_line={i.stop_line} description={i.description}
    />)

    return <div className="updateinfo">
        {investInfo}
    </div>
}


const Updateinfo = (props) => {
    const [active, setActive] = useState(false)
    const { register, handleSubmit} = useForm({
        mode: 'onBlur',
    });

    const  onSubmit = async data => {
        await adminApi.updateInfo(data).then(responce => responce)
        props.setIsInfoLoaded(false)
        setActive(false)    
    }

    const deleteOne = async (id)=>{
       await adminApi.deleteInfo(id)
       props.setIsInfoLoaded(false)
    }

    return <div className="investInfo">

        <div><span>Date:</span>{props.date}</div>
        <div><span>ID:</span>{props.id}</div>
        <div><span>Coin name:</span>{props.coin_name}</div>
        <div><span>Investment period:</span>{props.invest_period}</div>
        <div><span>Open order:</span>{props.open_order}</div>
        <div><span>Recommendation:</span>{props.recommendation}</div>
        <div><span>New order:</span>{props.new_order}</div>
        <div><span>Target line:</span>{props.target_line}</div>
        <div><span>Stop line:</span>{props.stop_line}</div>
        <div><span>Description:</span>{props.description}</div>
        <button onClick={() => setActive(true)} className="investInfoBtn">Update</button>
        <button onClick={()=> deleteOne(props.id)}className="investInfoBtn">Delete</button>
  

        <Modal active={active} setActive={setActive}>
            <h2>Update</h2>

            <form className="updateInfoForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="inputWrapper">
                <span>ID:</span>   <input value={props.id} {...register("id")} />
                <span>Coin name:</span>   <input defaultValue={props.coin_name} {...register("coin_name")} />
                <span>Investment period:</span>  <select {...register("invest_period")}>
                        <option value={props.invest_period}>{props.invest_period}</option>
                        <option value="short term">Short term</option>
                        <option value="average term">Average term</option>
                        <option value="long term">Long term</option>
                    </select>
                    <span>Open order:</span>  <input defaultValue={props.open_order}  placeholder="Open order" {...register("open_order")} />
                    <span>Recommendation:</span>   <input defaultValue={props.recommendation} {...register("recommendation")} />
                    <span>New order:</span>  <input defaultValue={props.new_order} {...register("new_order")} />
                    <span>Target line:</span> <input defaultValue={props.target_line} {...register("target_line")} />
                    <span>Stop line:</span>  <input defaultValue={props.stop_line} {...register("stop_line")} />
                    <textarea name="description" defaultValue={props.description} {...register("description")} ></textarea>
                </div>
                <button>Update</button>
            </form>
        </Modal>
    </div>
}




export default Investinfo