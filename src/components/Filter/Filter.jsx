import { forwardRef, useEffect, useRef, useState } from "react";

export function FilterContainerMobile({ handleOnClick }) {
    return (
        <div className="filter__container--mobile">
            <button onClick={() => handleOnClick('panel')} className='filter__button fw-bold text-start align-items-center btn w-100'>Terapkan Filter<span>+</span></button>
            <div className='border-end my-n1 mx-1 border-dark' />
            <button onClick={() => handleOnClick('control')} className='filter__button fw-bold text-start align-items-center btn w-100'>Urutkan Berdasarkan<span>+</span></button>
        </div>
    )
}

export function FilterContainer({ visible, children }) {
    return (
        <div className={`filter__container ${visible ? 'active' : ''}`}>
            {children}
        </div>
    );
}

export function FilterButton({ active, setActive, text, renderStatus }) {
    return (
        <button onClick={() => setActive(!active)} className={`filter__button btn ${active ? 'active' : ''}`}>
            <div>
                {text}
                <small className='filter__status--mobile'>
                    {renderStatus()}
                </small>
            </div><span>{active ? '−' : '+'}</span>
        </button>
    );
}

export function FilterPanelItem() {
    const [active, setActive] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        function handleClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setActive(false);
            }
        }
        document.body.addEventListener('click', handleClick)
        return () => {
            document.body.removeEventListener('click', handleClick)
        }
    });

    return (
        <div ref={ref} className="filter__panel-item">
            <FilterButton text={'Harga'} active={active} setActive={setActive} renderStatus={() => 'asdfasdf'}></FilterButton>
            {/* <button onClick={() => handleClickButtonFilter(1)} className={`filter__button btn ${filterActive === 1 ? 'active' : ''}`}>
                <div>
                    Harga
                    {(filter.harga[0] !== min || filter.harga[1] !== max) &&
                        <small className='filter__status--mobile'>
                            {numberToRupiah(filter.harga[0])} − {numberToRupiah(filter.harga[1])}
                        </small>}
                </div><span>{filterActive === 1 ? '−' : '+'}</span>
            </button> */}
            <div className="filter__options">
                <div className="filter__options-container">

                </div>
            </div>
        </div>
    )
};

