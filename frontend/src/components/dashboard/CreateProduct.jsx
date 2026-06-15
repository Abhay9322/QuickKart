import React from 'react'

const CreateProduct = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-base-100 shadow-2xl rounded-2xl p-8">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-2xl border p-6 shadow-xl ">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Create New Product
                </h1>

                <label className="label font-semibold">title</label>
                <input type="email" className="input input-bordered w-full" placeholder="Enter Product Title" />

                <label className="label font-semibold">description</label>
                <textarea className="textarea textarea-bordered w-full" placeholder='Enter Product Description'></textarea>

                <label className="label font-semibold">quantity</label>
                <input className="number input input-bordered w-full " placeholder="Enter Product Quantity" />

                <label className="label font-semibold">price</label>
                <input type="number" className="price input input-bordered w-full" placeholder="Enter Product Price" />

                <label className="label font-semibold">stock</label>
                <input type="number" className="number input input-bordered w-full" placeholder="Enter Product Stock" />

                <label className="label font-semibold">category</label>
                <select name="" id="" className="select select-bordered w-full" placeholder="Select Category">
                    <option value="">category</option>
                    <option value="">category</option>
                    <option value="">category</option>
                </select>

                <label className="label font-semibold">images</label>
                <input type="file" className="file-input file-input-bordered w-full" placeholder="Upload Product Images" />


                <button className="btn btn-primary w-full text-lg mt-4">Create Product</button>
            </fieldset>
        </div>
    )
}

export default CreateProduct


