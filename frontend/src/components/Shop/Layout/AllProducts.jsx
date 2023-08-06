import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsShop,
} from "../../../redux/actions/product";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import DataFetchLoader from "../../Layout/DataFetchLoader";
import { DataGrid } from "@mui/x-data-grid";
import animationData from "../../../assets/animations/noDataLoader.json";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const handleProductDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload(true);
  };
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "stock", headerName: "Stock", minWidth: 80, flex: 0.5 },
    { field: "sold", headerName: "Sold Out", minWidth: 130, flex: 0.6 },
    {
      field: "preview",
      headerName: "Preview",
      minWidth: 100,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete",
      minWidth: 100,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                size={20}
                onClick={() => handleProductDelete(params.id)}
              />
            </Button>
          </>
        );
      },
    },
  ];
  const row = [];
  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "₹ " + item.discountPrice,
        stock: item.stock,
        sold: 10,
      });
    });
  return (
    <>
      {isLoading ? (
        <DataFetchLoader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          {products.length === 0 ? (
            <DataFetchLoader animation={animationData}/>
          ) : (
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          )}
        </div>
      )}
    </>
  );
};

export default AllProducts;
