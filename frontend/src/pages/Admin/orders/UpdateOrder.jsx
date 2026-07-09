import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateOrder = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/v1/orders/${id}`,
                {
                    withCredentials: true,
                }
            );

            setStatus(response.data.data.orderStatus);
        } catch (error) {
            console.log(error);
        }
    };

    const updateOrder = async () => {
        try {
            setLoading(true);

            await axios.put(
                `http://localhost:5000/api/v1/orders/${id}`,
                {
                    orderStatus: status,
                },
                {
                    withCredentials: true,
                }
            );

            alert("Order Updated Successfully");

            navigate("/admin/orders");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center items-center p-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden">

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">

                    <h1 className="text-3xl font-bold text-white">
                        Update Order
                    </h1>

                    <p className="text-indigo-100 mt-2">
                        Update delivery status
                    </p>

                </div>

                <div className="p-6">

                    <label className="block mb-2 font-semibold">
                        Order Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-lg
                            p-3
                            focus:ring-2
                            focus:ring-indigo-500
                            outline-none
                        "
                    >
                        <option value="pending">
                            Pending
                        </option>

                        <option value="processing">
                            Processing
                        </option>

                        <option value="shipped">
                            Shipped
                        </option>

                        <option value="delivered">
                            Delivered
                        </option>

                        <option value="cancelled">
                            Cancelled
                        </option>
                    </select>

                    <div className="flex flex-col md:flex-row gap-3 mt-6">

                        <button
                            onClick={() =>
                                navigate("/admin/orders")
                            }
                            className="
                                flex-1
                                bg-slate-500
                                hover:bg-slate-600
                                text-white
                                py-3
                                rounded-lg
                            "
                        >
                            Cancel
                        </button>

                        <button
                            onClick={updateOrder}
                            disabled={loading}
                            className="
                                flex-1
                                bg-emerald-600
                                hover:bg-emerald-700
                                text-white
                                py-3
                                rounded-lg
                            "
                        >
                            {loading
                                ? "Updating..."
                                : "Update Status"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default UpdateOrder;