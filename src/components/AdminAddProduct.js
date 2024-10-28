import React, { useState, useEffect } from 'react';


const AdminAddProduct = () => {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);

    const fetchProducts = async() => {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', productPrice);
        if (productImage) {
            formData.append('image', productImage);
        }

        if (productId) {
            await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                body: formData,
            });
        } else {
            await fetch('/api/products', {
                method: 'POST',
                body: formData,
            });
        }

        resetForm();
        await fetchProducts();
    };

    const resetForm = () => {
        setProductId(null);
        setProductName('');
        setProductPrice('');
        setProductImage(null);
    };

    const handleEdit = (product) => {
        setProductId(product.id);
        setProductName(product.name);
        setProductPrice(product.price);
        setProductImage(null);
    };

    const handleDelete = async(id) => {
        await fetch(`/api/products/${id}`, {
            method: 'DELETE',
        });
        setProducts(products.filter(product => product.id !== id));
    };

    return ( <
        div className = "admin-container" >
        <
        header >
        <
        nav >
        <
        a href = "/admin/home" > Users < /a> <
        a href = "/admin/categories" > Categories < /a> <
        a href = "/admin/products" > Products < /a> <
        a href = "/orders" > Orders < /a> <
        /nav> <
        /header> <
        h2 > Quản Lý Sản Phẩm < /h2> <
        form onSubmit = { handleSubmit }
        className = "product-form" >
        <
        div >
        <
        label > Tên sản phẩm: < /label> <
        input type = "text"
        value = { productName }
        onChange = {
            (e) => setProductName(e.target.value) }
        required /
        >
        <
        /div> <
        div >
        <
        label > Giá sản phẩm: < /label> <
        input type = "number"
        value = { productPrice }
        onChange = {
            (e) => setProductPrice(e.target.value) }
        required /
        >
        <
        /div> <
        div >
        <
        label > Ảnh sản phẩm: < /label> <
        input type = "file"
        accept = "image/*"
        onChange = {
            (e) => setProductImage(e.target.files[0]) }
        /> <
        /div> <
        button type = "submit" > { productId ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm' } < /button> <
        button type = "button"
        onClick = { resetForm } > Hủy < /button> <
        /form>

        <
        h3 > Danh Sách Sản Phẩm < /h3> <
        table className = "product-table" >
        <
        thead >
        <
        tr >
        <
        th > ID < /th> <
        th > Name < /th> <
        th > Price < /th> <
        th > Image < /th> <
        th > Actions < /th> <
        /tr> <
        /thead> <
        tbody > {
            products.map(product => ( <
                tr key = { product.id } >
                <
                td > { product.id } < /td> <
                td > { product.name } < /td> <
                td > { product.price }
                VND < /td> <
                td > { product.image && < img src = { product.image }
                    alt = { product.name }
                    className = "product-img" / > } <
                /td> <
                td >
                <
                button onClick = {
                    () => handleEdit(product) } > Sửa < /button> <
                button onClick = {
                    () => handleDelete(product.id) } > Xóa < /button> <
                /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        /div>
    );
};

export default AdminAddProduct;