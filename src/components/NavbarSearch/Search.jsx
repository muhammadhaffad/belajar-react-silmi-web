import { forwardRef, useEffect, useRef, useState } from "react";
import './search.css';
import SearchField from "./SearchField";
import SearchResult from "./SearchResult";

const SearchWrapper = forwardRef((props, ref) => {
    const { className, children } = props;
    return (
        <div ref={ref} className={`${className || ''} navbar__search navbar__search-wrapper`}>
            {children}
        </div>
    );
});
SearchWrapper.displayName = 'SearchWrapper';
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
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [querySearch]);

    return <>
        <SearchWrapper ref={navbarSearchRef}>
            <SearchField querySearch={querySearch} setQuerySearch={setQuerySearch} handleClickSearch={handleClickSearch} handleClickSearchBack={handleClickSearchBack} isSearchLoading={isSearchLoading}></SearchField>
            {(Object.keys(searchResult).length > 0 && searchResult.total > 0) && <SearchResult searchResult={searchResult}></SearchResult>}
        </SearchWrapper>
    </>
}