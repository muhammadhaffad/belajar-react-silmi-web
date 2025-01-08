import { useRef } from "react";
import '@style/navbar/search/search-field.css';

const SearchField = ({ querySearch, setQuerySearch, handleClickSearchBack, handleClickSearch, isSearchLoading }) => {
    const ref = useRef();
    return (
        <search className='navbar__search-inner-wrapper'>
            <input ref={ref} value={querySearch} onChange={(e) => { setQuerySearch(e.target.value) }} type="text" className='navbar__search-input visible form-control' placeholder='Cari...' />
            <button onClick={handleClickSearchBack} className='navbar__search-back-button btn'><i className="fs-5 bi bi-chevron-left"></i></button>
            {
                isSearchLoading && querySearch &&
                <div className="navbar__search-loading">
                    <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
                </div>
            }
            {
                (querySearch === '')
                    ?
                    <button key={'search'} onClick={() => {handleClickSearch(); ref.current.focus();}} className="navbar__search-button btn"><i className="fs-5 bi bi-search"></i></button>
                    :
                    <button key={'clear'} className="navbar__search-clear-button btn" onClick={(e) => { e.stopPropagation(); setQuerySearch('') }}><i className="fs-5 bi bi-x-lg"></i></button>
            }
        </search>
    )
}
export default SearchField;