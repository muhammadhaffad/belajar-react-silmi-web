import { numberToRupiah } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import { getTrackBackground, Range } from "react-range";

const colors = [
    { value: 'PI', label: 'Pink' },
    { value: 'HT', label: 'Hitam' },
    { value: 'MR', label: 'Maroon' },
    { value: 'ME', label: 'Merah' },
    { value: 'PB', label: 'Putih Bersih' },
    { value: 'PT', label: 'Putih Tulang' },
    { value: 'HJ', label: 'Hijau' },
].sort((a, b) => a.label.localeCompare(b.label));

const sizes = [
    '02', '04', '06', '08', '10', '12', '14', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'
];

const sortOptions = [
    { value: '', label: 'Paling Sesuai' },
    { value: '3', label: 'Rilis: Baru ke Lama' },
    { value: '4', label: 'Rilis: Lama ke Baru' },
    { value: '1', label: 'Harga: Rendah ke Tinggi' },
    { value: '2', label: 'Harga: Tinggi ke Rendah' },
];
const min = 0;
const max = 500000;
const step = 10000;

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

export function FilterButton({ active, setActive, text, renderStatus, className = '' }) {
    return (
        <button onClick={() => setActive(!active)} className={`filter__button btn ${active ? 'active' : ''} ${className}`}>
            <div>
                {text}
                <small className='filter__status--mobile'>
                    {renderStatus && renderStatus()}
                </small>
            </div><span>{active ? '−' : '+'}</span>
        </button>
    );
}

export function FilterOption({ children, className }) {
    return (
        <div className={`filter__options ${className}`}>
            <div className="filter__options-container">
                {children}
            </div>
        </div>
    )
}

export function FilterPanelItem({ button, option }) {
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
            {button(active, setActive)}
            {option && option(active, setActive)}
        </div>
    )
};

export function FilterPanel({ visible, setVisible, filter, setFilter }) {
    const refSearchColor = useRef(null);
    const [searchColor, setSerachColor] = useState('');
    const handleClickColorFilter = (value, checked) => {
        setFilter({
            ...filter, ['warna']: filter.warna.map(
                (o) => {
                    if (o.value == value) {
                        return ({ ...o, ['checked']: !checked })
                    } else {
                        return ({ ...o });
                    }
                }
            )
        })
    }
    const handleClickSizeFilter = (value, checked) => {
        setFilter({
            ...filter, ['ukuran']: filter.ukuran.map(
                (o) => {
                    if (o.value == value) {
                        return ({ ...o, ['checked']: !checked })
                    } else {
                        return ({ ...o });
                    }
                }
            )
        })
    }

    return (
        <div className={`filter__panel ${visible === 'panel' ? 'active' : ''}`}>
            <div className='filter__header p-3 border-bottom text-uppercase lh-1 sticky-top top-0 bg-white d-flex align-items-center justify-content-between d-lg-none'><span>Terapkan Filter</span><button onClick={() => setVisible(null)} className='btn p-0'><i className="fs-5 bi bi-x-lg"></i></button></div>
            <FilterPanelItem
                button={(active, setActive) => (
                    <FilterButton text="Harga" active={active} setActive={setActive} renderStatus={() => {
                        return (filter.harga[0] !== min || filter.harga[1] !== max) && `${numberToRupiah(filter.harga[0])}-${numberToRupiah(filter.harga[1])}`;
                    }}></FilterButton>
                )}
                option={() => (
                    <FilterOption>
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
                    </FilterOption>
                )}
            ></FilterPanelItem>
            <FilterPanelItem
                button={(active, setActive) => (
                    <FilterButton text="Warna" active={active} setActive={(active) => {
                        setActive(active)
                        window.setTimeout(() => 
                            refSearchColor.current.focus()
                        , 100);
                    }} renderStatus={() => filter.warna.filter(o => o.checked).map(o => o.label).join(', ')}></FilterButton>
                )}
                option={() => {
                    return (<FilterOption>
                        <div className="mb-3 border-bottom border-dark p-1 d-flex gap-2">
                            <span className='ps-1'>
                                <i className="fs-5 bi bi-search"></i>
                            </span>
                            <input ref={refSearchColor} type="text" value={searchColor} onChange={e => setSerachColor(e.target.value)} className='form-control p-0 border-0' placeholder='Cari warna...' />
                        </div>
                        <ul className='list-unstyled mb-0 d-flex flex-column flex-grow-1 gap-3 overflow-auto'>
                            {filter.warna.filter(color => color.label.toLowerCase().includes(searchColor.toLowerCase())).map(color => (
                                <li key={color.value} className='d-flex gap-2 w-100'>
                                    <input type="checkbox" checked={color.checked} onChange={() => handleClickColorFilter(color.value, color.checked)} className='border border-dark form-check-input rounded-0 m-0 prevent-select' style={{ width: '1.5rem', height: '1.5rem' }} id={color.value + 'asdf'} />
                                    <label className='w-100 cursor-pointer' htmlFor={color.value + 'asdf'}>{color.label}</label>
                                </li>
                            ))}
                        </ul>
                    </FilterOption>)
                }
                }
            ></FilterPanelItem>
            <FilterPanelItem
                button={(active, setActive) => (
                    <FilterButton text="Ukuran" active={active} setActive={setActive} renderStatus={() => filter.ukuran.filter(o => o.checked).map(o => o.label).join(', ')}></FilterButton>
                )}
                option={() => (
                    <FilterOption>
                        <div className="flex-grow-1 gap-2 overflow-auto d-grid grid-cols-4 grid-lg-cols-3">
                            {filter.ukuran.map((size) => (
                                <div key={size.value} className="form-group d-inline-block m-0 form-check-bg">
                                    <input type="checkbox" checked={size.checked} className="form-check-bg-input" id={size.value + 'sad'} autoComplete="false" onChange={() => handleClickSizeFilter(size.value, size.checked)} />
                                    <label className="form-check-label text-center w-100 prevent-select rounded-0 border-dark" htmlFor={size.value + 'sad'}>{size.label}</label>
                                </div>
                            ))}
                        </div>
                    </FilterOption>
                )}
            ></FilterPanelItem>
        </div>
    );
}

