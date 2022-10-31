import React from "react";
import { useForm } from "react-hook-form";
import { adminApi } from "../../Api/serverApi";
import './AddInvestInfo.css'


const AddinvestInfo = (props) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = data => {
        adminApi.addInfo(data)
        reset()
    }

    return <form className="addInfoForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputWrapper">
            <input placeholder="Coin name" {...register("coin_name", {
                required: true,
            })} />

            {errors?.Coin_name && <p>"Required field"</p>}

            <select {...register("invest_period")}>
                <option value="">Select investment period</option>
                <option value="short term">Short term</option>
                <option value="average term">Average term</option>
                <option value="long term">Long term</option>
            </select>

            {errors?.invest_period && <p>"Required field"</p>}

            <input placeholder="Open order" {...register("open_order", {
                required: true,
            })} />

            {errors?.open_order && <p>"Required field"</p>}

            <input placeholder="Recommendation" {...register("recommendation", {
                required: true,
            })} />

            {errors?.recommendation && <p>"Required field"</p>}
            <input placeholder="New order" {...register("new_order", {
                required: true,
            })} />
            {errors?.new_order && <p>"Required field"</p>}

            <input placeholder="Target line" {...register("target_line", {
                required: true,
            })} />
            {errors?.target_line && <p>"Required field"</p>}
            <input placeholder="Stop line" {...register("stop_line", {
                required: true,
            })} />
            {errors?.stop_line && <p>"Required field"</p>}

            <textarea placeholder="Description" {...register("description", {
                required: true,
            })} />

        </div>
        <button >Add info</button>
        <button onClick={() => props.closeForm(false)}>Close</button>

    </form>
}

export default AddinvestInfo