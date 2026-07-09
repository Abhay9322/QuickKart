const TopProducts = () => {
    const products = [
        {
            id: 1,
            name: "Organic Tomato",
            sales: 150,
        },
        {
            id: 2,
            name: "Fresh Onion",
            sales: 120,
        },
        {
            id: 3,
            name: "Green Chilli",
            sales: 90,
        },
    ];

    return (
        <div className="
            bg-white
            rounded-2xl
            shadow-lg
            border
            border-slate-200
            overflow-hidden
        ">
            <div className="
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                px-6
                py-4
            ">
                <h2 className="text-xl font-bold text-white">
                    Top Products
                </h2>
            </div>

            <div className="p-6">

                <div className="space-y-4">

                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="
                                flex
                                justify-between
                                items-center
                                border-b
                                pb-3
                            "
                        >
                            <div>
                                <h3 className="font-semibold text-slate-800">
                                    {product.name}
                                </h3>
                            </div>

                            <span className="
                                bg-emerald-100
                                text-emerald-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                font-medium
                            ">
                                {product.sales} Sales
                            </span>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
};

export default TopProducts;