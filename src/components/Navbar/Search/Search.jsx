import { useEffect, useRef, useState } from "react";
import '@style/global.css';

export default function Search() {
    const [querySearch, setQuerySearch] = useState('');
    const [searchResult, setSearchResult] = useState({});
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const navbarSearchRef = useRef();

    function handleClickSearch() {
        if (document.body.clientWidth < 992) {
            navbarSearchRef.current.classList.add('visible');
        }
    }
    function handleClickSearchBack() {
        setQuerySearch('');
        if (document.body.clientWidth < 992) {
            navbarSearchRef.current.classList.remove('visible');
        }
    }

    const handleSearch = async (value) => {
        if (querySearch === '') {
            setSearchResult({});
            return;
        }
        setIsSearchLoading(true);
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${value}&limit=5`).then((response) => response.json());
            setSearchResult(response);
        } catch (error) {
            alert(error);
        } finally {
            setIsSearchLoading(false);
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch(querySearch);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [querySearch]);

    return <>
        <search className='navbar__search-inner-wrapper'>
            <input value={querySearch} onChange={(event) => setQuerySearch(event.target.value)} type="text" className='navbar__search-input visible form-control' placeholder='Cari...' />
            <button onClick={handleClickSearchBack} className='navbar__search-back-button btn'><i className="fs-5 bi bi-chevron-left"></i></button>
            {
                isSearchLoading && querySearch &&
                <div className="navbar__search-loading">
                    <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
                </div>
            }
            {(querySearch === '')
                ?
                <button onClick={handleClickSearch} className="navbar__search-button btn"><i className="fs-5 bi bi-search"></i></button>
                :
                <button className="navbar__search-clear-button btn" onClick={(event) => { event.stopPropagation(); setQuerySearch('') }}><i className="fs-5 bi bi-x-lg"></i></button>
            }
        </search>
        {
            (Object.keys(searchResult).length > 0 && searchResult.total > 0) ?
                <article className='navbar__search-result'>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className='fw-bold d-block'>PRODUK</span>
                        {searchResult.total > 5 ? <small className='fw-bold d-block'><u>Lihat Semua ({searchResult.total})</u></small> : null}
                    </div>
                    <ul className='navbar__search-result-list'>
                        {searchResult.products.map((data) => <li key={data.id} className='navbar__search-result-item'>
                            <div className="navbar__search-result-card">
                                <img src={data.images.shift()} width={100} height={100} alt="" />
                                <div>
                                    <small className='text-nowrap d-block'>{data.brand}</small>
                                    <small className='fw-bold d-block'>{data.title}</small>
                                    {(data.discountPercentage > 0) ? <div className='text-nowrap d-flex gap-1'><small className='text-danger'>Rp{parseFloat(data.price * (1 - data.discountPercentage / 100)).toFixed(2)}</small><small><s>Rp{data.price}</s></small></div> : <div className='text-nowrap d-flex gap-1'><small>Rp{data.price}</small></div>
                                    }
                                </div>
                            </div>
                        </li>)}
                    </ul>
                </article> : null
        }
    </>
}