export function FilterControlItem({ button, option }) {
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

    return (<div ref={ref} className="filter__control-item">
        {button({ active, setActive })}
        {option && option({ active, setActive })}
    </div>)
}

export function FilterControl({ visible, setVisible, filterControl, setFilterControl }) {
    const handleClickSortBy = (sortCode, setActive) => {
        setFilterControl({ ...filterControl, ['sortBy']: sortCode });
        setActive(false);
    }

    return (<div className={`filter__control ${visible === 'control' ? 'active' : ''}`}>
        <div className='filter__header p-3 border-bottom text-uppercase lh-1 sticky-top top-0 bg-white d-flex align-items-center justify-content-between d-lg-none'>
            <span>Urutkan Berdasarkan</span>
            <button onClick={() => setVisible(null)} className='btn p-0'>
                <i className="fs-5 bi bi-x-lg"></i>
            </button>
        </div>
        <FilterControlItem
            button={({ active, setActive }) => (
                <FilterButton className="filter__button-sort" text={sortOptions.find((option) => option.value === filterControl.sortBy).label} active={active} setActive={setActive}></FilterButton>
            )}
            option={({ setActive }) => (
                <FilterOption className="filter__options--right">
                    <ul className="list-unstyled d-flex flex-column gap-lg-3 mb-0 m-n3 mx-lg-n3 my-lg-0">
                        {sortOptions.map((option) => (
                            <li key={option.label} onClick={() => handleClickSortBy(option.value, setActive)} className={`cursor-pointer text-lg- px-3 py-3 py-lg-0 lh-1 border-light border-bottom border-lg-0 ${option.value === filterControl.sortBy ? 'fw-bold' : ''}`}>{option.label}</li>
                        ))}
                    </ul>
                </FilterOption>
            )}
        >
        </FilterControlItem>
    </div>)
}
export function FilterStatusLabel({ handleClick, children }) {
    return (
        <label onClick={handleClick} className='bg-light d-flex align-items-baseline gap-1 text-nowrap cursor-pointer' style={{ padding: '.1rem .5rem', fontSize: '1rem' }} >
            <small>{children}</small>
            <span><i className='bi bi-x-lg' style={{ fontSize: '.6rem' }}></i></span>
        </label>
    )
}
export function FilterStatus({ children }) {
    return (
        <div className="filter__status d-flex gap-2 my-3 overflow-auto">
            {children}
        </div>
    )
}

export default function Filter() {
    const [visibleFilter, setVisibleFilter] = useState(null);
    const [filter, setFilter] = useState({
        harga: [min, max],
        warna: colors.map((color) => ({ ...color, ['checked']: false })),
        ukuran: sizes.map(item => Object.assign({}, { value: item, label: item, checked: false }))
    });
    const [filterControl, setFilterControl] = useState({
        sortBy: sortOptions[0].value
    });
    return (
        <>
            <div className="filter">
                <FilterContainerMobile handleOnClick={setVisibleFilter}></FilterContainerMobile>
                <FilterContainer visible={visibleFilter}>
                    <FilterPanel visible={visibleFilter} setVisible={setVisibleFilter} filter={filter} setFilter={setFilter}></FilterPanel>
                    <FilterControl visible={visibleFilter} setVisible={setVisibleFilter} filterControl={filterControl} setFilterControl={setFilterControl}></FilterControl>
                </FilterContainer>
                
            </div>
            <FilterStatus>
                {
                    (filter.harga[0] !== min || filter.harga[1] !== max) &&
                    <FilterStatusLabel handleClick={() => {
                        setFilter({ ...filter, ['harga']: [min, max] });
                    }}>
                        {numberToRupiah(filter.harga[0]) + ' − ' + numberToRupiah(filter.harga[1])}
                    </FilterStatusLabel>
                }
                {
                    filter.warna.filter(item => item.checked).map(item =>
                        <FilterStatusLabel key={item.value} handleClick={() => setFilter({
                            ...filter, ['warna']: filter.warna.map(
                                (o) => {
                                    if (o.value == item.value) {
                                        return ({ ...o, ['checked']: !item.checked })
                                    } else {
                                        return ({ ...o });
                                    }
                                }
                            )
                        })}>
                            {item.label}
                        </FilterStatusLabel>
                    )
                }
                {
                    filter.ukuran.filter(item => item.checked).map(item =>
                        <FilterStatusLabel key={item.value} handleClick={() => setFilter({
                            ...filter, ['ukuran']: filter.ukuran.map(
                                (o) => {
                                    if (o.value == item.value) {
                                        return ({ ...o, ['checked']: !item.checked })
                                    } else {
                                        return ({ ...o });
                                    }
                                }
                            )
                        })}>
                            {item.label}
                        </FilterStatusLabel>
                    )
                }
            </FilterStatus>
        </>
    )
}