import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
    {
        id: 'p1',
        price: 6,
        title: 'My first Book',
        description: 'The first book i ever wrote'
    },
    {
        id: 'p2',
        price: 5,
        title: 'My second Book',
        description: 'The second book i ever wrote'
    }
]

const Products = (props) => {
    const productList = DUMMY_PRODUCTS.map(item => {
        return (
            <ProductItem
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
            />
        )
    });

    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                {productList}
            </ul>
        </section>
    );
};

export default Products;
