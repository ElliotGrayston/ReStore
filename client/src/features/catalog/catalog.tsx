import { useEffect } from "react";
import LoadingCompoment from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog() {
    // const [products, setProducts] = useState<Product[]>([]);
    // const [loading, setLoading] = useState(true);
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // agent.Catalog.list()
        //     .then(products => setProducts(products))
        //     .catch(error => console.log(error))
        //     .finally(() => setLoading(false))

        if (!productsLoaded) 
            dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    if (status.includes('pending')) return <LoadingCompoment message = 'Loading Products...' />;

    return (
        <>
            <ProductList products={products} />
        </>
    )
}