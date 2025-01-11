import './search-result.css';

export const ResultItem = ({ data }) => {
    return (
        <li className='navbar__search-result-item'>
            <div className="navbar__search-result-card">
                <img src={data.images.shift()} width={100} height={100} alt="" />
                <div>
                    <small className='text-nowrap d-block'>{data.brand}</small>
                    <small className='fw-bold d-block'>{data.title}</small>
                    {(data.discountPercentage > 0) ? <div className='text-nowrap d-flex gap-1'><small className='text-danger'>Rp{parseFloat(data.price * (1 - data.discountPercentage / 100)).toFixed(2)}</small><small><s>Rp{data.price}</s></small></div> : <div className='text-nowrap d-flex gap-1'><small>Rp{data.price}</small></div>
                    }
                </div>
            </div>
        </li>
    );
}
const SearchResult = ({ searchResult }) => {
    return (
        <article className='navbar__search-result'>
            <div className="d-flex align-items-center justify-content-between mb-2">
                <span className='fw-bold d-block'>PRODUK</span>
                {searchResult.total > 5 ? <small className='fw-bold d-block'><u>Lihat Semua ({searchResult.total})</u></small> : null}
            </div>
            <ul className='navbar__search-result-list'>
                {searchResult.products.map((data) => <ResultItem key={data.id} data={data}></ResultItem>)}
            </ul>
        </article>
    )
}
export default SearchResult;