export function FilterPanel({ visible, setVisible }) {
    return (
        <div className={`filter__panel ${visible === 'panel' ? 'active' : ''}`}>
            <div className='filter__header p-3 border-bottom text-uppercase lh-1 sticky-top top-0 bg-white d-flex align-items-center justify-content-between d-lg-none'><span>Terapkan Filter</span><button onClick={() => setVisible(null)} className='btn p-0'><i className="fs-5 bi bi-x-lg"></i></button></div>
            <div ref={(el) => filterRefs.current[0] = el} className="filter__panel-item">
                <button onClick={() => handleClickButtonFilter(1)} className={`filter__button btn ${filterActive === 1 ? 'active' : ''}`}>
                    <div>
                        Harga
                        {(filter.harga[0] !== min || filter.harga[1] !== max) &&
                            <small className='filter__status--mobile'>
                                {numberToRupiah(filter.harga[0])} − {numberToRupiah(filter.harga[1])}
                            </small>}
                    </div><span>{filterActive === 1 ? '−' : '+'}</span>
                </button>
                <div className="filter__options">
                    <div className="filter__options-container">
                        <div className="d-flex w-100 gap-1 justify-content-center">
                            <span>
                                {numberToRupiah(filter.harga[0])} − {numberToRupiah(filter.harga[1])}
                            </span>
                        </div>
                        <Range
                            values={filter.harga}
                            step={step}
                            min={min}
                            max={max}
                            onChange={(values) => {
                                setFilter({ ...filter, ['harga']: values });
                            }}
                            renderTrack={({ props, children }) => (
                                <div style={{
                                    height: '2rem',
                                    alignItems: 'center',
                                    display: 'flex',
                                    padding: '0 .5rem'
                                }}>
                                    <div
                                        ref={props.ref}
                                        style={{
                                            height: ".2rem",
                                            width: "100%",
                                            borderRadius: "0",
                                            background: getTrackBackground({
                                                values: filter.harga,
                                                colors: ["var(--bs-light)", "var(--bs-dark)", "var(--bs-light)"],
                                                min: min,
                                                max: max,
                                            }),
                                        }}
                                    >
                                        {children}
                                    </div>
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    key={props.key}
                                    style={{
                                        ...props.style,
                                        height: "1.25rem",
                                        width: "1.25rem",
                                        border: '2px solid var(--bs-dark)',
                                        borderRadius: "1rem",
                                        backgroundColor: "white"
                                    }}
                                ></div>
                            )}
                        ></Range>
                    </div>
                </div>
            </div>
            <div ref={(el) => filterRefs.current[1] = el} className="filter__panel-item">
                <button onClick={() => handleClickButtonFilter(2)} className={`filter__button btn ${filterActive === 2 ? 'active' : ''}`}>
                    <div>
                        Warna
                        <small className='filter__status--mobile'>
                            {filter.warna.filter(o => o.checked).map(o => o.label).join(', ')}
                        </small>
                    </div>
                    <span>{filterActive === 2 ? '−' : '+'}</span>
                </button>
                <div className="filter__options">
                    <div className="filter__options-container">
                        <div className="mb-3 border-bottom border-dark p-1 d-flex gap-2">
                            <span className='ps-1'>
                                <i className="fs-5 bi bi-search"></i>
                            </span>
                            <input type="text" value={searchColor} onChange={e => setSerachColor(e.target.value)} className='form-control p-0 border-0' placeholder='Cari warna...' />
                        </div>
                        <ul className='list-unstyled mb-0 d-flex flex-column flex-grow-1 gap-3 overflow-auto'>
                            {filter.warna.filter(color => color.label.toLowerCase().includes(searchColor.toLowerCase())).map(color => (
                                <li key={color.value} className='d-flex gap-2 w-100'>
                                    <input type="checkbox" checked={color.checked} onChange={() => handleClickColorFilter(color.value, color.checked)} className='border border-dark form-check-input rounded-0 m-0 prevent-select' style={{ width: '1.5rem', height: '1.5rem' }} id={color.value} />
                                    <label className='w-100 cursor-pointer' htmlFor={color.value}>{color.label}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div ref={(el) => filterRefs.current[2] = el} className="filter__panel-item">
                <button onClick={() => handleClickButtonFilter(3)} className={`filter__button btn ${filterActive === 3 ? 'active' : ''}`}>
                    <div>
                        Ukuran
                        <small className='filter__status--mobile'>
                            {filter.ukuran.filter(o => o.checked).map(o => o.label).join(', ')}
                        </small>
                    </div>
                    <span>{filterActive === 3 ? '−' : '+'}</span>
                </button>
                <div className="filter__options">
                    <div className="filter__options-container">
                        <div className="flex-grow-1 gap-2 overflow-auto d-grid grid-cols-4 grid-lg-cols-3">
                            {filter.ukuran.map((size) => (
                                <div key={size.value} className="form-group d-inline-block m-0 form-check-bg">
                                    <input type="checkbox" checked={size.checked} className="form-check-bg-input" id={size.value} autoComplete="false" onChange={() => handleClickSizeFilter(size.value, size.checked)} />
                                    <label className="form-check-label text-center w-100 prevent-select rounded-0 border-dark" htmlFor={size.value}>{size.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Filter() {
    const [visibleFilter, setVisibleFilter] = useState(null);

    return (
        <div className="filter">
            <FilterContainerMobile handleOnClick={setVisibleFilter}></FilterContainerMobile>
            <FilterContainer visible={visibleFilter}>
                <FilterPanel visible={visibleFilter} setVisible={setVisibleFilter}></FilterPanel>
            </FilterContainer>
        </div>
    )
}